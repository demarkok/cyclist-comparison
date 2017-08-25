{-# LANGUAGE TypeSynonymInstances #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE UndecidableInstances #-}
{-# LANGUAGE IncoherentInstances #-}

module GShow where


-- show works not as I expect for strings, 
-- that is why I "overloaded" it through making a new class
-- with a function gShow copying show behaviour always except strings
class GShow a where
    gShow :: a -> String

instance GShow String where
    gShow = id

instance Show a => GShow a where
    gShow = show
