{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}

module Main where

import QueryProcessor

import Web.Scotty 
import Database.PostgreSQL.Simple
import Data.Text.Lazy
import System.IO
import Network.Wai.Middleware.Static
import Control.Monad.IO.Class

import Data.String

apiServer :: Connection -> ScottyM()
apiServer connection = do
    get "/api/getCommonCompetitions" $ do
        name1 <- param "name1"
        name2 <- param "name2"
        rows <- liftIO $ getCommonCompetitionsRows connection name1 name2
        json rows 
    get "/api/getAthleteList" $ do
        list <- liftIO $ getAthleteList connection
        json list
    get "/api/getAllRaces" $ do
        list <- liftIO $ getAllRaces connection
        json list
    get "/api/completeAthleteName" $ do
        name <- param "name"
        list <- liftIO $ completeAthleteName connection name
        json list

main :: IO ()
main = do
    -- connect to the database
    password <- getLine
    dbConnection <- connectPostgreSQL $ fromString ("host='pellefant.db.elephantsql.com' user='qfjtuala' dbname='qfjtuala' password='" ++ password ++ "'")
    {-dbConnection <- connectPostgreSQL $ fromString ("host='192.168.124.244' user='postgres' dbname='another' password='password'")-}
    scotty 1234 $ do
        middleware $ staticPolicy (noDots >-> addBase "src/front") -- get static files (index.html, *.js, etc) 
        apiServer dbConnection
    return ()
