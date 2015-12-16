/***********************************************************************************************************************************
* This document is not used in stemJS. It is used purely as reference material for any who wish to make use of this repository.    *
*                                                                                                                                  *
* The following is a table creation statement for the passwordReset in stemJS.                                                     *
************************************************************************************************************************************/
CREATE TABLE "passwordReset" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , "email" VARCHAR NOT NULL  UNIQUE , "createdAt" VARCHAR, "hasBeenUsed" BOOL NOT NULL  DEFAULT 0, "key" VARCHAR NOT NULL )