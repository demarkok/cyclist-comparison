{-# LANGUAGE TypeSynonymInstances #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE UndecidableInstances #-}
{-# LANGUAGE IncoherentInstances #-}

module ToString where


-- show works not as I expect for strings, 
-- that is why I "overloaded" it through making a new class
-- with a function toString copying show behaviour always except strings
class ToString a where
    toString :: a -> String

instance ToString String where
    toString = id

instance Show a => ToString a where
    toString = show
