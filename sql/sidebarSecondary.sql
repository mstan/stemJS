/***********************************************************************************************************************************
* This document is not used in stemJS. It is used purely as reference material for any who wish to make use of this repository.    *
*                                                                                                                                  *
* The following is a table creation statement for the secondary sidebar Config in stemJS.                                          *
*                                                                                                                                  *
* This module pulls ALL entries from the sidebarSecondary table with each being an object.                                         *
*                                                                                                                                  *
*  Each object contains the following:                                                                                             *
*                                                                                                                                  *
*  id - ID of the entry. Autogenerate, auto increment.                                                                             *
*                                                                                                                                  *
*  priority - Where the entry should appear in the list. Lowest number comes first (leftmost).                                     *
*                                                                                                                                  *
*  name - Name of the link.                                                                                                        *
*                                                                                                                                  *
*  URL - URL of the link                                                                                                           *
*                                                                                                                                  *
  If sidebarSecondary is entirely null, the entire sidebar section is not rendered.                                                *
************************************************************************************************************************************/

CREATE TABLE "sidebarSecondary" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT , "name" VARCHAR NOT NULL , "URL" TEXT, "priority" INTEGER)