/***********************************************************************************************************************************
* This document is not used in stemJS. It is used purely as reference material for any who wish to make use of this repository.    *
*                                                                                                                                  *
* The following is a table creation statement for the primary sidebar Config in stemJS.                                            *
*                                                                                                                                  *
*  This module pulls ALL entries from the sidebarPrimary table with each being an object.                                          *
*                                                                                                                                  *
*  Each object contains the following: id,header,links,priority                                                                    *
*                                                                                                                                  *
*  id - ID of the entry. Autogenerate, auto increment.                                                                             *
*                                                                                                                                  *
*  priority - Where the entry should appear in the list. Lowest number comes first (leftmost).                                     *
*                                                                                                                                  *
*  header - Name & URL of the entry. Format is NAME|URL. When being passed to the navbar.ejs,                                      *
*						the entries are handled by being split at the |.                                                                       *
*                                                                                                                                  *
*  links - Name & URL of all sub-down entries in a list. Format is NAME|URL;NAME|URL;...NAME|URL.                                  *
*					 When passed to sidebar EJS, the entries are handled by splitting each NAME|URL by ;,                                    *
*					 then each individual split is handled by splitting at the |, as it is with header                                       *
*                                                                                                                                  *
*             If links is left null, the rendering section for it is skipped.                                                      *
************************************************************************************************************************************/

CREATE TABLE "sidebarPrimary" ("id" INTEGER PRIMARY KEY  NOT NULL ,"header" TEXT NOT NULL  DEFAULT (null) ,"priority" INTEGER NOT NULL , "links" TEXT)