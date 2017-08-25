{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE DuplicateRecordFields #-}
{-# LANGUAGE IncoherentInstances #-}
{-# LANGUAGE TypeSynonymInstances #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE UndecidableInstances #-}
{-# LANGUAGE ExtendedDefaultRules #-}

module QueryProcessor (getCommonCompetitionsRows, getUsersList) where

import Data.Aeson
import GHC.Generics
import Data.Time
import Database.PostgreSQL.Simple

import GShow


data UsersList = UsersList [User] deriving Generic 
data User = User {name :: String, id :: Int} deriving Generic

instance ToJSON User
instance ToJSON UsersList 

getUsersListMok :: UsersList
getUsersListMok =
   (UsersList . map (uncurry User)) [("Пётр Петров", 2), ("Василий Пупкин", 1), ("Лэнс Армстронг", 3)]

getUsersList :: Connection -> UsersList 
getUsersList connection = getUsersListMok


getCommonCompetitionsRows :: Connection -> String -> String -> ResultTile
getCommonCompetitionsRows connection = getCommonCompetitionsRowsMok

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
(<>) :: GShow a => a -> ResultRow -> ResultRow
infixr 5 <>
newValue <> (ResultRow values) = ResultRow $ (gShow newValue) : values

getCommonCompetitionsRowsMok :: String -> String -> ResultTile
getCommonCompetitionsRowsMok name1 name2 = 
    ResultTile {
        date = fromGregorian 2017 08 19,
        title = "Токсовский марафон", 
        columnNames = "place" : "bib" : "name" :  "team"                 :  "lap1time": "lap1place" :  "lap2time": "lap2place" :  "time"    :  "lag"    :  [],
        members = [    11     <> 15   <> name1 <> "FAST-BIKE Велосервис" <> "1:00:03" <> 6          <> "2:00:45" <> 11         <> "2:00:45" <> "+09:54" <> ResultRow [],
                       22     <> 14   <> name2 <> "Rikkir-9RusMTB"       <> "1:01:26" <> 14         <> "2:05:49" <> 22         <> "2:05:49" <> "+14:58" <> ResultRow []]
    }










