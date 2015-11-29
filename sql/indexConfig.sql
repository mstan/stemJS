/***********************************************************************************************************************************
* This document is not used in stemJS. It is used purely as reference material for any who wish to make use of this repository.    *
*                                                                                                                                  *
* The following is a table creation statement for the index Config in stemJS.                                                      *
*                                                                                                                                  *
*  This module pulls the configuration for the index page. This is only pulled when the '/' route is rendered.                     *
*                                                                                                                                  *
*  This object contains the folowing key values:                                                                                   *
*                                                                                                                                  *
*  header - Header for the index jumbotron                                                                                         *
*                                                                                                                                  *
*  tagline - Tagline below the header in the jumbotron                                                                             *
*                                                                                                                                  *
*  articleHeader - Header for the base article                                                                                     *
*                                                                                                                                  *
*  articleContent - Content for the base article                                                                                   *
*                                                                                                                                  *
*  orderButton & learnMoreButton - URLs for corresponding buttons. If EITHER are left empty, NEITHER are rendered.                 *
************************************************************************************************************************************/

CREATE TABLE "indexConfig" ("id" INTEGER PRIMARY KEY  NOT NULL ,"header" VARCHAR NOT NULL  DEFAULT (null) ,"tagline" TEXT NOT NULL  DEFAULT (null) ,"articleHeader" TEXT NOT NULL  DEFAULT (null) ,"articleContent" TEXT NOT NULL  DEFAULT (null) , "orderButton" VARCHAR, "learnMoreButton" VARCHAR)