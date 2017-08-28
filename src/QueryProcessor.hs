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

import Data.Aeson
import GHC.Generics
import Data.Time
import Database.PostgreSQL.Simple
import Database.PostgreSQL.Simple.ToRow
import Database.PostgreSQL.Simple.FromRow
import Database.PostgreSQL.Simple.ToField
import Database.PostgreSQL.Simple.SqlQQ

import Data.String
import Data.List

import ToString


-----------------
-- TODO make typing stronger: wrap Strings.

getAthleteList :: Connection -> IO AthleteList 
getAthleteList connection = AthleteList <$> (query_ connection queryText :: IO[Athlete]) where
    queryText = [sql| SELECT * FROM athletes |] 
    

getCommonCompetitionsRows :: Connection -> String -> String -> IO [ResultTile]
getCommonCompetitionsRows connection name1 name2 = do
    competitionIds <- (map fromOnly) <$> (query connection queryIntersect (name1, name2) :: IO[Only Int])
    athleteIds <- traverse (getAthleteId connection) [name1, name2]
    traverse (\x -> getResultTile connection x athleteIds) competitionIds 


getAllRaces :: [Race] 
getAllRaces = mokRaces 

-----------------


-- database connection -> athlete name -> athlete id in database
getAthleteId :: Connection -> String -> IO Int
getAthleteId connection name = do
    [Only athleteId] <- query connection queryGetAthleteId (Only name) :: IO [Only Int]
    return athleteId

-- database connection -> competition id -> list of athletes -> a tile containing rows corresponding to 
-- given athletes in given competition
getResultTile :: Connection -> Int -> [Int] -> IO(ResultTile)
getResultTile connection competitionId athleteIds = do
    [Only date] <- (query connection queryGetDate (Only competitionId) :: IO[Only Day])
    [[name]] <- (query connection queryGetCompetitionName (Only competitionId) :: IO[[String]])
    
    columnNamesWrapped <- (query connection queryGetColumnNames (Only name) :: IO[[String]])
    let columnNames = concat columnNamesWrapped
    resultRows <- traverse (getResultRow columnNames connection name) athleteIds
    return $ ResultTile date name columnNames resultRows

-- list of column names in result table -> database connection -> name of table in database corresponding competition ->
-- -> athlete id -> a row from the result table corresponding given athlete containing given columns
getResultRow :: [String] -> Connection -> String -> Int -> IO ResultRow
getResultRow columnNames connection competitionName athleteId = do
    [rowContentWrapped] <- (query_ connection (queryGetRow columnNames competitionName athleteId) :: IO[[Maybe String]])
    let rowContent = unwrap <$> rowContentWrapped where
        unwrap (Just s) = s
        unwrap Nothing = ""
    return $ ResultRow rowContent 


-- insert cast to Text in the query, due to number and types of columns are undefined
queryGetRow columnNames competitionName athleteId = fromString $ "select " ++ castColumnNames ++ " from " ++ competitionName ++ " WHERE athlete_id = " ++ (show athleteId) where
   castColumnNames = intercalate "," $ (\name -> name ++ "::Text") <$> columnNames 

queryGetColumnNames = [sql| SELECT column_name FROM information_schema.columns WHERE table_name = ? |] 
queryGetCompetitionName = [sql| select name from competitions WHERE id = ? |]
queryGetDate = [sql| select date from competitions WHERE id = ? |]
queryIntersect = [sql| select competition_id from participations WHERE
	                       athlete_id IN  
	                           (select id from athletes where name = ?)
                       intersect
                       select competition_id from participations where
                	       athlete_id IN  
                            	(select id from athletes where name = ?) |]

queryGetAthleteId = [sql| select id from athletes WHERE name = ? |]


------------------


data AthleteList = AthleteList [Athlete] deriving Generic 
data Athlete = Athlete {id :: Int, name :: String} deriving Generic

instance ToJSON Athlete
instance ToJSON AthleteList 

