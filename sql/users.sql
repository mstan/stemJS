/***********************************************************************************************************************************
* This document is not used in stemJS. It is used purely as reference material for any who wish to make use of this repository.    *
*                                                                                                                                  *
* The following is a table creation statement for the config in stemJS. config is a globally created token.                        *
* It contains the following:                                                                                                       *
*                                                                                                                                  *
*   name - Name of the owner. Used for common greetings on the site. Not used as sign-in material                                  *
*                                                                                                                                  *
*   email - Email. Will be used for password resets. Used as a sign-in identifier                                                  *
*                                                                                                                                  *
*   password - System password. This will be an encrypted password.                                                                *
*                                                                                                                                  *
************************************************************************************************************************************/

CREATE TABLE "users" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , "name" VARCHAR, "email" VARCHAR UNIQUE , "password" VARCHAR, "salt" VARCHAR)