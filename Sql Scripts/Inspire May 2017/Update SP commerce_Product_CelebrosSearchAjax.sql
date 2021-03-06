	
	/****** Object:  StoredProcedure [dbo].[commerce_Product_CelebrosSearchAjax]    Script Date: 19/05/2017 16:46:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER proc [dbo].[commerce_Product_CelebrosSearchAjax]
(
	@PerPage bigint = 120,
	@Codes nvarchar(max),
	@CurrentPage bigint = 1,
	@ShopID BIGINT = NULL,
	@SortBy nvarchar(50) = 'Default',
	@Keywords nvarchar(255) = null,
	@CurrencyId bigint = 28,
	@SkuBrandID bigint = null,
	@RecordCount int output,
	@PageCount int output, 
	@IsB2B bit = 0
)
AS

SET NOCOUNT ON
Declare @ChangedColour bit
SET @ChangedColour = 0



--pre-populate
declare @StartRow bigint
set @StartRow = (@CurrentPage - 1) * @PerPage


CREATE TABLE #ApplicableSkus (SkuID bigint, ProductID bigint, ProductCategoryID bigint, CurrencyID bigint, ShopID bigint, PRIMARY KEY (SkuID, ProductID, ProductCategoryID, CurrencyID, ShopID) )

INSERT INTO #ApplicableSkus(SkuID, ProductID, ProductCategoryID, CurrencyID, ShopID)
SELECT DISTINCT SkuID, ProductID, ProductCategoryID, CurrencyID, ShopID 
FROM dbo.commerce_SkuSearchCache [Result] (NOLOCK)
WHERE code in (select * from  sample_split(@Codes,',')) 
	AND CurrencyID = @CurrencyId
	AND ShopID = @ShopID


/*
if @ShopID = 22
begin
	delete from #ApplicableSkus where ProductCategoryID in (16622, 16626, 17000, 17436, 17698, 18498, 16656, 17002, 18044)
end
*/


DECLARE @ASCount bigint
SELECT @Ascount = count(1) from #ApplicableSkus

print '#Applicable SKU Count'
print @ASCount


-- Search by keywords
CREATE TABLE #KeywordsResults (SkuID BIGINT, Priority bit)
declare @StrippedKeywords nvarchar(max)

--if all the keyword letters are stripped, always force no results
declare @KeywordsHardFail bit 
set @KeywordsHardFail = 0

if len(@Keywords)=0
begin
	SET @Keywords = NULL
