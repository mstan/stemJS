/***********************************************************************************************************************************
* This document is not used in stemJS. It is used purely as reference material for any who wish to make use of this repository.    *
*                                                                                                                                  *
*  This module pulls the socialMedia table and passes it off as a token.                                                           *
*                                                                                                                                  *
*  This object contains the folowing key values: header,description,facebookURL,twitterURL,youTubeURL,instagramURL                 *
*                                                                                                                                  *
*  This section exists at the end of the footer.                                                                                   *
*                                                                                                                                  *
*  header - Header of the section. Text only. No hyperlinking                                                                      *
*                                                                                                                                  *
*  description - Descriptor below the Header. Text only, no hyperlinking                                                           *
*                                                                                                                                  *
*  facebookURL,twitterURL,youTubeURL,instagramURL - The URL to the corresponding social media site.                                *
*  																								  If left null, the icon is not rendered                                          *
************************************************************************************************************************************/

CREATE TABLE "socialMedia" ("header" VARCHAR, "description" TEXT, "facebookURL" VARCHAR, "twitterURL" VARCHAR, "youTubeURL" VARCHAR, "instagramURL" VARCHAR, "id" INTEGER PRIMARY KEY  AUTOINCREMENT  UNIQUE )