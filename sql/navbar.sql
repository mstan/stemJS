/***********************************************************************************************************************************
* This document is not used in stemJS. It is used purely as reference material for any who wish to make use of this repository.    *
*                                                                                                                                  *
* The following is a table creation statement for the config in stemJS. config is a globally created token.                        *
* It contains the following:                                                                                                       *
*                                                                                                                                  *
*   siteName - Name of the website. Used anywhere the site name is needed. Example: Top-left of navigation bar                     *
*                                                                                                                                  *
*   siteNavbar - Name of the website as it is shown in the web browser tab up top                                                  *
*                                                                                                                                  *
*                                                                                                                                  *
************************************************************************************************************************************/

CREATE TABLE "navbar" ("id" INTEGER PRIMARY KEY  NOT NULL ,"header" TEXT NOT NULL  DEFAULT (null) ,"priority" INTEGER NOT NULL , "dropdown" TEXT)