end
else
begin
	set @Keywords = dbo.[util_RemoveNonAlphaCharacters](REPLACE(REPLACE(@Keywords,'/','_'),'''',''))
	set @StrippedKeywords = @Keywords
	set @StrippedKeywords = REPLACE(@StrippedKeywords,' ','%')
	if len(@keywords)=0
	begin
		set @KeywordsHardFail=1
	end
end
DECLARE @CodeSearch nvarchar(256);


--setup variable for filter
CREATE TABLE #FilteredData (
	SkuId BIGINT,
	ProductId BIGINT,
	ProductCategoryId BIGINT,
	IsNew BIT,
	IsFeatured BIT,
	InStock BIT,
	ProductCode NVARCHAR(50),
	ImageUri NVARCHAR(50),
	PriceInc MONEY,
	PriceEx MONEY,
	[Description] ntext,
	Name NVARCHAR(50), 
	Uri NVARCHAR(255),
	
	IsOptionProduct nvarchar(3),
	ProductType nvarchar(10),
	ParentSkuCode nvarchar(50),
	CurrencyId bigint,
	
	RowNumber bigint,
	TotalRows bigint
)
		
--setup variable for paging
declare @PagedData table(
	SkuId BIGINT,
	ProductId BIGINT,
	ProductCategoryId BIGINT,
	IsNew BIT,
	IsFeatured BIT,
	InStock BIT,
	ProductCode NVARCHAR(50),
	ImageUri NVARCHAR(50),
	PriceInc MONEY,
	PriceEx MONEY,
	[Description] ntext,
	Name NVARCHAR(50), 
	Uri NVARCHAR(255),
	
	IsOptionProduct nvarchar(3),
	ProductType nvarchar(10),
	ParentSkuCode nvarchar(50),
	CurrencyId bigint,
	
	RowNumber bigint,
	TotalRows bigint
)

CREATE TABLE #SortData (
 ProductCode NVARCHAR(50),
 RowNumber int not null identity(1,1))
 insert into #SortData (ProductCode) (select * from  sample_split(@Codes,','))

INSERT INTO #FilteredData
SELECT 
	* FROM 
(
	SELECT 
  [Result].SkuId,
  [Result].ProductId,
  [Result].ProductCategoryID,
  [Result].IsNew,
  [Result].IsFeatured,
  case ([Result].StockLevel)
   when 0 then 0
   else 1
  end as InStock,
  [Result].Code AS ProductCode, --this is actually SKU code
  'IMAGEURI' ImageUri,
  [Result].PriceInc,
  [Result].PriceEx,
  [Result].ShortDescription as [Description],
  [Result].Name,
  [Result].URI,
  --CONVERT(nvarchar(max),[Result].ShortDescription) as ShortDescription,
  [Result].IsOptionProduct,
  [Result].ProductType,
  [Result].ParentSkuCode,
  [Result].CurrencyId,
  #SortData.RowNumber AS RowNumber,
  TotalRows=Count(1) OVER() --Count all records
 from 
    dbo.commerce_SkuSearchCache [Result] (NOLOCK) 
    INNER JOIN #ApplicableSkus ask 
    on Result.SkuID=ask.SkuID 
    AND Result.ProductID=ask.ProductID 
    AND Result.ProductCategoryID=ask.ProductCategoryID 
    AND result.CurrencyID=ask.CurrencyID
    AND Result.ShopID=ask.ShopID
	inner join #SortData on Result.Code = #SortData.ProductCode
    LEFT OUTER JOIN #KeywordsResults AS KR 
    ON KR.SkuID = Result.SkuID
    
 WHERE
  ((@IsB2B = 0 AND IsB2C = 1) OR (@IsB2B = 1 ))
  AND
  [Result].CurrencyID = @CurrencyId

) FilteredData 
  Order by RowNumber asc

DECLARE @fdCount bigint
SELECT @fdCount = count(1) from #FilteredData
print 'Result set count'
print @fdCount


--WHERE RowNumber > (@StartRow) --MOVED DOWN
--PRINT @StartRow


INSERT INTO @PagedData
SELECT  TOP(@PerPage) * from #FilteredData
WHERE RowNumber > (@StartRow) 

--return the current page of data
SELECT * FROM @PagedData

SET @RecordCount = (select top 1 TotalRows from @PagedData)
SET @PageCount = round( @RecordCount/@PerPage,1 )

--print @RecordCount
--print @PageCount 

SELECT
	dbo.commerce_SkuColour.*
FROM
	dbo.commerce_SkuColour (NOLOCK)
	INNER JOIN
	@PagedData pd
	ON pd.SkuId = dbo.commerce_SkuColour.SkuId

SELECT
	dbo.commerce_Sku_ImageAsset.* 
FROM 
	dbo.commerce_Sku_ImageAsset (NOLOCK)
	INNER JOIN 
	@PagedData pd
	ON pd.SkuId = dbo.commerce_Sku_ImageAsset.SkuId
ORDER BY 
	dbo.commerce_Sku_ImageAsset.[Order]
	
SELECT 
	sao.*
FROM 
	dbo.commerce_SkuAttributeOption sao (NOLOCK)
	INNER JOIN dbo.commerce_SkuAttributeOption_Sku saos (NOLOCK)
	ON sao.SkuAttributeOptionId = saos.SkuAttributeOptionId
	INNER JOIN dbo.commerce_SkuAttributeOptionShopCache cache (NOLOCK)
	ON sao.SkuAttributeOptionId = cache.SkuAttributeOptionId
	INNER JOIN @PagedData pd 
	ON pd.SkuId = saos.SkuId
WHERE
    sao.Deleted = 0
    AND
    cache.ShopId = @ShopId

SELECT 
	sa.*
FROM 
	dbo.commerce_Sku_SkuAttribute ssa (NOLOCK)
	INNER JOIN dbo.commerce_SkuAttribute sa (NOLOCK)
	ON sa.SkuAttributeId = ssa.SkuAttributeId
	INNER JOIN @PagedData pd
	ON pd.SkuId = ssa.SkuId
WHERE
    sa.Deleted = 0

SELECT
	dbo.commerce_ProductCategory.*
FROM
	dbo.commerce_ProductCategory (NOLOCK)
	INNER JOIN 
	@PagedData pd
	ON pd.ProductCategoryId = dbo.commerce_ProductCategory.ProductCategoryID
WHERE
    dbo.commerce_ProductCategory.Deleted = 0
    AND
    dbo.commerce_ProductCategory.IsVisible = 1
--select skuimage.* from skuimage inner join @pageddata...
--select paint.* from paint inner join @pageddata...

SELECT 
	SkuId,
	[id],
	Name,
	MAX(Value) as Value
FROM
(
SELECT
	pd.SkuId,
	sa.SkuAttributeId as [id],
	sa.Name,
	COALESCE(ssa.TextValue,CONVERT(varchar,ssa.BooleanValue)) as Value
FROM
	commerce_SkuAttribute sa (NOLOCK)
	INNER JOIN commerce_Sku_SkuAttribute ssa (NOLOCK)
	ON ssa.SkuAttributeID = sa.SkuAttributeID
	INNER JOIN @PagedData pd
	ON pd.SkuID = ssa.SkuID
WHERE
    sa.Deleted = 0
UNION ALL
SELECT
	pd.SkuId,
	sa.SkuAttributeID as [id],
	sa.Name,
	sao.Name
FROM
	commerce_SkuAttribute sa (NOLOCK)
	INNER JOIN commerce_SkuAttributeOption sao (NOLOCK)
	ON sao.SkuAttributeID = sa.SkuAttributeID
	INNER JOIN commerce_SkuAttributeOption_Sku ssao (NOLOCK)
	ON ssao.SkuAttributeOptionID = sao.SkuAttributeOptionID
	INNER JOIN @PagedData pd
	ON pd.SkuID = ssao.SkuID
WHERE
    sa.Deleted = 0
    AND
    sao.Deleted = 0
) t
GROUP BY t.SkuId, [id], Name

SELECT
	s.*
FROM
	dbo.commerce_Sku s (NOLOCK)
	INNER JOIN @PagedData pd
	ON pd.SkuID = s.SkuId
	AND s.Deleted = 0
	


