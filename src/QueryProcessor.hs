{-# LANGUAGE DeriveGeneric #-}

module QueryProcessor where

import Data.Aeson
import GHC.Generics

data UsersList = UsersList [User] deriving Generic 
data User = User {name :: String, id :: Int} deriving (Generic)

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

getUsersList = getUsersListMok
