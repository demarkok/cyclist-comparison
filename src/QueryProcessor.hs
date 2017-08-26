{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE DuplicateRecordFields #-}
{-# LANGUAGE IncoherentInstances #-}
{-# LANGUAGE TypeSynonymInstances #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE UndecidableInstances #-}
{-# LANGUAGE ExtendedDefaultRules #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}

{-module QueryProcessor (getCommonCompetitionsRows, getAthleteList) where-}

module QueryProcessor where

import Data.Aeson
import GHC.Generics
import Data.Time
import Database.PostgreSQL.Simple
import Database.PostgreSQL.Simple.ToRow
import Database.PostgreSQL.Simple.FromRow
import Database.PostgreSQL.Simple.ToField
import Database.PostgreSQL.Simple.SqlQQ

import ToString


getAthleteList :: Connection -> IO AthleteList 
getAthleteList connection = AthleteList <$> (query_ connection queryText :: IO[Athlete]) where
    queryText = [sql| SELECT * FROM athletes |] 
    

getCommonCompetitionsRows :: Connection -> String -> String -> [ResultTile]
getCommonCompetitionsRows connection = mokCommonCompetitionsRows


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

-- the analogue of (:) 
(<>) :: ToString a => a -> ResultRow -> ResultRow
infixr 5 <>
newValue <> (ResultRow values) = ResultRow $ (toString newValue) : values


------------------


mokAthleteList :: AthleteList
mokAthleteList =
   (AthleteList . map (uncurry Athlete)) [(2, "Пётр Петров"), (1, "Василий Пупкин"), (3, "Лэнс Армстронг")]


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










