{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}
module Main where

import QueryProcessor

import Web.Scotty
import Database.PostgreSQL.Simple
import Data.Text.Lazy
import System.IO
import Network.Wai.Middleware.Static


{-data Checklist = Checklist { checklistId :: Maybe Int,-}
    {-title :: String,-}
    {-checklistItems :: [ChecklistItem]} deriving (Show, Generic)-}
{-instance FromRow Checklist where-}
    {-fromRow = Checklist <$> field <*> field <*> pure []-}
{-instance ToRow Checklist where-}
    {-toRow c = [toField $ title c]-}
{-instance ToJSON Checklist-}
{-instance FromJSON Checklist-}



{-data ChecklistItem = ChecklistItem { checklistItemId :: Maybe Int,-}
    {-itemText :: String,-}
    {-finished :: Bool,-}
    {-checklist :: Int } deriving (Show, Generic)-}
{-instance FromRow ChecklistItem where-}
    {-fromRow = ChecklistItem <$> field <*> field <*> field <*> field-}
{-instance ToRow ChecklistItem where-}
    {-toRow i = [toField $ itemText i, toField $ finished i, toField $ checklist i]-}
{-instance ToJSON ChecklistItem-}
{-instance FromJSON ChecklistItem-}


apiServer :: Connection -> ScottyM()
apiServer conn = do
    get "/api/getCommonCompetitions" $ do
        first <- param "name1"
        second <- param "name2"
        liftAndCatchIO $ putStrLn $ "name1 = " ++ first
        liftAndCatchIO $ putStrLn $ "name2 = " ++ second 
    get "/api/getUsersList" $ do
        json getUsersList 



main :: IO ()
main = do
    -- connect to the database
    dbConnection <- connectPostgreSQL("host='192.168.124.244' user='postgres' dbname='sammy' password='password'")
    
    scotty 1234 $ do
        middleware $ staticPolicy (noDots >-> addBase "src/front") -- get static files (index.html, *.js, etc) 
        apiServer dbConnection
            
