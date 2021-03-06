/***********************************************************************************************************************************
* This document is not used in stemJS. It is used purely as reference material for any who wish to make use of this repository.    *
*                                                                                                                                  *
* The following is a table creation statement for the pages in stemJS. Each page is assigned the following:                        *
*                                                                                                                                  *
* slug - unique page identifier. This is passed as a token from the URL to look up the page content from the database.             *
*                                                                                                                                  *
* navbarTitle - The name of the webpage that appears on the tab at the top of the browser.                                         *
*                                                                                                                                  *
* articleHeader - The name of the article Header within the webpage                                                                *
*                                                                                                                                  *
* articleContent - Base text. Content of the article.                                                                              *
*                                                                                                                                  *
*                                                                                                                                  *
* EXAMPLE: mywebsite.com/pages/foobar will look up the database entry with the slug foobar and return the row as an object         *
* containing 'navbarTitle', articleHeader', and 'articleContent'                                                                   *
*                                                                                                                                  *
************************************************************************************************************************************/

CREATE TABLE "pages" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , "slug" VARCHAR NOT NULL  UNIQUE , "navbarTitle" VARCHAR NOT NULL , "articleHeader" VARCHAR, "articleContent" TEXT)