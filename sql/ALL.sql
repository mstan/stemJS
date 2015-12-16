/***********************************************************************************************************************************
* This is a quick reference to all create table statements for easy use                                                            *
************************************************************************************************************************************/

CREATE TABLE "config" ("id" INTEGER PRIMARY KEY  NOT NULL ,"siteName" VARCHAR NOT NULL ,"siteNavbar" VARCHAR NOT NULL );
CREATE TABLE "footer" ("id" INTEGER PRIMARY KEY  NOT NULL ,"header" TEXT NOT NULL  DEFAULT (null) ,"priority" INTEGER NOT NULL , "links" TEXT);
CREATE TABLE "indexConfig" ("id" INTEGER PRIMARY KEY  NOT NULL ,"header" VARCHAR NOT NULL  DEFAULT (null) ,"tagline" TEXT NOT NULL  DEFAULT (null) ,"articleHeader" TEXT NOT NULL  DEFAULT (null) ,"articleContent" TEXT NOT NULL  DEFAULT (null) , "orderButton" VARCHAR, "learnMoreButton" VARCHAR);
CREATE TABLE "navbar" ("id" INTEGER PRIMARY KEY  NOT NULL ,"header" TEXT NOT NULL  DEFAULT (null) ,"priority" INTEGER NOT NULL , "dropdown" TEXT);
CREATE TABLE "pages" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , "slug" VARCHAR NOT NULL  UNIQUE , "navbarTitle" VARCHAR NOT NULL , "articleHeader" VARCHAR, "articleContent" TEXT);
CREATE TABLE "passwordReset" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , "email" VARCHAR NOT NULL  UNIQUE , "createdAt" VARCHAR, "hasBeenUsed" BOOL NOT NULL  DEFAULT 0, "key" VARCHAR NOT NULL );
CREATE TABLE "sidebarPrimary" ("id" INTEGER PRIMARY KEY  NOT NULL ,"header" TEXT NOT NULL  DEFAULT (null) ,"priority" INTEGER NOT NULL , "links" TEXT);
CREATE TABLE "sidebarSecondary" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT , "name" VARCHAR NOT NULL , "URL" TEXT, "priority" INTEGER);
CREATE TABLE "socialMedia" ("header" VARCHAR, "description" TEXT, "facebookURL" VARCHAR, "twitterURL" VARCHAR, "youTubeURL" VARCHAR, "instagramURL" VARCHAR, "id" INTEGER PRIMARY KEY  AUTOINCREMENT  UNIQUE );
CREATE TABLE "users" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , "name" VARCHAR, "email" VARCHAR UNIQUE , "password" VARCHAR, "salt" VARCHAR);