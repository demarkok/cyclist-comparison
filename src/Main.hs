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


apiServer :: Connection -> ScottyM()
apiServer connection = do
    get "/api/getCommonCompetitions" $ do
        name1 <- param "name1"
        name2 <- param "name2"
        json $ (getCommonCompetitionsRows connection name1 name2)
    get "/api/getAthleteList" $ do
        list <- liftIO $ getAthleteList connection
        json list



main :: IO ()
main = do
    -- connect to the database
    dbConnection <- connectPostgreSQL "host='192.168.124.244' user='postgres' dbname='main' password='password'"
    return ()
    scotty 1234 $ do
        middleware $ staticPolicy (noDots >-> addBase "src/front") -- get static files (index.html, *.js, etc) 
        apiServer dbConnection
            
