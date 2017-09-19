
-- =============================================
-- Author:  <Author,,Name>
-- Create date: <Create Date,,>
-- Description: <Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[commerce_Inspire_GetFilteredArticles] 
 -- Add the parameters for the stored procedure here
         @keywords nvarchar (255) = '""',
            @isAdvice bit = NULL,
            @isTheEdit bit = NULL,
            @isOurPicks bit = NULL,
            @isLookBook bit = NULL,
            @isRooms bit = NULL,
            @isVideo bit = NULL
AS
BEGIN
 -- SET NOCOUNT ON added to prevent extra result sets from
 -- interfering with SELECT statements.
 SET NOCOUNT ON;




    -- Insert statements for procedure here
 SELECT a.InspireId,ArticleTypeId, Title, ShortDescription, isHero, isAdvice, isBlog, isOurPicks, isUserContent, isVideo, isImageGallery
        ImageAssetId, ImageURL, ImageAlt,ArticleURL, ShopTheLook, DateCreated
  from StyleLibraryInspire a inner join StylelibraryInspireArticle b on a.InspireId = b.InspireID
  where deleted = 0
   and (@isAdvice = isAdvice or @isAdvice IS NULL)
   and (isBlog = @isTheEdit or @isTheEdit IS NULL)
   and (isOurPicks = @isOurPicks or @isOurPicks IS NULL)
   and (isLookBook = @isLookBook or @isLookBook IS NULL)
   and (isRooms = @isRooms or @isRooms IS NULL)
   and (isVideo = @isVideo or @isVideo IS NULL)
   and (@keywords = '""' or (CONTAINS(Title, @keywords) or CONTAINS(ArticleBody, @keywords)))
  order by ishero desc, HomepageOrder asc, DateCreated desc
END




-- =============================================
-- Author:  <Author,,Name>
-- Create date: <Create Date,,>
-- Description: <Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[commerce_Inspire_GetDefaultHomepage] 
 -- Add the parameters for the stored procedure here


AS
BEGIN
 -- SET NOCOUNT ON added to prevent extra result sets from
 -- interfering with SELECT statements.
 SET NOCOUNT ON;


    -- Insert statements for procedure here
 SELECT InspireId,ArticleTypeId, Title, ShortDescription, isHero, isAdvice, isBlog, isOurPicks, isUserContent, isVideo, isImageGallery
        ImageAssetId, ImageURL, ImageAlt,ArticleURL, ShopTheLook, DateCreated
  from StyleLibraryInspire
  where InspireHomepage = 1 and deleted = 0
  order by ishero desc, HomepageOrder asc, DateCreated desc
END




-- =============================================
-- Author:  <Author,,Name>
-- Create date: <Create Date,,>
-- Description: <Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[commerce_Inspire_GetArticle] 
 -- Add the parameters for the stored procedure here
 @URL nvarchar (255)
AS
BEGIN
 -- SET NOCOUNT ON added to prevent extra result sets from
 -- interfering with SELECT statements.
 SET NOCOUNT ON;

 
    -- Insert statements for procedure here
 SELECT ArticleId, ArticleTypeId, Title, ArticleBody, MetaTitle, MetaDescription
 FROM StylelibraryInspireArticle a
 inner join StyleLibraryInspire b on a.InspireID = b.InspireId
 Where b.ArticleURL = @URL
 end



 -- =============================================
-- Author:  <Author,,Name>
-- Create date: <Create Date,,>
-- Description: <Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[commerce_Inspire_GetArchiveArticles] 
 -- Add the parameters for the stored procedure here
  @ArticleType int,
     @articleId int


AS
BEGIN
 -- SET NOCOUNT ON added to prevent extra result sets from
 -- interfering with SELECT statements.
 SET NOCOUNT ON;

 

    -- Insert statements for procedure here
  SELECT top 10 a.InspireId, ArticleTypeId, Title, ShortDescription, isHero, isAdvice, isBlog, isOurPicks, isUserContent, isVideo, isImageGallery
        ImageAssetId, ImageURL, ImageAlt,ArticleURL, ShopTheLook, DateCreated, thumbnail
  from StyleLibraryInspire a
  inner join StylelibraryInspireArticle b on a.InspireId = b.InspireID
  where deleted = 0 and ArticleTypeId = @ArticleType and b.ArticleId != @articleId
  order by DateCreated desc
END



-- =============================================
CREATE PROCEDURE [dbo].[commerce_Inspire_GetAllArticles] 
 -- Add the parameters for the stored procedure here
AS
BEGIN
 -- SET NOCOUNT ON added to prevent extra result sets from
 -- interfering with SELECT statements.
 SET NOCOUNT ON;




    -- Insert statements for procedure here
 SELECT InspireId, ArticleTypeId, Title, ShortDescription, isHero, isAdvice, isBlog, isOurPicks, isUserContent, isVideo, isImageGallery
        ImageAssetId, ImageURL, ImageAlt,ArticleURL, ShopTheLook, DateCreated
  from StyleLibraryInspire
  where deleted = 0
  order by ishero desc, HomepageOrder asc, DateCreated desc
END






