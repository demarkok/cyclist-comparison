{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE DuplicateRecordFields #-}
{-# LANGUAGE IncoherentInstances #-}
{-# LANGUAGE TypeSynonymInstances #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE UndecidableInstances #-}
{-# LANGUAGE ExtendedDefaultRules #-}
{-# LANGUAGE QuasiQuotes #-}


module QueryProcessor (getCommonCompetitionsRows, getAthleteList, getAllRaces) where

import Data.Aeson (FromJSON, ToJSON)
import GHC.Generics
import Data.Time
import Database.PostgreSQL.Simple
import Database.PostgreSQL.Simple.ToRow
import Database.PostgreSQL.Simple.FromRow
import Database.PostgreSQL.Simple.ToField
import Database.PostgreSQL.Simple.SqlQQ
import Database.PostgreSQL.Simple.FromField

import Data.String
import Data.List

import ToString

import Text.Parsec.String
import Data.Fixed


----------------- Interface


getAthleteList :: Connection -> IO AthleteList 
getAthleteList connection = AthleteList <$> (query_ connection queryText :: IO [Athlete]) where
    queryText = [sql| SELECT name, yob FROM athletes |] 
    

getCommonCompetitionsRows :: Connection -> String -> String -> IO [ResultTile]
getCommonCompetitionsRows connection name1 name2 = do
    raceIds <- mapFromOnly <$> (query connection queryIntersect (name1, name2) :: IO [Only Int])
    athleteIds <- mapFromOnly . concat <$> traverse (query connection queryGetAthleteId . Only :: String -> IO [Only Int]) [name1, name2]
    --  getTile :: Int -> IO ResultTile
    let getTile raceId = do
            [race] <- (query connection queryGetRace (Only raceId) :: IO [Race])
            raceRows <- traverse getRow athleteIds 
            return $ createTile race raceRows where
                getRow :: Int -> IO Result
                getRow athleteId = do
                    [athlete] <- (query connection queryGetAthlete (Only athleteId) :: IO [Athlete])
                    [(resultId, place, timeInSecs)] <- (query connection queryGetResult (raceId, athleteId) :: IO [(Int, Int, Int)])
                    laps <- LapsResult <$> (map Time) <$> mapFromOnly <$> (query connection queryGetLapsResult (Only resultId) :: IO [Only Int])
                    return $ Result athlete place (Time timeInSecs) laps
    traverse getTile raceIds 
         

getAllRaces :: Connection -> IO [Race] 
getAllRaces connection = (query_ connection queryText :: IO [Race]) where
    queryText = [sql| SELECT date, name from races |]


------------------ Queries


mapFromOnly :: [Only a] -> [a]
mapFromOnly = map fromOnly

queryIntersect = [sql| select race_id from results WHERE
	                       athlete_id IN  
	                           (select id from athletes WHERE name = ?)
                       intersect
                       select race_id from results WHERE
                	       athlete_id IN  
                            	(select id from athletes WHERE name = ?) |]

queryGetAthleteId = [sql| select id from athletes WHERE name = ? |]

queryGetRace = [sql| select date, name from races WHERE id = ? |] 

queryGetAthlete = [sql| select name, yob from athletes WHERE id = ? |]

queryGetResult = [sql| select result_id, place, time_in_secs from results WHERE race_id = ? and athlete_id = ? |]

queryGetLapsResult = [sql| select time_in_secs from lap_results WHERE result_id = ? order by lap_index |]


------------------  Data


data AthleteList = AthleteList [Athlete] deriving Generic 
data Athlete = Athlete {name :: String, yob :: Int} deriving (Show, Eq, Generic, Ord)

instance ToJSON Athlete
instance ToJSON AthleteList 
instance FromRow Athlete 

-- type describing a tile of results for a common races for two or more athletes
-- date - race date
-- title - race name
-- columnNames - names of columns in the result table e.g. place, time, team, city, etc
-- members - an array of rows in result table. One row for every athlete. 
data ResultTile = ResultTile {date :: Day, 
                              title :: String,
                              columnNames :: [String], 
                              members :: [[String]]} deriving (Show, Generic)

instance ToJSON ResultTile


data Race = Race { date :: Day, title :: String } deriving (Show, Generic)
instance FromRow Race 
instance ToJSON Race -- TODO: wrap toJSON interface: add getQuery :: a -> Query


data Result = Result { athlete :: Athlete, place :: Int, time :: Time, laps :: LapsResult } deriving (Show, Generic, Eq)
data LapsResult = LapsResult { getList :: [Time] } deriving (Show, Generic, Eq, Ord)


instance Ord Result where
    compare (Result athlete1 place1 time1 laps1) (Result athlete2 place2 time2 laps2) =
        compare (place1, time1, laps1, athlete1) (place2, time2, laps2, athlete2) 


createTile :: Race -> [Result] -> ResultTile
createTile race results = 
    ResultTile raceDate raceTitle columnNames members where
        raceDate = date (race :: Race)
        raceTitle = title (race :: Race)
        columnNames = "Place" : "Name" : "Year" : lapNames ++ ["Time"]
        members = do
            result <- sort results
            let (Athlete name yob) = athlete result
            let lapValues = getList $ laps result
            return $ place result <> name <> yob <> lapValues <> [toString $ time result]
        lapNames = zipWith (++) (replicate len "Lap ") (map show [1..len])
        len = length $ getList $ laps $ head results
        
data Time = Time {inSeconds :: Int} deriving (Eq, Ord)

instance Show Time where
    show (Time time) = hh ++ ":" ++ mm ++ ":" ++ ss where
        h = time `div` 3600
        m = (time `mod` 3600) `div` 60
        s = time `mod` 60
        prettyShow x = if x < 10 then ('0' : show x) else show x
        hh = prettyShow h 
        mm = prettyShow m
        ss = prettyShow s

------------------

-- the analogue of (:) 
(<>) :: ToString a => a -> [String] -> [String]
infixr 5 <>
x <> xs = toString x : xs



mokRaces = [Race (fromGregorian 1999 10 10) "Токсовский марафон", Race (fromGregorian 2002 10 10) "Зимний кубок 2017 - первый этап", Race (fromGregorian 2014 11 11) "Мичуринский марафон"]


mokAthleteList :: AthleteList
mokAthleteList =
   (AthleteList . map (uncurry Athlete)) [("Пётр Петров", 1991), ("Василий Пупкин", 1980), ("Лэнс Армстронг", 2002)]

