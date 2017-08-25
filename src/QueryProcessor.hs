{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE DuplicateRecordFields #-}

module QueryProcessor where

import Data.Aeson
import GHC.Generics

data UsersList = UsersList [User] deriving Generic 
data User = User {name :: String, id :: Int} deriving Generic

{-instance ToJSON User where-}
    {-toJSON (User name id) = -}
        {-object ["id" .= id,-}
                {-"name" .= name]-}

-- we can avoid it if we add derived deriving from Generic
{-instance ToJSON UsersList where-}
    {-toJSON -}

instance ToJSON User
instance ToJSON UsersList 

getUsersListMok =
   (UsersList . map (uncurry User)) [("Пётр Петров", 2), ("Василий Пупкин", 1), ("Лэнс Армстронг", 3)]

getUsersList connection = getUsersListMok



data ResultRow = ResultRow {place :: Int, name :: String, otherData :: [(String, Int)]} deriving Generic

instance ToJSON ResultRow

getCommonCompetitionsRows connection name1 name2 = 
    [(ResultRow {place = 10, name = name1, otherData = [("lap1time", 10), ("lap2time", 12)]},
      ResultRow {place = 2, name = name2, otherData = [("lap1time", 7), ("lap2time", 10)]}),
         
     (ResultRow {place = 50, name = name2, otherData = [("lap1time", 29), ("lap2time", 40)]},
      ResultRow {place = 42, name = name2, otherData = [("lap1time", 30), ("lap2time", 35)]})]


