/***********************************************************************************************************************************
* This document is not used in stemJS. It is used purely as reference material for any who wish to make use of this repository.    *
*                                                                                                                                  *
*  The following is a table creation statement for the footer in stemJS. footer is used for all web pages                          *
*  It contains the following:                                                                                                      *
*                                                                                                                                  *
* id - ID of the entry. Autogenerate, auto increment.                                                                              *           
*                                                                                                                                  *
* priority - Where the entry should appear in the list. Lowest number comes first (leftmost).                                      *
*                                                                                                                                  *
* header - Name & URL of the entry. Format is NAME|URL. When being passed to the footer.ejs,                                       *
* the entries are handled by being split at the |.                                                                                 *
*                                                                                                                                  *
* links - Name & URL of all drop-down entries in a list. Format is NAME|URL;NAME|URL;...NAME|URL.                                  *
* When passed to Footer EJS, the entries are handled by splitting each NAME|URL by ;,                                              *
* then each individual split is handled by splitting at the |, as it is with header                                                *
*                                                                                                                                  *
*                                                                                                                                  *
************************************************************************************************************************************/

CREATE TABLE "footer" ("id" INTEGER PRIMARY KEY  NOT NULL ,"header" TEXT NOT NULL  DEFAULT (null) ,"priority" INTEGER NOT NULL , "links" TEXT)