instance FromRow Athlete 
instance ToRow Athlete


-- type describing a tile of results for a common competition for two or more athletes
-- date - competition date
-- title - competition name
-- columnNames - names of columns in the result table e.g. place, time, team, city, etc
-- members - an array of rows in result table. One row for every athlete. 
data ResultTile = ResultTile {date :: Day, title :: String, columnNames :: [String], members :: [ResultRow]} deriving (Generic)
data ResultRow = ResultRow [String] deriving (Generic)

instance ToJSON ResultRow
instance ToJSON ResultTile



data Race = Race {id :: Int, name :: String} deriving Generic 
instance ToJSON Race

------------------


mokRaces = [Race 1 "Токсовский марафон", Race 2 "Зимний кубок 2017 - первый этап", Race 3 "Мичуринский марафон"]


mokAthleteList :: AthleteList
mokAthleteList =
   (AthleteList . map (uncurry Athlete)) [(2, "Пётр Петров"), (1, "Василий Пупкин"), (3, "Лэнс Армстронг")]


-- the analogue of (:) 
(<>) :: ToString a => a -> ResultRow -> ResultRow
infixr 5 <>
newValue <> (ResultRow values) = ResultRow $ (toString newValue) : values

mokCommonCompetitionsRows :: String -> String -> [ResultTile]
mokCommonCompetitionsRows name1 name2 =
    [ 
        ResultTile {
            date = fromGregorian 2017 08 19,
            title = "Токсовский марафон", 
            columnNames = "place" : "bib" : "name" :  "team"                 :  "lap1time": "lap1place" :  "lap2time": "lap2place" :  "time"    :  "lag"    :  [],
            members = [    11     <> 15   <> name1 <> "FAST-BIKE Велосервис" <> "1:00:03" <> 6          <> "2:00:45" <> 11         <> "2:00:45" <> "+09:54" <> ResultRow [],
                           22     <> 14   <> name2 <> "Rikkir-9RusMTB"       <> "1:01:26" <> 14         <> "2:05:49" <> 22         <> "2:05:49" <> "+14:58" <> ResultRow []]
        },
        ResultTile {
            date = fromGregorian 2016 04 12,
            title = "Первый этап Зимнего кубка xcnews.ru 2016",
            columnNames = "place" : "name" :  "team"  :  "bib" :  "YOB" :  "lap1time" :  "lap2time" :  "lap3time" :  "lap4time" :  "lap5time" :  "time"    :  "category" : [],
            members = [    4     <> name2  <> ""      <>  18   <>  1981 <> "0:12:04"  <> "0:12:18"  <> "0:12:22"  <> "0:12:40"  <> "0:12:43"  <> "1:02:12" <> "30"       <> ResultRow [],
                           17    <> name1  <> "лично" <>  69   <>  1982 <> "0:14:21"  <> "0:13:40"  <> "0:13:47"  <> "0:13:32"  <> "0:13:47"  <> "1:09:07" <> "30"       <> ResultRow []]   
        },
        ResultTile {
            date = fromGregorian 2017 03 12,
            title = "Седьмой этап Зимнего кубка xcnews.ru 2016",
            columnNames = "place" : "name" :  "team"  :      "bib" :  "YOB" :  "lap1time" :  "lap2time" :  "lap3time" :  "lap4time" :  "lap5time" : "lap6time" : [],
            members = [    6     <> name2  <> ""      <>      99   <>  1981 <> "00:11:05" <>  "00:21:45" <> "00:32:30" <> "00:43:14" <> "00:53:57" <>"01:05:32" <> "30"       <> ResultRow [],
                           7    <>  name1  <> "#школамтб" <>  69   <>  1982 <>  "00:11:29" <> "00:22:28" <>	"00:33:09" <> "00:44:06" <> "00:55:10" <>"01:06:11" <> "30"       <> ResultRow []]   
        }
    ]



