/****** Object:  StoredProcedure [dbo].[commerce_ProductImport_Execute]    Script Date: 26/05/2017 11:22:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[commerce_ProductImport_Execute]
AS
BEGIN

	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

	DECLARE @StyleLibraryShopID bigint
	SET @StyleLibraryShopID = 22

	DECLARE @StyleLibraryContractShopID bigint
	SET @StyleLibraryContractShopID = 25

	RAISERROR ('Applying Source Data Fixes', 0, 0) WITH NOWAIT
	-- Moved to different SP, these routines fix a few data issues we get from Mertex
	exec commerce_ProductImport_Execute_SourceDataFixes

	RAISERROR ('Collating Attribute Options', 0, 0) WITH NOWAIT

	--Composition
    INSERT INTO commerce_SkuAttributeOption
    SELECT DISTINCT
	    39,
	    NULL,
	    Composition,
	    NULL,
	    GETDATE(),
	    GETDATE(),
	    0,
	    Composition,
	    0
    FROM
	    dbo.ProductImportTemp17 (NOLOCK)
    WHERE
	    Composition IS NOT NULL
	    AND
	    Composition NOT IN (SELECT Name FROM dbo.commerce_SkuAttributeOption (NOLOCK) WHERE SkuAttributeID = 39 AND Deleted = 0)

	--FRInherent
    INSERT INTO commerce_SkuAttributeOption
    SELECT DISTINCT
	    85,
	    NULL,
	    s.OutParam as FRInherent,
	    NULL,
	    GETDATE(),
	    GETDATE(),
	    0,
	    NULL,
	    0
    FROM
	    dbo.ProductImportTemp17 (NOLOCK)
		CROSS APPLY(SELECT * FROM dbo.SplitString(ProductImportTemp17.FRInherent,'|')) s
    WHERE
	    s.OutParam IS NOT NULL
	    AND
	    s.OutParam NOT IN (SELECT Name FROM dbo.commerce_SkuAttributeOption (NOLOCK) WHERE SkuAttributeID = 85 AND Deleted = 0)

	--FRTreated
	INSERT INTO commerce_SkuAttributeOption
    SELECT DISTINCT
	    87,
	    NULL,
	    s.OutParam as FRTreated,
	    NULL,
	    GETDATE(),
	    GETDATE(),
	    0,
	    NULL,
	    0
    FROM
	    dbo.ProductImportTemp17 (NOLOCK)
    CROSS APPLY(SELECT * FROM dbo.SplitString(ProductImportTemp17.FRTreated,'|')) s
	WHERE
	    s.OutParam IS NOT NULL
	    AND
	    s.OutParam NOT IN (SELECT Name FROM dbo.commerce_SkuAttributeOption (NOLOCK) WHERE SkuAttributeID = 87 AND Deleted = 0)

	--FRTreatable
	INSERT INTO commerce_SkuAttributeOption
    SELECT DISTINCT
	    89,
	    NULL,
	    s.OutParam as FRTreatable,
	    NULL,
	    GETDATE(),
	    GETDATE(),
	    0,
	    NULL,
	    0
    FROM
	    dbo.ProductImportTemp17 (NOLOCK)
		CROSS APPLY(SELECT * FROM dbo.SplitString(ProductImportTemp17.FRTreatable,'|')) s
    WHERE
	    s.OutParam IS NOT NULL
	    AND
	    s.OutParam NOT IN (SELECT Name FROM dbo.commerce_SkuAttributeOption (NOLOCK) WHERE SkuAttributeID = 89 AND Deleted = 0)

	--FRDrapes
	INSERT INTO commerce_SkuAttributeOption
    SELECT DISTINCT
	    69,
	    NULL,
	    FRDrapes,
	    NULL,
	    GETDATE(),
	    GETDATE(),
	    0,
	    FRDrapes,
	    0
    FROM
	    dbo.ProductImportTemp17 (NOLOCK)
    WHERE
	    FRDrapes IS NOT NULL
	    AND
	    FRDrapes NOT IN (SELECT Name FROM dbo.commerce_SkuAttributeOption (NOLOCK) WHERE SkuAttributeID = 69 AND Deleted = 0)

	--FRDomestic
    INSERT INTO commerce_SkuAttributeOption
    SELECT DISTINCT
	    55,
	    NULL,
	    FRDomestic,
	    NULL,
	    GETDATE(),
	    GETDATE(),
	    0,
	    FRDomestic,
	    0
    FROM
	    dbo.ProductImportTemp17 (NOLOCK)
    WHERE
	    FRDomestic IS NOT NULL
	    AND
	    FRDomestic NOT IN (SELECT Name FROM dbo.commerce_SkuAttributeOption (NOLOCK) WHERE SkuAttributeID = 55 AND Deleted = 0)

	--FRWallpaper
    INSERT INTO commerce_SkuAttributeOption
    SELECT DISTINCT
	    73,
	    NULL,
	    FRWallpaper,
	    NULL,
	    GETDATE(),
	    GETDATE(),
	    0,
	    FRWallpaper,
	    0
    FROM
	    dbo.ProductImportTemp17 (NOLOCK)
    WHERE
	    FRWallpaper IS NOT NULL
	    AND
	    FRWallpaper NOT IN (SELECT Name FROM dbo.commerce_SkuAttributeOption (NOLOCK) WHERE SkuAttributeID = 73 AND Deleted = 0)

	--FRContract
    INSERT INTO commerce_SkuAttributeOption
    SELECT DISTINCT
	    54,
	    NULL,
	    FRContract,
	    NULL,
	    GETDATE(),
	    GETDATE(),
	    0,
	    FRContract,
	    0
    FROM
	    dbo.ProductImportTemp17 (NOLOCK)
    WHERE
	    FRContract IS NOT NULL
	    AND
	    FRContract NOT IN (SELECT Name FROM dbo.commerce_SkuAttributeOption (NOLOCK) WHERE SkuAttributeID = 54 AND Deleted = 0)

	-- ContractUsage
	INSERT INTO commerce_SkuAttributeOption
    SELECT DISTINCT
	    97,
	    NULL,
	    s.OutParam as ContractUsage,
	    NULL,
	    GETDATE(),
	    GETDATE(),
	    0,
	    NULL,
	    0
    FROM
	    dbo.ProductImportTemp17 (NOLOCK)
		CROSS APPLY(SELECT * FROM dbo.SplitString(ProductImportTemp17.ContractUsageFilter,'|')) s
    WHERE
	    s.OutParam IS NOT NULL
		AND
		s.OutParam != ''
	    AND
	    s.OutParam NOT IN (SELECT Name FROM dbo.commerce_SkuAttributeOption (NOLOCK) WHERE SkuAttributeID = 97 AND Deleted = 0)

	-- Design Styles
	/*
	INSERT INTO commerce_SkuAttributeOption
	SELECT DISTINCT
		32,
		NULL,
		s.OutParam,
		NULL,
		GETDATE(),
		GETDATE(),
		0,
		NULL,
		0
	FROM
		dbo.ProductImportTemp17 (NOLOCK)
		CROSS APPLY(SELECT * FROM dbo.SplitString(ProductImportTemp17.DesignStyle,'|')) s
	WHERE s.OutParam IS NOT NULL
		AND s.OutParam NOT IN (SELECT Name 
								FROM dbo.commerce_SkuAttributeOption (NOLOCK) 
								WHERE SkuAttributeID = 32 AND Deleted = 0)
	*/
	--------------------------------
	
	CREATE TABLE #attributeOptions
	(
		SkuAttributeID bigint,
		SkuAttributeName nvarchar(100),
		SkuAttributeOptionID bigint,
		SkuAttributeOptionName nvarchar(200)
	)

	INSERT INTO #attributeOptions
	SELECT
		sa.SkuAttributeID,sa.Name,
		sao.SkuAttributeOptionID,sao.Name
	FROM
		dbo.commerce_SkuAttributeOption sao
		INNER JOIN dbo.commerce_SkuAttribute sa
		ON sao.SkuAttributeID = sa.SkuAttributeID
	WHERE
		sa.Deleted = 0
		AND
		sao.Deleted = 0

	RAISERROR ('Creating Table for Collection Details', 0, 0) WITH NOWAIT

	CREATE TABLE #tmp
	(
		ShopID bigint,
		SalesDivision nvarchar(50),
		ProductGroup varchar(50),
		PattBooks varchar(255),
		CollectionName nvarchar(500),
		BrandKey nvarchar(10)
	)

	/* Inserts all the collections for each of the different shops, then the specific ones where
	the flags for StyleLibrary and Style library contracts have been set into a temporary table
	ready to merge with the live data at a later point
	*/

	INSERT INTO #tmp
	SELECT DISTINCT ShopID, SalesDivision, ProductGroup, PattBooks, CollectionName, BrandKey
	FROM
	(
	SELECT DISTINCT
		ShopID,
		CASE SalesDivision
			WHEN 'HAR' THEN 'Harlequin'
			WHEN 'MOR' THEN 'Morris & Co.'
			WHEN 'SAN' THEN 'Sanderson'
			WHEN 'SCI' THEN 'Scion'
			WHEN 'ZOF' THEN 'Zoffany'
			WHEN 'STY' THEN 'Zoffany Inc'
			WHEN 'ANT' THEN 'Anthology'
			WHEN 'FR1' THEN 'FR One'
			ELSE NULL
		END as SalesDivision,
		CASE ProductGroup
			WHEN 'FB' THEN 'Fabric'
			WHEN 'WP' THEN 'Wallpaper'
			WHEN 'TR' THEN 'Trimmings'
			WHEN 'PT' THEN 'Paint'
			WHEN 'AD' THEN 'Adhesive'
			WHEN 'CU' THEN 'Cushions'
			WHEN 'BD' THEN 'Bedding'
			WHEN 'BE' THEN 'Bedding'
			WHEN 'BR' THEN 'Breakfast'
			WHEN 'FT' THEN 'Furniture'
			WHEN 'RU' THEN 'Rugs'
			WHEN 'BT' THEN 'Bathroom'
			ELSE NULL
		END as ProductGroup,
		PattBooks,
		CollectionName,
		SalesDivision as BrandKey
	FROM
		dbo.ProductImportTemp17 (NOLOCK)
		INNER JOIN dbo.commerce_Shop s (NOLOCK) ON s.Name =
		CASE SalesDivision
			WHEN 'HAR' THEN 'Harlequin'
			WHEN 'MOR' THEN 'Morris & Co.'
			WHEN 'SAN' THEN 'Sanderson'
			WHEN 'SCI' THEN 'Scion'
			WHEN 'ZOF' THEN 'Zoffany'
			WHEN 'STY' THEN 'Zoffany Inc'
			WHEN 'ANT' THEN 'Anthology'
			WHEN 'FR1' THEN 'FR One'
			ELSE NULL
		END
		AND s.Deleted = 0
	UNION ALL
	SELECT DISTINCT
		@StyleLibraryShopID,
		CASE SalesDivision
			WHEN 'HAR' THEN 'Harlequin'
			WHEN 'MOR' THEN 'Morris & Co.'
			WHEN 'SAN' THEN 'Sanderson'
			WHEN 'SCI' THEN 'Scion'
			WHEN 'ZOF' THEN 'Zoffany'
			WHEN 'STY' THEN 'Zoffany Inc'
			WHEN 'ANT' THEN 'Anthology'
			WHEN 'FR1' THEN 'FR One'
			ELSE NULL
		END as SalesDivision,
		CASE ProductGroup
			WHEN 'FB' THEN 'Fabric'
			WHEN 'WP' THEN 'Wallpaper'
			WHEN 'TR' THEN 'Trimmings'
			WHEN 'PT' THEN 'Paint'
			WHEN 'AD' THEN 'Adhesive'
			WHEN 'CU' THEN 'Cushions'
			WHEN 'BD' THEN 'Bedding'
			WHEN 'BE' THEN 'Bedding'
			WHEN 'BR' THEN 'Breakfast'
			WHEN 'FT' THEN 'Furniture'
			WHEN 'RU' THEN 'Rugs'
			WHEN 'BT' THEN 'Bathroom'
			ELSE NULL
		END as ProductGroup,
		PattBooks,
		CollectionName,
		SalesDivision as BrandKey
	FROM
		dbo.ProductImportTemp17 (NOLOCK)
    WHERE
	   StyleLibraryVisible IS NULL OR StyleLibraryVisible != 'N'
	UNION ALL
	SELECT DISTINCT
		@StyleLibraryContractShopID,
		CASE SalesDivision
			WHEN 'HAR' THEN 'Harlequin'
			WHEN 'MOR' THEN 'Morris & Co.'
			WHEN 'SAN' THEN 'Sanderson'
			WHEN 'SCI' THEN 'Scion'
			WHEN 'ZOF' THEN 'Zoffany'
			WHEN 'STY' THEN 'Zoffany Inc'
			WHEN 'ANT' THEN 'Anthology'
			WHEN 'FR1' THEN 'FR One'
			ELSE NULL
		END as SalesDivision,
		CASE ProductGroup
			WHEN 'FB' THEN 'Fabric'
			WHEN 'WP' THEN 'Wallpaper'
			WHEN 'TR' THEN 'Trimmings'
			WHEN 'PT' THEN 'Paint'
			WHEN 'AD' THEN 'Adhesive'
			WHEN 'CU' THEN 'Cushions'
			WHEN 'BD' THEN 'Bedding'
			WHEN 'BE' THEN 'Bedding'
			WHEN 'BR' THEN 'Breakfast'
			WHEN 'FT' THEN 'Furniture'
			WHEN 'RU' THEN 'Rugs'
			WHEN 'BT' THEN 'Bathroom'
			ELSE NULL
		END as ProductGroup,
		PattBooks,
		CollectionName,
		SalesDivision as BrandKey
	FROM
		dbo.ProductImportTemp17 (NOLOCK)
    WHERE
	   -- StyleLibraryContractsVisible IS NULL OR StyleLibraryContractsVisible != 'N'
	   -- The filter on the style library contracts is the opposite to style library and should only include on Y
	   StyleLibraryContractsVisible = 'Y'
	) t
	ORDER BY 3

	RAISERROR ('Creating Table for Design/Colourway Details', 0, 0) WITH NOWAIT

	CREATE TABLE #tmp2
	(
		SalesDivision nvarchar(50),
		ProductGroup varchar(50),
		PattBooks varchar(255),
		CollectionName nvarchar(500),
		DesignName nvarchar(500),
		DesignDescription nvarchar(MAX),
		DesignStyle nvarchar(500),
		ProductCode nvarchar(500),
		[Description] nvarchar(MAX),
		DesignCode nvarchar(MAX),
		Width decimal(11,2),
		TechComposition nvarchar(500),
		ProductType nvarchar(500),
		PatternMatch nvarchar(500),
		PatternMatchDescription nvarchar(500),
		RubTestResults nvarchar(500),
		DescriptiveColour nvarchar(500),
		MertexAccount nvarchar(500),
		UsageCode nvarchar(500),
		FrContract nvarchar(500),
		FrDomestic nvarchar(500),
		FrDrapes nvarchar(500),
		FrWallpaper nvarchar(500),
		[Contract] nvarchar(500),
		Blackout nvarchar(500),
		ComingSoonUK nvarchar(500),
		ComingSoonUS nvarchar(500),
		AllowReserve nvarchar(5),
		AfterCareCodes nvarchar(500),
		SmallScale nvarchar(500),
		SkuGroupCode nvarchar(500),
		CollectionCode nvarchar(500),
		[Sample] nvarchar(20),
		URI varchar(500),
		VerticalPatternRepeat varchar(500),
		HorizontalPatternRepeat varchar(500),
		Composition varchar(500),
		ShopID bigint,
		SortName varchar(500),
		OtherInfo nvarchar(1000),
		OverallLightnessColour varchar(20),
		CompositionDescription varchar(500),
		SampleProductCodes varchar(500),
		StockCode varchar(255),
		PublishStartDate datetime,
		ReadyForWeb nvarchar(4),
		IsB2C bit,
		IsB2B bit,
		ItemType nvarchar(10),
		IsOptionProduct nvarchar(10),
		OutOfStock bit,
		DefaultOrderLocation nvarchar(10),
		ParentProductCode nvarchar(500),
		[Weight] nvarchar(50),
		FRInherent varchar(MAX),
		FRTreated varchar(MAX),
		FRTreatable varchar(MAX),
		StockedByThirdParty varchar(255),
		ContractUsage nvarchar(max),
		ContractUsageFilter nvarchar(max),
		SpecSheetAvePieceSize nvarchar(255),
        SpecSheetFinCodes nvarchar(max),
        SpecSheetIntraStat nvarchar(255),
        SpecSheetOrCountry nvarchar(255),
        SpecSheetReverse nvarchar(255),
        SpecSheetSQMeter nvarchar(255),
        SpecSheetThreadPerCm nvarchar(255),
        SpecSheetYarnNo nvarchar(255),
		SpecEanCode nvarchar(20),												--added 13/07/2016 By Ozz
		SpecSupplierProductCode nvarchar(255),									--added 13/07/2016 By Ozz
		SpecUnitOfMeasurement nvarchar(5),										--added 13/07/2016 By Ozz
		AfterCare nvarchar(500),												--added 12/12/2016 By Ozz
		ThirdPartyUrl nvarchar(150)												--added 26/04/2017 By Ozz
	)

	/*
		Insert into the temp table all of the designs and coloursways, first by shop
		then by the style library and contracts flags.

	*/

	INSERT INTO #tmp2
	SELECT DISTINCT
		CASE SalesDivision
			WHEN 'HAR' THEN 'Harlequin'
			WHEN 'MOR' THEN 'Morris & Co.'
			WHEN 'SAN' THEN 'Sanderson'
			WHEN 'SCI' THEN 'Scion'
			WHEN 'ZOF' THEN 'Zoffany'
			WHEN 'STY' THEN 'Zoffany Inc'
			WHEN 'ANT' THEN 'Anthology'
			WHEN 'FR1' THEN 'FR One'
			ELSE NULL
		END as SalesDivision,
		CASE ProductGroup
			WHEN 'FB' THEN 'Fabric'
			WHEN 'WP' THEN 'Wallpaper'
			WHEN 'TR' THEN 'Trimmings'
			WHEN 'PT' THEN 'Paint'
			WHEN 'AD' THEN 'Adhesive'
			WHEN 'CU' THEN 'Cushions'
			WHEN 'BD' THEN 'Bedding'
			WHEN 'BE' THEN 'Bedding'
			WHEN 'BR' THEN 'Breakfast'
			WHEN 'FT' THEN 'Furniture'
			WHEN 'RU' THEN 'Rugs'
			WHEN 'BT' THEN 'Bathroom'
		ELSE NULL
		END as ProductGroup,
		PattBooks,
		CollectionName,
		DesignName,
		DesignDescription,
		DesignStyle,
		ProductCode,
		[Description],
		DesignCode,
		Width,
		TechComposition,
		ProductType,
		PatternMatch,
		PatternMatchDescription,
		RubTestResults,
		DescriptiveColour,
		MertexAccount,
		UsageCode,
		FrContract,
		FrDomestic,
		FrDrapes,
		FrWallpaper,
		[Contract],
		Blackout,
		ComingSoonUK,
		ComingSoonUS,
		AllowReserve,
		AfterCareCodes,
		SmallScale,
		UPPER(REPLACE(CollectionName + '|' +
		DesignName + '|' +
		CASE ProductGroup
			WHEN 'FB' THEN 'Fabric'
			WHEN 'WP' THEN 'Wallpaper'
			WHEN 'TR' THEN 'Trimmings'
			WHEN 'PT' THEN 'Paint'
			WHEN 'AD' THEN 'Adhesive'
			WHEN 'CU' THEN 'Cushions'
			WHEN 'BD' THEN 'Bedding'
			WHEN 'BE' THEN 'Bedding'
			WHEN 'BR' THEN 'Breakfast'
			WHEN 'FT' THEN 'Furniture'
			WHEN 'RU' THEN 'Rugs'
			WHEN 'BT' THEN 'Bathroom'
			ELSE NULL
		END + '|' +
		CASE SalesDivision
			WHEN 'HAR' THEN 'Harlequin'
			WHEN 'MOR' THEN 'Morris & Co.'
			WHEN 'SAN' THEN 'Sanderson'
			WHEN 'SCI' THEN 'Scion'
			WHEN 'ZOF' THEN 'Zoffany'
			WHEN 'STY' THEN 'Zoffany Inc'
			WHEN 'ANT' THEN 'Anthology'
			WHEN 'FR1' THEN 'FR One'
			ELSE NULL
		END, ' ', '')) as SkuGroupCode,
		CASE WHEN ProductGroup IN ('CU','BE', 'BD','BR', 'FT', 'RU', 'BT') THEN
			CASE ProductGroup
				WHEN 'CU' THEN
					LEFT(PattBooks, CHARINDEX( '|', PattBooks, CHARINDEX( '|', PattBooks) + 1) - 1) + '|'
				WHEN 'BD' THEN 'Bedding'
				WHEN 'BE' THEN 'Bedding'
				WHEN 'BR' THEN 'Breakfast'
				WHEN 'FT' THEN 'Furniture'
				WHEN 'RU' THEN 'Rugs'	
				WHEN 'BT' THEN 'Bathroom'
				ELSE NULL
			END  + '|' +
			CASE SalesDivision
				WHEN 'HAR' THEN 'Harlequin'
				WHEN 'MOR' THEN 'Morris & Co.'
				WHEN 'SAN' THEN 'Sanderson'
				WHEN 'SCI' THEN 'Scion'
				WHEN 'ZOF' THEN 'Zoffany'
				WHEN 'STY' THEN 'Zoffany Inc'
				WHEN 'ANT' THEN 'Anthology'
				WHEN 'FR1' THEN 'FR One'
				ELSE NULL
			END
			ELSE PattBooks + '|' +
				CASE SalesDivision
					WHEN 'HAR' THEN 'Harlequin'
					WHEN 'MOR' THEN 'Morris & Co.'
					WHEN 'SAN' THEN 'Sanderson'
					WHEN 'SCI' THEN 'Scion'
					WHEN 'ZOF' THEN 'Zoffany'
					WHEN 'STY' THEN 'Zoffany Inc'
					WHEN 'ANT' THEN 'Anthology'
					WHEN 'FR1' THEN 'FR One'
					ELSE NULL
				END + '|' +  UPPER(REPLACE(CollectionName,' ','-'))
		END AS CollectionCode,
		[Sample],
		dbo.[util_MakeSafeURI]([DesignName]) as URI,
		VerticalPatternRepeat,
		HorizontalPatternRepeat,
		Composition,
		ShopID,
		SortName,
		OtherInfo,
		OverallLightnessColour,
		CompositionDescription,
		SampleProductCodes,
		ISNULL(StockCode, ''),
		LaunchDate,
		ReadyForWeb,
		(SELECT CASE WHEN SiteVisibility IS NULL OR SiteVisibility = 'B2C' OR SiteVisibility = 'BOTH' THEN 1 ELSE 0 END) AS IsB2C,
		(SELECT CASE WHEN SiteVisibility IS NULL OR SiteVisibility = 'B2B' OR SiteVisibility = 'BOTH' THEN 1 ELSE 0 END) AS IsB2B,
		ItemType,
		IsOptionProduct,
		(SELECT CASE WHEN OutOfStock IS NULL OR OutOfStock = 'N' THEN 0	ELSE 1 END) AS OutOfStock,
		DefaultOrderLocation,
		ParentProductCode,
		[Weight],
		FRInherent,
		FRTreated,
		FRTreatable,
		CASE WHEN StockedByThirdParty IS NOT NULL THEN '1' ELSE '0' END AS StockedByThirdParty,
		ContractUsage,
		ContractUsageFilter,
		SpecSheetAvePieceSize,
        SpecSheetFinCodes,
        SpecSheetIntraStat,
        SpecSheetOrCountry,
        SpecSheetReverse,
        SpecSheetSQMeter,
        SpecSheetThreadPerCm,
        SpecSheetYarnNo,
		SpecEanCode,												--added 13/07/2016 By Ozz
		SpecSupplierProductCode,									--added 13/07/2016 By Ozz
		SpecUnitOfMeasurement,										--added 13/07/2016 By Ozz
		AfterCare,													--added 12/12/2016 By Ozz
		ThirdPartyUrl

	FROM
		dbo.ProductImportTemp17 (NOLOCK)
		INNER JOIN dbo.commerce_Shop s (NOLOCK) ON s.Name =
		CASE SalesDivision
			WHEN 'HAR' THEN 'Harlequin'
			WHEN 'MOR' THEN 'Morris & Co.'
			WHEN 'SAN' THEN 'Sanderson'
			WHEN 'SCI' THEN 'Scion'
			WHEN 'ZOF' THEN 'Zoffany'
			WHEN 'STY' THEN 'Zoffany Inc'
			WHEN 'ANT' THEN 'Anthology'
			WHEN 'FR1' THEN 'FR One'
			ELSE NULL
		END
		AND s.Deleted = 0

	UNION ALL

	SELECT DISTINCT
		CASE SalesDivision
			WHEN 'HAR' THEN 'Harlequin'
			WHEN 'MOR' THEN 'Morris & Co.'
			WHEN 'SAN' THEN 'Sanderson'
			WHEN 'SCI' THEN 'Scion'
			WHEN 'ZOF' THEN 'Zoffany'
			WHEN 'STY' THEN 'Zoffany Inc'
			WHEN 'ANT' THEN 'Anthology'
			WHEN 'FR1' THEN 'FR One'
			ELSE NULL
		END as SalesDivision,
		CASE ProductGroup
			WHEN 'FB' THEN 'Fabric'
			WHEN 'WP' THEN 'Wallpaper'
			WHEN 'TR' THEN 'Trimmings'
			WHEN 'PT' THEN 'Paint'
			WHEN 'AD' THEN 'Adhesive'
			WHEN 'CU' THEN 'Cushions'
			WHEN 'BD' THEN 'Bedding'
			WHEN 'BE' THEN 'Bedding'
			WHEN 'BR' THEN 'Breakfast'
			WHEN 'FT' THEN 'Furniture'
			WHEN 'RU' THEN 'Rugs'
			WHEN 'BT' THEN 'Bathroom'
			ELSE NULL
		END as ProductGroup,
		PattBooks,
		CollectionName,
		DesignName,
		DesignDescription,
		DesignStyle,
		ProductCode,
		[Description],
		DesignCode,
		Width,
		TechComposition,
		ProductType,
		PatternMatch,
		PatternMatchDescription,
		RubTestResults,
		DescriptiveColour,
		MertexAccount,
		UsageCode,
		FrContract,
		FrDomestic,
		FrDrapes,
		FrWallpaper,
		[Contract],
		Blackout,
		ComingSoonUK,
		ComingSoonUS,
		AllowReserve,
		AfterCareCodes,
		SmallScale,
		UPPER(REPLACE(CollectionName + '|' +
		DesignName + '|' +
			CASE ProductGroup
				WHEN 'FB' THEN 'Fabric'
				WHEN 'WP' THEN 'Wallpaper'
				WHEN 'TR' THEN 'Trimmings'
				WHEN 'PT' THEN 'Paint'
				WHEN 'AD' THEN 'Adhesive'
				WHEN 'CU' THEN 'Cushions'
				WHEN 'BD' THEN 'Bedding'
				WHEN 'BE' THEN 'Bedding'
				WHEN 'BR' THEN 'Breakfast'
				WHEN 'FT' THEN 'Furniture'
				WHEN 'RU' THEN 'Rugs'
				WHEN 'BT' THEN 'Bathroom'
				ELSE NULL
			END + '|' +
			CASE SalesDivision
				WHEN 'HAR' THEN 'Harlequin'
				WHEN 'MOR' THEN 'Morris & Co.'
				WHEN 'SAN' THEN 'Sanderson'
				WHEN 'SCI' THEN 'Scion'
				WHEN 'ZOF' THEN 'Zoffany'
				WHEN 'STY' THEN 'Zoffany Inc'
				WHEN 'ANT' THEN 'Anthology'
				WHEN 'FR1' THEN 'FR One'
				ELSE NULL
			END, ' ', '')
		) as SkuGroupCode,
		CASE WHEN ProductGroup IN ('CU','BE', 'BD', 'BR', 'FT', 'RU', 'BT') THEN
			CASE ProductGroup
				WHEN 'CU' THEN 'Cushions'
				WHEN 'BD' THEN 'Bedding'
				WHEN 'BE' THEN 'Bedding'
				WHEN 'BR' THEN 'Breakfast'
				WHEN 'FT' THEN 'Furniture'
				WHEN 'RU' THEN 'Rugs'
				WHEN 'BT' THEN 'Bathroom'
				ELSE NULL
			END
		ELSE
			PattBooks + '|' +
			CASE SalesDivision
				WHEN 'HAR' THEN 'Harlequin'
				WHEN 'MOR' THEN 'Morris & Co.'
				WHEN 'SAN' THEN 'Sanderson'
				WHEN 'SCI' THEN 'Scion'
				WHEN 'ZOF' THEN 'Zoffany'
				WHEN 'STY' THEN 'Zoffany Inc'
				WHEN 'ANT' THEN 'Anthology'
				WHEN 'FR1' THEN 'FR One'
				ELSE NULL
			END + '|' +
			UPPER(REPLACE(CollectionName,' ','-'))
		END AS CollectionCode,
		[Sample],
		dbo.[util_MakeSafeURI]([DesignName]) as URI,
		VerticalPatternRepeat,
		HorizontalPatternRepeat,
		Composition,
		@StyleLibraryShopID,
		SortName,
		OtherInfo,
		OverallLightnessColour,
		CompositionDescription,
		SampleProductCodes,
		ISNULL(StockCode, ''),
		LaunchDate,
		ReadyForWeb,
		(SELECT CASE WHEN SiteVisibility IS NULL OR SiteVisibility = 'B2C' OR SiteVisibility = 'BOTH' THEN 1
				ELSE 0
		END) AS IsB2C,
		(SELECT CASE WHEN SiteVisibility IS NULL OR SiteVisibility = 'B2B' OR SiteVisibility = 'BOTH' THEN 1
				ELSE 0
		END) AS IsB2B,
		ItemType,
		IsOptionProduct,
		(SELECT CASE WHEN OutOfStock IS NULL OR OutOfStock = 'N' THEN 0
			ELSE 1
		END) AS OutOfStock,
		DefaultOrderLocation,
		ParentProductCode,
		[Weight],
		FRInherent,
		FRTreated,
		FRTreatable,
		CASE WHEN StockedByThirdParty IS NOT NULL THEN 1 ELSE 0 END AS StockedByThirdParty,
		ContractUsage,
		ContractUsageFilter,
		SpecSheetAvePieceSize,
        SpecSheetFinCodes,
        SpecSheetIntraStat,
        SpecSheetOrCountry,
        SpecSheetReverse,
        SpecSheetSQMeter,
        SpecSheetThreadPerCm,
        SpecSheetYarnNo,
		SpecEanCode,												--added 13/07/2016 By Ozz
		SpecSupplierProductCode,									--added 13/07/2016 By Ozz
		SpecUnitOfMeasurement,										--added 13/07/2016 By Ozz
		AfterCare,													--added 12/12/2016 By Ozz
		ThirdPartyUrl
	FROM
		dbo.ProductImportTemp17 (NOLOCK)
    WHERE
	   StyleLibraryVisible IS NULL OR StyleLibraryVisible != 'N'

	UNION ALL

	SELECT DISTINCT
		CASE SalesDivision
			WHEN 'HAR' THEN 'Harlequin'
			WHEN 'MOR' THEN 'Morris & Co.'
			WHEN 'SAN' THEN 'Sanderson'
			WHEN 'SCI' THEN 'Scion'
			WHEN 'ZOF' THEN 'Zoffany'
			WHEN 'STY' THEN 'Zoffany Inc'
			WHEN 'ANT' THEN 'Anthology'
			WHEN 'FR1' THEN 'FR One'
			ELSE NULL
		END as SalesDivision,
		CASE ProductGroup
			WHEN 'FB' THEN 'Fabric'
			WHEN 'WP' THEN 'Wallpaper'
			WHEN 'TR' THEN 'Trimmings'
			WHEN 'PT' THEN 'Paint'
			WHEN 'AD' THEN 'Adhesive'
			WHEN 'CU' THEN 'Cushions'
			WHEN 'BD' THEN 'Bedding'
			WHEN 'BE' THEN 'Bedding'
			WHEN 'BR' THEN 'Breakfast'
			WHEN 'BT' THEN 'Bathroom'
			ELSE NULL
		END as ProductGroup,
		PattBooks,
		CollectionName,
		DesignName,
		DesignDescription,
		DesignStyle,
		ProductCode,
		[Description],
		DesignCode,
		Width,
		TechComposition,
		ProductType,
		PatternMatch,
		PatternMatchDescription,
		RubTestResults,
		DescriptiveColour,
		MertexAccount,
		UsageCode,
		FrContract,
		FrDomestic,
		FrDrapes,
		FrWallpaper,
		[Contract],
		Blackout,
		ComingSoonUK,
		ComingSoonUS,
		AllowReserve,
		AfterCareCodes,
		SmallScale,
		UPPER(REPLACE(CollectionName + '|' +
		DesignName + '|' +
			CASE ProductGroup
				WHEN 'FB' THEN 'Fabric'
				WHEN 'WP' THEN 'Wallpaper'
				WHEN 'TR' THEN 'Trimmings'
				WHEN 'PT' THEN 'Paint'
				WHEN 'AD' THEN 'Adhesive'
				WHEN 'CU' THEN 'Cushions'
				WHEN 'BD' THEN 'Bedding'
				WHEN 'BE' THEN 'Bedding'
				WHEN 'BR' THEN 'Breakfast'
				WHEN 'FT' THEN 'Furniture'
				WHEN 'RU' THEN 'Rugs'
				WHEN 'BT' THEN 'Bathroom'
				ELSE NULL
			END + '|' +
			CASE SalesDivision
				WHEN 'HAR' THEN 'Harlequin'
				WHEN 'MOR' THEN 'Morris & Co.'
				WHEN 'SAN' THEN 'Sanderson'
				WHEN 'SCI' THEN 'Scion'
				WHEN 'ZOF' THEN 'Zoffany'
				WHEN 'STY' THEN 'Zoffany Inc'
				WHEN 'ANT' THEN 'Anthology'
				WHEN 'FR1' THEN 'FR One'
				ELSE NULL
			END, ' ', '')
		) as SkuGroupCode,
		CASE WHEN ProductGroup IN ('CU','BE', 'BD', 'BR', 'FT', 'RU', 'BT') THEN
			CASE ProductGroup
				WHEN 'CU' THEN 'Cushions'
				WHEN 'BD' THEN 'Bedding'
				WHEN 'BE' THEN 'Bedding'
				WHEN 'BR' THEN 'Breakfast'
				WHEN 'FT' THEN 'Furniture'
				WHEN 'RU' THEN 'Rugs'
				WHEN 'BT' THEN 'Bathroom'
				ELSE NULL
			END
		ELSE
			PattBooks + '|' +
			CASE SalesDivision
				WHEN 'HAR' THEN 'Harlequin'
				WHEN 'MOR' THEN 'Morris & Co.'
				WHEN 'SAN' THEN 'Sanderson'
				WHEN 'SCI' THEN 'Scion'
				WHEN 'ZOF' THEN 'Zoffany'
				WHEN 'STY' THEN 'Zoffany Inc'
				WHEN 'ANT' THEN 'Anthology'
				WHEN 'FR1' THEN 'FR One'
				ELSE NULL
			END + '|' +
			UPPER(REPLACE(CollectionName,' ','-'))
		END AS CollectionCode,
		[Sample],
		dbo.[util_MakeSafeURI]([DesignName]) as URI,
		VerticalPatternRepeat,
		HorizontalPatternRepeat,
		Composition,
		@StyleLibraryContractShopID,
		SortName,
		OtherInfo,
		OverallLightnessColour,
		CompositionDescription,
		SampleProductCodes,
		ISNULL(StockCode, ''),
		LaunchDate,
		ReadyForWeb,
		(SELECT CASE WHEN SiteVisibility IS NULL OR SiteVisibility = 'B2C' OR SiteVisibility = 'BOTH' THEN 1
				ELSE 0
		END) AS IsB2C,
		(SELECT CASE WHEN SiteVisibility IS NULL OR SiteVisibility = 'B2B' OR SiteVisibility = 'BOTH' THEN 1
				ELSE 0
		END) AS IsB2B,
		ItemType,
		IsOptionProduct,
		(SELECT CASE WHEN OutOfStock IS NULL OR OutOfStock = 'N' THEN 0
			ELSE 1
		END) AS OutOfStock,
		DefaultOrderLocation,
		ParentProductCode,
		[Weight],
		FRInherent,
		FRTreated,
		FRTreatable,
		CASE WHEN StockedByThirdParty IS NOT NULL THEN 1 ELSE 0 END AS StockedByThirdParty,
		ContractUsage,
		ContractUsageFilter,
		SpecSheetAvePieceSize,
        SpecSheetFinCodes,
        SpecSheetIntraStat,
        SpecSheetOrCountry,
        SpecSheetReverse,
        SpecSheetSQMeter,
        SpecSheetThreadPerCm,
        SpecSheetYarnNo,
		SpecEanCode,												--added 13/07/2016 By Ozz
		SpecSupplierProductCode,									--added 13/07/2016 By Ozz
		SpecUnitOfMeasurement,										--added 13/07/2016 By Ozz
		AfterCare,													--added 12/12/2016 By Ozz
		ThirdPartyUrl
	FROM
		dbo.ProductImportTemp17 (NOLOCK)
    WHERE
	   StyleLibraryContractsVisible = 'Y'

	DECLARE @CurrentDate datetime
	SET @CurrentDate = GETDATE()

	/*
		Temp table insertions are complete
		start merging the new data with the underlying website tables
	*/

	--Root Categories Per Brand
	RAISERROR ('Importing Top Level Categories', 0, 0) WITH NOWAIT

	MERGE dbo.commerce_ProductCategory AS T
	USING
	(
	SELECT DISTINCT
		shopID as ShopID,
		NULL as ParentID,
		ProductGroup as Name,
		ProductGroup as ShortDescription,
		'<p>'+ProductGroup+'</p>' as LongDescription,
		1 as [Type],
		NULL as ImageAssetID,
		1 as IsVisible,
		0 as [Order],
		REPLACE(LOWER(REPLACE(ProductGroup, '.', '')),' ','-') as URI,
		GETDATE() as Created,
		GETDATE() as LastModified,
		0 as Deleted,
		0 as IsManuallyOrdered,
		1 as DisplayInNavigation,
		1 as DisplayInSecondaryNavigation,
		CONVERT(nvarchar(500), LEFT(PattBooks, CHARINDEX( '|', PattBooks, CHARINDEX( '|', PattBooks) + 1) - 1) + '|' + SalesDivision) as Code,
		0 as DisplayInListing,
		1 as IsNew,
		BrandKey
	FROM
		#tmp t (NOLOCK)
	WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL and ShopId != @StyleLibraryShopId and ShopId != @StyleLibraryContractShopId
	GROUP BY ShopID, ProductGroup, LEFT(PattBooks, CHARINDEX( '|', PattBooks, CHARINDEX( '|', PattBooks) + 1) - 1) + '|' + SalesDivision, BrandKey
	UNION ALL
	SELECT DISTINCT
		shopID as ShopID,
		NULL as ParentID,
		ProductGroup as Name,
		ProductGroup as ShortDescription,
		'<p>'+ProductGroup+'</p>' as LongDescription,
		1 as [Type],
		NULL as ImageAssetID,
		1 as IsVisible,
		0 as [Order],
		REPLACE(LOWER(REPLACE(ProductGroup, '.', '')),' ','-') as URI,
		GETDATE() as Created,
		GETDATE() as LastModified,
		0 as Deleted,
		0 as IsManuallyOrdered,
		1 as DisplayInNavigation,
		1 as DisplayInSecondaryNavigation,
		ProductGroup, -- Code
		0 as DisplayInListing,
		1 as IsNew,
		null
	FROM
		#tmp t (NOLOCK)
	WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL and ShopId = @StyleLibraryShopId
	GROUP BY ShopID, ProductGroup
	UNION ALL
	SELECT DISTINCT
		shopID as ShopID,
		NULL as ParentID,
		ProductGroup as Name,
		ProductGroup as ShortDescription,
		'<p>'+ProductGroup+'</p>' as LongDescription,
		1 as [Type],
		NULL as ImageAssetID,
		1 as IsVisible,
		0 as [Order],
		REPLACE(LOWER(REPLACE(ProductGroup, '.', '')),' ','-') as URI,
		GETDATE() as Created,
		GETDATE() as LastModified,
		0 as Deleted,
		0 as IsManuallyOrdered,
		1 as DisplayInNavigation,
		1 as DisplayInSecondaryNavigation,
		ProductGroup, -- Code
		0 as DisplayInListing,
		1 as IsNew,
		null
	FROM
		#tmp t (NOLOCK)
	WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL and ShopId = @StyleLibraryContractShopID
	GROUP BY ShopID, ProductGroup
	) AS S
	ON
	(
		T.ShopID = S.ShopID
		AND
		LTRIM(RTRIM(UPPER(T.Code))) = LTRIM(RTRIM(UPPER(S.Code)))
		AND
		T.Deleted = 0
		AND
		T.ParentID IS NULL
	)
	WHEN NOT MATCHED BY TARGET THEN
		INSERT (ShopID, ParentID, Name, ShortDescription, LongDescription, [Type],
				ImageAssetID, IsVisible, [Order], URI, Created, LastModified, Deleted,
				IsManuallyOrdered, DisplayInNavigation, DisplayInSecondaryNavigation, Code,
				DisplayInListing, IsNew, BrandKey)
		VALUES
		(
			S.ShopID, S.ParentID, S.Name, S.ShortDescription, S.LongDescription, S.[Type],
			S.ImageAssetID, S.IsVisible, S.[Order], S.URI, S.Created, S.LastModified, S.Deleted,
			S.IsManuallyOrdered, S.DisplayInNavigation, S.DisplayInSecondaryNavigation, S.Code,
			S.DisplayInListing, S.IsNew, S.BrandKey
		)
	--WHEN MATCHED AND T.ParentID IS NULL AND T.Deleted = 0 AND (S.Name != T.Name OR S.ShortDescription != T.ShortDescription OR S.LongDescription != T.LongDescription) THEN
	--	UPDATE
	--	SET
	--		Name = S.Name,
	--		ShortDescription = S.ShortDescription,
	--		LongDescription = S.LongDescription,
	--		LastModified = S.LastModified
	--WHEN NOT MATCHED BY SOURCE AND T.ParentID IS NULL AND T.Deleted = 0 THEN
	--	UPDATE
	--	SET
	--		Deleted = 1
	OUTPUT $action, inserted.*, deleted.*;


	-- Collections
	RAISERROR ('Importing Collections', 0, 0) WITH NOWAIT

	MERGE dbo.commerce_ProductCategory AS T
	USING
	(
	SELECT DISTINCT
		shopID as ShopID,
		(
			SELECT TOP 1 ProductCategoryID
			FROM dbo.commerce_ProductCategory pc (NOLOCK)
			WHERE	Deleted = 0 AND
					(
						(
							t.ShopID = @StyleLibraryShopID and
							pc.ShopID = @StyleLibraryShopID and
							pc.Code = t.ProductGroup and
							pc.Deleted = 0
						) or
						(
							t.ShopID = @StyleLibraryContractShopId and
							pc.ShopId = @StyleLibraryContractShopId and
							pc.Code = t.ProductGroup and
							pc.Deleted = 0
						) or
						(
							pc.ShopID = t.shopId
							AND
							CHARINDEX( '|', PattBooks, CHARINDEX( '|', PattBooks) + 1) - 1 != -1
							AND
							pc.Code = LEFT(PattBooks, CHARINDEX( '|', PattBooks, CHARINDEX( '|', PattBooks) + 1) - 1)+ '|' + SalesDivision
						)
					)
			ORDER BY ProductCategoryID
		) as ParentID,
		CollectionName as Name,
		CollectionName as ShortDescription,
		'<p>' + CollectionName + '</p>' as LongDescription,
		1 as [Type],
		NULL as ImageAssetID,
		1 as IsVisible,
		0 as [Order],
		dbo.[Util_MakeSafeURI](CollectionName) as URI,
		--CASE WHEN ShopID = @StyleLibraryShopId or ShopId = @StyleLibraryContractShopId THEN REPLACE(REPLACE(REPLACE(LOWER(SalesDivision),' & ','-and-'),' ','-'), '.', '') + '/' ELSE '' END + REPLACE(REPLACE(REPLACE(REPLACE(LOWER(CollectionName),' & ','-and-'),' ','-'), '''',''), '.', '') as URI,
		GETDATE() as Created,
		GETDATE() as LastModified,
		0 as Deleted,
		0 as IsManuallyOrdered,
		1 as DisplayInNavigation,
		1 as DisplayInSecondaryNavigation,
		PattBooks + '|' + SalesDivision + '|' + UPPER(REPLACE(CollectionName,' ','-')) as Code,
		0 as DisplayInListing,
		1 as IsNew,
		BrandKey
	FROM
		#tmp t (NOLOCK)
	WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL AND
			CollectionName IS NOT NULL AND ProductGroup NOT IN ('Cushions', 'Bedding', 'Breakfast', 'Furniture', 'Rugs', 'Bathroom')
	GROUP BY ShopID, CollectionName, ProductGroup, PattBooks, SalesDivision, PattBooks + '|' + SalesDivision + '|' + REPLACE(CollectionName,' ','-'), BrandKey
	) AS S
	ON
	(
		T.ShopID = S.ShopID
		AND
--		T.Code = S.Code
-- Added same TRIM etc as parent condition as duplicates are still being created NC
		LTRIM(RTRIM(UPPER(T.Code))) = LTRIM(RTRIM(UPPER(S.Code)))
		AND
		T.Deleted = 0
		AND
		T.ParentID IS NOT NULL
		AND
		S.ParentID IS NOT NULL
	)
	WHEN NOT MATCHED BY TARGET
		THEN INSERT (ShopID, ParentID, Name, ShortDescription, LongDescription, [Type],
		ImageAssetID, IsVisible, [Order], URI, Created, LastModified, Deleted, IsManuallyOrdered,
		DisplayInNavigation, DisplayInSecondaryNavigation, Code, DisplayInListing, IsNew, BrandKey)
		VALUES
		(
			S.ShopID, S.ParentID, S.Name, S.ShortDescription, S.LongDescription, S.[Type],
			S.ImageAssetID, S.IsVisible, S.[Order], S.URI, S.Created, S.LastModified, S.Deleted,
			S.IsManuallyOrdered, S.DisplayInNavigation, S.DisplayInSecondaryNavigation, S.Code,
			S.DisplayInListing, S.IsNew, S.Brandkey
		)
	WHEN MATCHED AND T.ParentID IS NOT NULL AND T.Deleted = 0 AND (S.ParentID != T.ParentID OR S.Name != T.Name OR S.ShortDescription != T.ShortDescription OR S.LongDescription != T.LongDescription) THEN
		UPDATE
		SET
			ParentID = S.ParentID,
			Name = S.Name,
    -- REmoved update of descriptions from Mertex, these are only to be altered in the CMS
	--		ShortDescription = S.ShortDescription,
	--		LongDescription = S.LongDescription,
			LastModified = S.LastModified,
			URI = S.URI
-- Removed because of Mertex issues and being close to launch, have agreed to manually delete collections.
--	WHEN NOT MATCHED BY SOURCE AND T.ParentID IS NOT NULL AND T.Deleted = 0 THEN
--		UPDATE
--		SET
--			Deleted = 1
	OUTPUT $action, inserted.*, deleted.*;

	-- Designs
	RAISERROR ('Importing Designs (SKUGROUP)', 0, 0) WITH NOWAIT

	;WITH SkuGroups (
	Name, ShortDescription, LongDescription, Specification, FurtherInfo, IsVisible, IsFeatured, IsNew, DisplayInHomepageCarousel, SkuBrandID, Created, LastModified, Deleted, Code, LegislativeText, SearchOrder
	)AS (
	SELECT
		Name, ShortDescription, LongDescription, Specification, FurtherInfo, IsVisible, IsFeatured, IsNew, DisplayInHomepageCarousel, SkuBrandID, Created, LastModified, Deleted, Code, LegislativeText, SearchOrder
	FROM
		dbo.commerce_SkuGroup (NOLOCK)
	WHERE
		Deleted = 0
	)

	MERGE SkuGroups AS T
	USING
	(
	SELECT DISTINCT
		DesignName as Name,
		MAX(DesignDescription) as ShortDescription,
		'<p>'+MAX(DesignDescription) + '</p>' as LongDescription,
		'' as Specification,
		'' as FurtherInfo,
		1 as IsVisible,
		0 as IsFeatured,
		0 as IsNew,
		1 as DisplayInHomepageCarousel,
		NULL as SkuBrandID,
		@CurrentDate as Created,
		@CurrentDate as LastModified,
		0 as Deleted,
		SkuGroupCode as Code,
		'' as LegislativeText,
		UPPER(REPLACE(DesignName, ' ', '')) as SearchOrder,
		0 as WasDeletedBefore
	FROM
	#tmp2 t (NOLOCK)
	GROUP BY DesignName,SkuGroupCode
	) AS S
	ON
	(
		T.Code = S.Code
	)
	WHEN NOT MATCHED BY TARGET
		THEN INSERT (Name, ShortDescription, LongDescription, Specification, FurtherInfo, IsVisible, IsFeatured, IsNew, DisplayInHomepageCarousel, SkuBrandID, Created, LastModified, Deleted, Code, LegislativeText, SearchOrder)
		VALUES
		(
			S.Name, S.ShortDescription, S.LongDescription, S.Specification, S.FurtherInfo, S.IsVisible, S.IsFeatured, S.IsNew, S.DisplayInHomepageCarousel, S.SkuBrandID, S.Created, S.LastModified, S.Deleted, S.Code, S.LegislativeText, S.SearchOrder
		)
	--WHEN MATCHED AND T.Deleted = 0 AND (S.Name != T.Name OR S.ShortDescription != T.ShortDescription OR S.LongDescription != T.LongDescription OR S.SearchOrder != T.SearchOrder) THEN
	--	UPDATE
	--	SET
	--		Name = S.Name,
	--		ShortDescription = S.ShortDescription,
	--		LongDescription = S.LongDescription,
	--		LastModified = S.LastModified,
	--		SearchOrder = S.SearchOrder
	--WHEN NOT MATCHED BY SOURCE AND T.Deleted = 0 THEN
	--	UPDATE
	--	SET
	--		Deleted = 1
	OUTPUT $action, inserted.*, deleted.*;

	-- Colourways
	RAISERROR ('Importing Colourways (SKU)', 0, 0) WITH NOWAIT

	;WITH Skus (
	Name, Code, IsVisible, [Weight], IsOversized, TangibleItem, StockLevel, AllowStockNotification,
	IsSearchable, ShortDescription, LongDescription, Specification, FurtherInfo, MaxPerOrder, IsFeatured,
	IsNew, DisplayInHomepageCarousel, SkuBrandID, Created, LastModified, Deleted, SkuGroupID,
	LegislativeText, AllowPreOrder, ClubMembershipOptionID, SearchOrder, Width, Height, Depth, [Order],
	StockedAsCode, SoldAsCode, PublishStartDate, ReadyForWeb, IsB2C, IsB2B, OutOfStock, DefaultOrderLocation,
	IsOptionProduct, StockedByThirdParty,
	EanCode, SupplierProductCode, UnitOfMeasurement, ThirdPartyUrl												--added 13/07/2016 By Ozz
	) AS (
		SELECT
			Name, Code, IsVisible, [Weight], IsOversized, TangibleItem, StockLevel, AllowStockNotification,
			IsSearchable, ShortDescription, LongDescription, Specification, FurtherInfo, MaxPerOrder,
			IsFeatured, IsNew, DisplayInHomepageCarousel, SkuBrandID, Created, LastModified, Deleted,
			SkuGroupID, LegislativeText, AllowPreOrder, ClubMembershipOptionID, SearchOrder, Width, Height,
			Depth, [Order], StockedAsCode, SoldAsCode, PublishStartDate, ReadyForWeb, IsB2C, IsB2B, OutOfStock,
			DefaultOrderLocation, IsOptionProduct, StockedByThirdParty,
			EanCode, SupplierProductCode, UnitOfMeasurement, ThirdPartyUrl										--added 13/07/2016 By Ozz
		FROM
			dbo.commerce_Sku (NOLOCK)
		WHERE
			Deleted = 0
	)

	MERGE Skus AS T
	USING
	(
	SELECT
		MIN([Description]) as Name,
		ProductCode as Code,
		1 as IsVisible,
		cast([Weight] as float) as [Weight],
		0 as IsOversized,
		1 as TangibleItem,
		0 as StockLevel,
		0 as AllowStockNotification,
		1 as IsSearchable,
		MIN(DesignDescription) as ShortDescription,
		'<p>'+MIN(DesignDescription)+'</p>' as LongDescription,
		NULL as Specification,
		NULL as FurtherInfo,
		NULL as MaxPerOrder,
		0 as IsFeatured,
		0 as IsNew,
		1 as DisplayInHomepageCarousel,
		NULL as SkuBrandID,
		@CurrentDate as Created,
		@CurrentDate as LastModified,
		0 as Deleted,
		(SELECT TOP 1 SkuGroupID FROM dbo.commerce_SkuGroup (NOLOCK) WHERE Deleted = 0 AND Code = MIN(SkuGroupCode)) as SkuGroupID,
		NULL as LegislativeText,
		CASE MIN(AllowReserve) WHEN 'Y' THEN 1 ELSE 0 END as AllowPreOrder,
		NULL as ClubMembershipOptionID,
		MIN(SortName) as SearchOrder,
		MIN(Width) as Width,
		NULL as Height,
		NULL as Depth,
		9999 as [Order],
		0 as WasDeletedBefore,
		ISNULL(MIN(StockCode), '') as StockedAsCode,
		ISNULL((SELECT TOP 1 ProductCode FROM #tmp2 (NOLOCK) WHERE StockCode = t.ProductCode), '') as SoldAsCode,
		MIN(PublishStartDate) as PublishStartDate,
		MIN(ReadyForWeb) as ReadyForWeb,
		MIN(IsB2C + 0) as IsB2C,
		MIN(IsB2B + 0) as IsB2B,
		MIN(OutOfStock + 0) as OutOfStock,
		MIN(DefaultOrderLocation) as DefaultOrderLocation,
		MIN(IsOptionProduct) as IsOptionProduct,
		CASE WHEN StockedByThirdParty IS NOT NULL THEN 1 ELSE 0 END AS StockedByThirdParty,
		MIN(SpecEanCode) as EanCode,															--added 13/07/2016 By Ozz
		MIN(SpecSupplierProductCode) as SupplierProductCode,									--added 13/07/2016 By Ozz
		MIN(SpecUnitOfMeasurement) as UnitOfMeasurement,										--added 13/07/2016 By Ozz
		MIN(ThirdPartyUrl) as ThirdPartyUrl
	FROM
	#tmp2 t (NOLOCK)
	GROUP BY ProductCode, [Weight], StockedByThirdParty
	) AS S
	ON
	(
		T.Code = S.Code
	)
	WHEN NOT MATCHED BY TARGET
		THEN INSERT (Name, Code, IsVisible, [Weight], IsOversized, TangibleItem, StockLevel,
		AllowStockNotification, IsSearchable, ShortDescription, LongDescription, Specification,
		FurtherInfo, MaxPerOrder, IsFeatured, IsNew, DisplayInHomepageCarousel, SkuBrandID, Created,
		LastModified, Deleted, SkuGroupID, LegislativeText, AllowPreOrder, ClubMembershipOptionID,
		SearchOrder, Width, Height, Depth, StockedAsCode, SoldAsCode, PublishStartDate, ReadyForWeb,
		IsB2C, IsB2B, OutOfStock, DefaultOrderLocation, IsOptionProduct, StockedByThirdParty,
		EanCode, SupplierProductCode, UnitOfMeasurement, ThirdPartyUrl							--added 13/07/2016 By Ozz
		)
		VALUES
		(
			S.Name, S.Code, S.IsVisible, S.[Weight], S.IsOversized, S.TangibleItem, S.StockLevel,
			S.AllowStockNotification, S.IsSearchable, S.ShortDescription, S.LongDescription,
			S.Specification, S.FurtherInfo, S.MaxPerOrder, S.IsFeatured, S.IsNew, S.DisplayInHomepageCarousel,
			S.SkuBrandID, S.Created, S.LastModified, S.Deleted, S.SkuGroupID, S.LegislativeText,
			S.AllowPreOrder, S.ClubMembershipOptionID, S.SearchOrder, S.Width, S.Height, S.Depth,
			ISNULL(S.StockedAsCode, ''), ISNULL(S.SoldAsCode, ''), S.PublishStartDate, S.ReadyForWeb,
			S.IsB2C, S.IsB2B, S.OutOfStock, S.DefaultOrderLocation, S.IsOptionProduct, S.StockedByThirdParty,
			s.EanCode, SupplierProductCode, s.UnitOfMeasurement, s.ThirdPartyUrl				 --added 13/07/2016 By Ozz
		)
	WHEN MATCHED AND T.Deleted = 0 AND (S.Name != T.Name OR S.ShortDescription != T.ShortDescription OR
	S.LongDescription != T.LongDescription OR S.SkuGroupID != T.SkuGroupID OR S.SearchOrder != T.SearchOrder OR
	S.Width != T.Width OR S.StockedAsCode != T.StockedAsCode OR S.SoldAsCode != T.SoldAsCode OR
	(T.PublishStartDate IS NULL OR S.PublishStartDate != T.PublishStartDate) OR (T.ReadyForWeb IS NULL OR
	T.ReadyForWeb != S.ReadyForWeb) OR T.OutOfStock != S.OutOfStock OR T.IsB2B != S.IsB2B OR T.IsB2C != S.IsB2C OR
	T.DefaultOrderLocation != S.DefaultOrderLocation OR T.IsOptionProduct != S.IsOptionProduct OR T.[Weight] != S.[Weight] OR
	T.[StockedByThirdParty] != S.[StockedByThirdParty]
		OR S.EanCode != T.EanCode 
		OR S.SupplierProductCode != T.SupplierProductCode 
		OR S.UnitOfMeasurement != T.UnitOfMeasurement 
		OR ISNULL(S.ThirdPartyUrl,'') != ISNULL(T.ThirdPartyUrl, '')							--added 13/07/2016 By Ozz
	) THEN
		UPDATE
		SET
			Name = S.Name,
			Code = S.Code,
			ShortDescription = S.ShortDescription,
			LongDescription = S.LongDescription,
			LastModified = S.LastModified,
			SkuGroupID = S.SkuGroupID,
			SearchOrder = S.SearchOrder,
			Width = S.Width,
			StockedAsCode = ISNULL(S.StockedAsCode, ''),
			SoldAsCode = ISNULL(S.SoldAsCode, ''),
			PublishStartDate = S.PublishStartDate,
			ReadyForWeb = S.ReadyForWeb,
			IsB2C = S.IsB2C,
			IsB2B = S.IsB2B,
			OutOfStock = S.OutOfStock,
			DefaultOrderLocation = S.DefaultOrderLocation,
			IsOptionProduct = S.IsOptionProduct,
			[Weight] = cast(S.[Weight] as float),
			[StockedByThirdParty] = S.StockedByThirdParty,
			EanCode = S.EanCode,																	--added 11/07/2016 By Ozz
			SupplierProductCode = S.SupplierProductCode,											--added 11/07/2016 By Ozz
			UnitOfMeasurement = S.UnitOfMeasurement,												--added 13/07/2016 By Ozz
			ThirdPartyUrl = S.ThirdPartyUrl

	OUTPUT $action, inserted.*, deleted.*;

	RAISERROR ('Imported Colourways (SKU)', 0, 0) WITH NOWAIT


	-- Update SKU order within Design
	RAISERROR ('Updating Order of SKUs within a Design', 0, 0) WITH NOWAIT

	UPDATE s
	SET [Order] = p.DesignDetailsSort
	FROM
		dbo.commerce_Sku s (NOLOCK)
		INNER JOIN dbo.ProductImportTemp17 p (NOLOCK)
		ON p.ProductCode = s.Code
	WHERE
		s.Deleted = 0
		AND
		p.DesignDetailsSort IS NOT NULL

	-- Products
	RAISERROR ('Importing Products', 0, 0) WITH NOWAIT

	;WITH Products (
		ProductCategoryID, SkuID, SkuGroupID, SkuBundleID, Name, ShortDescription, LongDescription, IsVisible, IsDefault, [Order], GroupStyle, URI, Created, LastModified, Deleted, Specification, FurtherInfo, InheritImages, MaxPerOrder, SearchOrder
	) AS (
		SELECT
			ProductCategoryID, SkuID, SkuGroupID, SkuBundleID, Name, ShortDescription, LongDescription, IsVisible, IsDefault, [Order], GroupStyle, URI, Created, LastModified, Deleted, Specification, FurtherInfo, InheritImages, MaxPerOrder, SearchOrder
		FROM
			dbo.commerce_Product (NOLOCK)
		WHERE
			Deleted = 0
	)

	MERGE Products AS T
	USING
	(
	SELECT
		(SELECT TOP 1 ProductCategoryID FROM dbo.commerce_ProductCategory pc (NOLOCK) WHERE pc.Deleted = 0 AND pc.ShopID = t.ShopID AND pc.Code = t.CollectionCode ORDER BY IsVisible DESC, DisplayInListing DESC, ProductCategoryID ASC) as ProductCategoryID,
		NULL as SkuID,
		(SELECT TOP 1 SkuGroupID FROM dbo.commerce_SkuGroup sg (NOLOCK) WHERE Deleted = 0 AND Code = SkuGroupCode) as SkuGroupID,
		NULL as SkuBundleID,
		MAX(DesignName) as Name,
		MAX(DesignDescription) as ShortDescription,
		'<p>'+MAX(DesignDescription)+'</p>' as LongDescription,
		1 as IsVisible,
		1 as IsDefault,
		1 as [Order],
		NULL as GroupStyle,
		MIN(URI) as URI,
		@CurrentDate as Created,
		@CurrentDate as LastModified,
		0 as Deleted,
		NULL as Specification,
		NULL as FurtherInfo,
		1 as InheritImages,
		NULL as MaxPerOrder,
		'' as SearchOrder,
		0 as WasDeletedBefore
	FROM
	#tmp2 t (NOLOCK)
	WHERE
	   EXISTS (SELECT TOP 1 ProductCategoryID FROM dbo.commerce_ProductCategory pc (NOLOCK) WHERE pc.Deleted = 0 AND pc.ShopID = t.ShopID AND pc.Code = t.CollectionCode ORDER BY IsVisible DESC, DisplayInListing DESC, ProductCategoryID ASC)
	   AND
	   EXISTS (SELECT TOP 1 SkuGroupID FROM dbo.commerce_SkuGroup sg (NOLOCK) WHERE Deleted = 0 AND Code = SkuGroupCode)
	GROUP BY CollectionCode, SkuGroupCode, ShopID
	) AS S
	ON
	(
		T.ProductCategoryID = S.ProductCategoryID
		AND
		T.SkuGroupID = S.SkuGroupID
	)
	WHEN NOT MATCHED BY TARGET
		THEN INSERT (ProductCategoryID, SkuID, SkuGroupID, SkuBundleID, Name, ShortDescription, LongDescription, IsVisible, IsDefault, [Order], GroupStyle, URI, Created, LastModified, Deleted, Specification, FurtherInfo, InheritImages, MaxPerOrder, SearchOrder)
		VALUES
		(
			S.ProductCategoryID, S.SkuID, S.SkuGroupID, S.SkuBundleID, S.Name, S.ShortDescription, S.LongDescription, S.IsVisible, S.IsDefault, S.[Order], S.GroupStyle, S.URI, S.Created, S.LastModified, S.Deleted, S.Specification, S.FurtherInfo, S.InheritImages, S.MaxPerOrder, S.SearchOrder
		)
	WHEN MATCHED AND T.Deleted = 0 AND (S.Name != T.Name OR S.ShortDescription != T.ShortDescription OR S.LongDescription != T.LongDescription OR S.IsVisible != T.IsVisible OR S.URI != T.URI) THEN
		UPDATE
		SET
			Name = S.Name,
			-- Description updates are now occuring in Colony not in Mertex
			--	ShortDescription = S.ShortDescription,
			--	LongDescription = S.LongDescription,
			IsVisible = S.IsVisible,
			URI = S.URI,
			LastModified = S.LastModified
	OUTPUT $action, inserted.*, deleted.*;


	-- Complementary Products
	RAISERROR ('Importing Related Products', 0, 0) WITH NOWAIT


	TRUNCATE TABLE dbo.commerce_Sku_RelatedSku;
	TRUNCATE TABLE dbo.commerce_Product_RelatedProduct;

	INSERT INTO dbo.commerce_Sku_RelatedSku
	SELECT
		sku.SkuID as SkuID,
		relatedsku.SkuID as RelatedSkuID,
		1 as [Type],
	     MIN(t.[Order])
	FROM
		(
			SELECT DISTINCT
				p.ProductCode,
				s.OutParam as RelatedProductCode,
				ROW_NUMBER() OVER (PARTITION BY p.ProductCode ORDER BY (SELECT 0)) as [Order]
			FROM
				dbo.ProductImportTemp17 p (NOLOCK)
				CROSS APPLY(SELECT * FROM dbo.SplitString(p.ComplementaryProducts,'|')) s
			WHERE
				p.ComplementaryProducts IS NOT NULL
		) t
		INNER JOIN dbo.commerce_Sku sku (NOLOCK) ON t.ProductCode = sku.Code AND sku.Deleted = 0
		INNER JOIN dbo.commerce_Sku relatedsku (NOLOCK) ON t.RelatedProductCode = relatedsku.Code AND relatedsku.Deleted = 0
    GROUP BY
	   sku.SkuID,
	   relatedsku.SkuID;


	INSERT INTO dbo.commerce_Product_RelatedProduct
	SELECT
		product.ProductID as ProductID,
		relatedproduct.ProductID as RelatedProductID
	FROM
		dbo.commerce_Product product (NOLOCK)
		INNER JOIN dbo.commerce_Sku sku (NOLOCK)
		ON sku.Deleted = 0
		AND sku.SkuGroupID = product.SkuGroupID
		AND product.Deleted = 0
		INNER JOIN dbo.commerce_Sku_RelatedSku r (NOLOCK)
		ON sku.SkuID = r.SkuID
		AND r.Type = 1
		INNER JOIN dbo.commerce_Sku relatedsku (NOLOCK)
		ON relatedsku.Deleted = 0
		AND relatedsku.SkuID = r.RelatedSkuID
		INNER JOIN dbo.commerce_Product relatedproduct (NOLOCK)
		ON relatedproduct.SkuGroupID = relatedsku.SkuGroupID
		AND relatedproduct.Deleted = 0
	GROUP BY
		product.ProductID,
		relatedproduct.ProductID

	-- Prices
	RAISERROR ('Importing Prices', 0, 0) WITH NOWAIT

	DECLARE @GBPCurrenyID BIGINT = (SELECT CurrencyId FROM commerce_Currency WHERE Code = 'GBP')
	DECLARE @EURCurrenyID BIGINT = (SELECT CurrencyId FROM commerce_Currency WHERE Code = 'EUR')
	DECLARE @USDCurrenyID BIGINT = (SELECT CurrencyId FROM commerce_Currency WHERE Code = 'USD')

	DECLARE @Prices TABLE
	(
		ProductCode NVARCHAR(255),
		CurrencyId BIGINT,
		Price money
	)

	IF (@GBPCurrenyID IS NOT NULL)
	BEGIN
		INSERT INTO @Prices
		SELECT ProductCode, @GBPCurrenyID, (CASE ISNUMERIC(REPLACE(GBPPrice, ',','')) WHEN 1 THEN CONVERT(MONEY, REPLACE(GBPPrice, ',','')) ELSE 0 END) AS Price
		FROM ProductImportTemp17
	END

	IF (@EURCurrenyID IS NOT NULL)
	BEGIN
		INSERT INTO @Prices
		SELECT ProductCode, @EURCurrenyID, (CASE ISNUMERIC(REPLACE(EURPrice, ',','')) WHEN 1 THEN CONVERT(MONEY, REPLACE(EURPrice, ',','')) ELSE 0 END) AS Price
		FROM ProductImportTemp17
	END

	IF (@USDCurrenyID IS NOT NULL)
	BEGIN
		INSERT INTO @Prices
		SELECT ProductCode, @USDCurrenyID, (CASE ISNUMERIC(REPLACE(USDPrice, ',','')) WHEN 1 THEN CONVERT(MONEY, REPLACE(USDPrice, ',','')) ELSE 0 END) AS Price
		FROM ProductImportTemp17
	END

	TRUNCATE TABLE dbo.commerce_SkuPrice;

	--ALTER INDEX ALL ON dbo.commerce_SkuPrice DISABLE

	INSERT INTO dbo.commerce_SkuPrice
	SELECT
		prices.CurrencyId,
		sku.SkuID,
		prices.Price / 1.2,
		prices.Price,
		@CurrentDate,
		@CurrentDate,
		0,
		null
	FROM
		dbo.commerce_Sku sku (NOLOCK)
	INNER JOIN @Prices prices ON
		(sku.Code = prices.ProductCode)
	WHERE
		Deleted = 0;

	-- Colours
	RAISERROR ('Importing Colours', 0, 0) WITH NOWAIT

	TRUNCATE TABLE dbo.commerce_SkuColour;

	INSERT INTO dbo.commerce_SkuColour
	SELECT DISTINCT
		sku.SkuID,
		t.Colour,
		0,
		0.00,
		'',
		''
	FROM
	(
	SELECT p.ProductCode,s.OutParam as Colour FROM dbo.ProductImportTemp17 p (NOLOCK)
	CROSS APPLY(SELECT * FROM dbo.SplitString(p.ColourCodes,'|')) s
	WHERE
	p.ColourCodes IS NOT NULL
	) t INNER JOIN dbo.commerce_Sku sku (NOLOCK)
	ON t.ProductCode = sku.Code AND sku.Deleted = 0;

	RAISERROR ('Importing Sku Attributes and Options', 0, 0) WITH NOWAIT
	TRUNCATE TABLE dbo.commerce_SkuAttributeOption_Sku;
	TRUNCATE TABLE dbo.commerce_Sku_SkuAttribute;

	/*
		SET ITEMTYPE ATTRIBUTES
	*/

	INSERT INTO dbo.commerce_SkuAttributeOption_Sku
	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 83 AND
		SkuAttributeOption.Code = t.ItemType
	WHERE ItemType IS NOT NULL AND ProductGroup IS NOT NULL
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID

	/* SET WALLPAPERTYPE ATTRIBUTES	*/
	RAISERROR ('SET WALLPAPERTYPE ATTRIBUTES', 0, 0) WITH NOWAIT
	INSERT INTO dbo.commerce_SkuAttributeOption_Sku
	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 91 AND
		SkuAttributeOption.Name = t.ProductType
	WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	AND ProductType IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID

	/* SET Fabric TYPE ATTRIBUTES */
	RAISERROR ('SET FABRIC TYPE ATTRIBUTES', 0, 0) WITH NOWAIT
	INSERT INTO dbo.commerce_SkuAttributeOption_Sku
	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 95 AND
		SkuAttributeOption.Name = t.ProductType
	WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	AND ProductType IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID

	/* SET TRIMMING TYPE ATTRIBUTES */
	RAISERROR ('SET Trimming TYPE ATTRIBUTES', 0, 0) WITH NOWAIT
	INSERT INTO dbo.commerce_SkuAttributeOption_Sku
	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 93 AND
		SkuAttributeOption.Name = t.ProductType
	WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	AND ProductType IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID


	/* SET CONTRACT USAGE */
	RAISERROR ('SET Contract Usage', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_SkuAttributeOption_Sku
	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		(SELECT a.ProductCode, s.OutParam  as ContractUsage FROM
		#tmp2 a (NOLOCK)
		CROSS APPLY(SELECT * FROM dbo.SplitString(a.ContractUsageFilter,'|')) s
		WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
		) t
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 97 AND
		SkuAttributeOption.Name = t.ContractUsage
	--WHERE --SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
	and Sku.Deleted = 0
	AND SkuID IS NOT NULL
	and ContractUsage != ''
	GROUP BY
		SkuID, SkuAttributeOptionID


	/* SET BRAND ATTRIBUTES */
	RAISERROR ('SET Brand attributes', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_SkuAttributeOption_Sku
	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 36 AND
		SkuAttributeOption.Name = t.SalesDivision
	WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID

	/* SET PRODUCT TYPE */

	--UNION ALL
	INSERT INTO dbo.commerce_SkuAttributeOption_Sku
	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 34 AND
		SkuAttributeOption.Code = t.ProductType
	WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	AND ProductType IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID


	/* SET OVERALL LIGHTNESS COLOUR */

	--INSERT INTO commerce_Sku_SkuAttribute
	--UNION ALL
	RAISERROR ('SET lightness colour', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_SkuAttributeOption_Sku
	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 77 AND
		SkuAttributeOption.Name = t.OverallLightnessColour
	WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	AND OverallLightnessColour IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID

	--UNION ALL

	/* SET PRODUCT GROUP */

	RAISERROR ('SET Product Group', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_SkuAttributeOption_Sku
	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		INNER JOIN commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 49 AND
		SkuAttributeOption.Name = t.ProductGroup
	WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID

	--UNION ALL
	/* ------------------------------------------------------------------------------------ */
	/* -------------                 New FR Attributes                        ------------- */
	/* ------------------------------------------------------------------------------------ */

	/* SET FR Treatable */
	RAISERROR ('SET FR Treatable', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_SkuAttributeOption_Sku
	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		(SELECT a.ProductCode, s.OutParam as FRTreatable FROM
		#tmp2 a (NOLOCK)
		CROSS APPLY(SELECT * FROM dbo.SplitString(a.FRTreatable,'|')) s
		WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
		) t
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 89 AND
		SkuAttributeOption.Name = t.FRTreatable
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	AND FRTreatable IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID

	UNION ALL

	/*
		SET FR Inherent
	*/
	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		(SELECT a.ProductCode, s.OutParam as FRInherent FROM
		#tmp2 a (NOLOCK)
		CROSS APPLY(SELECT * FROM dbo.SplitString(a.FRInherent,'|')) s
		WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
		) t
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 85 AND
		SkuAttributeOption.Name = t.FRInherent
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	AND FRInherent IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID
	UNION ALL

	/*
		SET FR Treated
	*/
SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		(SELECT a.ProductCode, s.OutParam as FRTreated FROM
		#tmp2 a (NOLOCK)
		CROSS APPLY(SELECT * FROM dbo.SplitString(a.FRTreated,'|')) s
		WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
		) t
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 87 AND
		SkuAttributeOption.Name = t.FRTreated
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	AND FRTreated IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID
	--UNION ALL

	/* ------------------------------------------------------------------------------------ */

	/* SET DESIGN STYLE */

	RAISERROR ('SET Design Style', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_SkuAttributeOption_Sku
	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		(SELECT a.ProductCode, s.OutParam as DesignStyle FROM
		#tmp2 a (NOLOCK)
		CROSS APPLY(SELECT * FROM dbo.SplitString(a.DesignStyle,'|')) s
		WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
		) t
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 32 AND
		SkuAttributeOption.Name = t.DesignStyle
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	AND DesignStyle IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID

    /* SAMPLE TYPE */
	UNION ALL

	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		(SELECT a.ProductCode, REPLACE(s.OutParam, a.ProductCode + '/','') as SampleProductCodes FROM
		#tmp2 a (NOLOCK)
		CROSS APPLY(SELECT * FROM dbo.SplitString(a.SampleProductCodes,'|')) s
		WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
		) t
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 81 AND
		SkuAttributeOption.Code = t.SampleProductCodes
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	AND SampleProductCodes IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID

	UNION ALL

	/*
		SET BLACKOUT
	*/
	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 57 AND
		SkuAttributeOption.Name = t.Blackout
	WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	AND Blackout IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID

	UNION ALL


	/*
		SET COMPOSITION (For Filter)
	*/

	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 39 AND
		SkuAttributeOption.Name = t.Composition
	WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	AND Composition IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID

	UNION ALL


	/*
		SET COMPOSITION DESCRIPTION FROM Lookup
	*/

	SELECT DISTINCT
		SkuAttributeOption.SkuAttributeOptionID,
		sku.SkuId
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		INNER JOIN dbo.commerce_SkuAttributeOption SkuAttributeOption (NOLOCK)
		ON SkuAttributeOption.SkuAttributeID = 79 AND
		SkuAttributeOption.Code = t.CompositionDescription
	WHERE SalesDivision IS NOT NULL AND ProductGroup IS NOT NULL
	AND Sku.Deleted = 0
	AND SkuID IS NOT NULL
	AND Composition IS NOT NULL
	GROUP BY
		SkuID, SkuAttributeOptionID

    DECLARE @t table (ProductCode varchar(50), Usage varchar(5))

    INSERT INTO @t
    SELECT DISTINCT
	   ProductCode, UsageImageCodes
    FROM
	   ProductImportTemp17 (NOLOCK)
    WHERE
	   UsageImageCodes IS NOT NULL

    ;with cte as
    (
	select ProductCode,
			  substring(Usage, 1, 1) as Chars,
			  stuff(Usage, 1, 1, '') as Usage,
			  1 as RowID
	from @t
	union all
	select ProductCode,
			  substring(Usage, 1, 1) as Chars,
			  stuff(Usage, 1, 1, '') as Usage,
			  RowID + 1 as RowID
	from cte
	where len(Usage) > 0
   )
   INSERT INTO dbo.commerce_SkuAttributeOption_Sku (SkuAttributeOptionID, SkuID)
   select u.SkuAttributeOptionID, s.SkuID
   from cte t
   INNER JOIN dbo.commerce_SkuAttributeOption u
   ON u.Code = t.Chars
   INNER JOIN dbo.commerce_Sku s
   ON s.Code = t.ProductCode
   WHERE
   s.Deleted = 0
   AND
   u.Deleted = 0

	/* SET PATTERN MATCH */

	RAISERROR ('Pattern match attributes', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		44,
		NULL,
		PatternMatch
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
	GROUP BY
		SkuID, PatternMatch

	/* SET PATTERN MATCH DESCRIPTION */

	RAISERROR ('Pattern match description', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		45,
		NULL,
		PatternMatchDescription
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
	GROUP BY
		SkuID, PatternMatchDescription

	/* SET MARTINDALE */

	RAISERROR ('Martindale attributes', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		37,
		NULL,
		REPLACE(REPLACE(REPLACE(RubTestResults,'+',''),',',''),'.','')
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND RubTestResults IS NOT NULL
		AND RubTestResults NOT LIKE '%[a-z]%'
	GROUP BY
		SkuID, RubTestResults


	/* SET DESIGN CODE */

	RAISERROR ('Design code', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		61,
		NULL,
		DesignCode
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND DesignCode IS NOT NULL
	GROUP BY
		SkuID, DesignCode


	/* SET DESCRIPTIVE COLOUR */

	RAISERROR ('Descriptive colour', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		46,
		NULL,
		DescriptiveColour
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND DescriptiveColour IS NOT NULL
	GROUP BY
		SkuID, DescriptiveColour


	/* SET MERTEX ACCOUNT */

	RAISERROR ('Mertex account', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		60,
		NULL,
		MertexAccount
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND MertexAccount IS NOT NULL
	GROUP BY
		SkuID, MertexAccount

	/* SET ContractUsage */

	RAISERROR ('Contract Usage Attribute', 0, 0) WITH NOWAIT

	INSERT INTO commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		97,
		NULL,
		ContractUsage
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND DesignCode IS NOT NULL
	GROUP BY
		SkuID, ContractUsage


	/* SET FR WALLPAPER */

	RAISERROR ('FR Wallpaper', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		73,
		NULL,
		FrWallpaper
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND FrWallpaper IS NOT NULL
	GROUP BY
		SkuID, FrWallpaper


	/* SET OTHER INFO */

	RAISERROR ('Other info', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		75,
		NULL,
		OtherInfo
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND OtherInfo IS NOT NULL
	GROUP BY
		SkuID, OtherInfo

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		54,
		NULL,
		FrContract
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND FrContract IS NOT NULL
	GROUP BY
		SkuID, FrContract


	/* SET FR Drapes */

	RAISERROR ('FR Drapes', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		69,
		NULL,
		FrDrapes
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND FrDrapes IS NOT NULL
	GROUP BY
		SkuID, FrDrapes

	/* SET FR Domestic	*/

	RAISERROR ('FR Domestic', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		55,
		NULL,
		FrDomestic
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND FrDomestic IS NOT NULL
	GROUP BY
		SkuID, FrDomestic


	/* SET CONTRACT */

	RAISERROR ('Contract attribute', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		56,
		NULL,
		[Contract]
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND [Contract] IS NOT NULL
	GROUP BY
		SkuID, [Contract]


	/* SET COMING SOON UK */

	RAISERROR ('Comming soon UK', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		58,
		NULL,
		ComingSoonUK
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND ComingSoonUK IS NOT NULL
	GROUP BY
		SkuID, ComingSoonUK


	/* SET COMING SOON US */

	RAISERROR ('Comming soon US', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		59,
		NULL,
		ComingSoonUS
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND ComingSoonUS IS NOT NULL
	GROUP BY
		SkuID, ComingSoonUS


	/* SET AFTER CARE CODES IMAGE */

	RAISERROR ('Aftercare code image', 0, 0) WITH NOWAIT

	/* Ozz 12/12/2016 - Added code to purge old attributes for care codes */
	Delete FROM commerce_Sku_SkuAttribute WHERE SkuAttributeID = 67

	INSERT INTO dbo.commerce_Sku_SkuAttribute  ([SkuID], [SkuAttributeID], [BooleanValue], [TextValue])
	SELECT DISTINCT
		sku.SkuId,
		67,
		NULL,
		AfterCare + '.png'
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND AfterCare IS NOT NULL
	GROUP BY
		SkuID, AfterCare


	/* SET SMALL SCALE */

	RAISERROR ('Small scale attribute', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		65,
		NULL,
		SmallScale
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND SmallScale IS NOT NULL
	GROUP BY
		SkuID, SmallScale


	/* SET SAMPLEABLE FLAG */
	RAISERROR ('Samplable attribute', 0, 0) WITH NOWAIT

	/*Fix to remove existing sample code attribates for tie backs etc */
	Delete FROM commerce_Sku_SkuAttribute WHERE SkuAttributeID = 71 AND TextValue = '1'

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		71,
		NULL,
		'1'
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND (SampleProductCodes LIKE '%/C%' OR SampleProductCodes LIKE '%/UC%')			--Updated 21/11/2016 by Ozz to fix issue with sample code with new price field not being zero
		--AND [Sample] IS NOT NULL
	GROUP BY
		SkuID, [Sample]


	/* SET VERTICAL PATTERN REPEAT */

	RAISERROR ('Vertical patter repeat attribute', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		42,
		NULL,
		[VerticalPatternRepeat]
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND [VerticalPatternRepeat] IS NOT NULL
	GROUP BY
		SkuID, [VerticalPatternRepeat]


	/* SET HORIZONTAL PATTERN REPEAT */

	RAISERROR ('Horizontal pattern repeat attribute', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		41,
		NULL,
		[HorizontalPatternRepeat]
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND [HorizontalPatternRepeat] IS NOT NULL
	GROUP BY
		SkuID, [HorizontalPatternRepeat]


	/* SET FRInherent */

	RAISERROR ('FR Inherent attribute', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		85,
		NULL,
		FRInherent
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND FRInherent IS NOT NULL
	GROUP BY
		SkuID, FRInherent


	/* SET FR Treated */
	RAISERROR ('FR Treated Attribute', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		87,
		NULL,
		FRTreated
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND FRTreated IS NOT NULL
	GROUP BY
		SkuID, FRTreated


	/* SET SpecSheetAvePieceSize */

	RAISERROR (' SpecSheetAvePieceSize attribute', 0, 0) WITH NOWAIT

	INSERT INTO commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		99,
		NULL,
		SpecSheetAvePieceSize
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND SpecSheetAvePieceSize IS NOT NULL
	GROUP BY
		SkuID, SpecSheetAvePieceSize

	/* SET SpecSheetFinCodes */
	RAISERROR (' SpecSheetFinCodes attribute', 0, 0) WITH NOWAIT

	INSERT INTO commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		101,
		NULL,
		SpecSheetFinCodes
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND SpecSheetFinCodes IS NOT NULL
	GROUP BY
		SkuID, SpecSheetFinCodes

	/* SET SpecSheetFinCodes */
	RAISERROR (' SpecSheetIntraStat attribute', 0, 0) WITH NOWAIT

	INSERT INTO commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		103,
		NULL,
		SpecSheetIntraStat
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND SpecSheetIntraStat IS NOT NULL
	GROUP BY
		SkuID, SpecSheetIntraStat

	/* SET SpecSheetOrCountry */
	RAISERROR (' SpecSheetOrCountry attribute', 0, 0) WITH NOWAIT

	INSERT INTO commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		105,
		NULL,
		SpecSheetOrCountry
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND SpecSheetOrCountry IS NOT NULL
	GROUP BY
		SkuID, SpecSheetOrCountry

	/* SET SpecSheetOrCountry */

	RAISERROR (' SpecSheetReverse attribute', 0, 0) WITH NOWAIT

	INSERT INTO commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		107,
		NULL,
		SpecSheetReverse
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND SpecSheetReverse IS NOT NULL
	GROUP BY
		SkuID, SpecSheetReverse

	/* SET SpecSheetSQMeter */

	RAISERROR (' SpecSheetSQMeter attribute', 0, 0) WITH NOWAIT

	INSERT INTO commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		109,
		NULL,
		SpecSheetSQMeter
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND SpecSheetSQMeter IS NOT NULL
	GROUP BY
		SkuID, SpecSheetSQMeter

	/* SET SpecSheetThreadPerCm */

	RAISERROR (' SpecSheetThreadPerCm attribute', 0, 0) WITH NOWAIT

	INSERT INTO commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		111,
		NULL,
		SpecSheetThreadPerCm
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND SpecSheetThreadPerCm IS NOT NULL
	GROUP BY
		SkuID, SpecSheetThreadPerCm


	/* SET SpecSheetYarnNo */

	RAISERROR (' SpecSheetYarnNo attribute', 0, 0) WITH NOWAIT

	INSERT INTO commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		113,
		NULL,
		SpecSheetYarnNo
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND SpecSheetYarnNo IS NOT NULL
	GROUP BY
		SkuID, SpecSheetYarnNo


	/* SET FRTreatable */

	RAISERROR ('FR Treatable attribute', 0, 0) WITH NOWAIT

	INSERT INTO dbo.commerce_Sku_SkuAttribute
	SELECT DISTINCT
		sku.SkuId,
		89,
		NULL,
		FRTreatable
	FROM
		dbo.commerce_Sku sku (NOLOCK)
		INNER JOIN
		#tmp2 t (NOLOCK)
		ON t.ProductCode = sku.Code
		AND Sku.Deleted = 0
		AND SkuID IS NOT NULL
		AND FRTreatable IS NOT NULL
	GROUP BY
		SkuID, FRTreatable

	RAISERROR ('Updating Values for Martindale', 0, 0) WITH NOWAIT

	UPDATE dbo.commerce_Sku_SkuAttribute
	SET
		TextValue = null
	WHERE
		TextValue = 'N/A' or TextValue = 'NA'
		AND
		SkuAttributeID = 37

	UPDATE dbo.commerce_Sku_SkuAttribute
	SET
		TextValue = REPLACE(TextValue, ',', '')
	WHERE
		SkuAttributeID = 37


	/* IMPORT DESCRIPTION UPDATES */

	RAISERROR ('Updating Design Descriptions', 0, 0) WITH NOWAIT

	UPDATE s
	SET
	ShortDescription = t.DesignDescription,
	LongDescription = '<p>' + t.DesignDescription + '</p>'
	FROM
		dbo.commerce_Sku s (NOLOCK)
		INNER JOIN dbo.ProductImportTemp17 t (NOLOCK)
		ON t.ProductCode = s.Code AND s.Deleted = 0
	WHERE
		t.DesignDescription != s.ShortDescription


	--Updating Duff Product Assignments
	RAISERROR ('Removing Erroneous Product Assignments', 0, 0) WITH NOWAIT

	UPDATE p
	SET
		Deleted = 1
	FROM
		dbo.commerce_Product p
	WHERE NOT EXISTS (SELECT 1 FROM dbo.commerce_Sku (NOLOCK) WHERE SkuGroupID = p.SkuGroupID AND Deleted = 0)

	RAISERROR ('Updating default product assignments', 0, 0) WITH NOWAIT

	UPDATE p1
	SET
		IsDefault = 1
	FROM
		dbo.commerce_Product p1
		INNER JOIN (
	SELECT
		MIN(ProductID) as DefaultProductID,
		p.SkuGroupID,
		pc.ShopID
	FROM
		dbo.commerce_Product p (NOLOCK)
		INNER JOIN dbo.commerce_ProductCategory pc (NOLOCK)
		ON pc.ProductCategoryID = p.ProductCategoryID
	GROUP BY
		pc.ShopID,p.SkuGroupID
	HAVING SUM(CONVERT(int,IsDefault)) < 1
		) t
		ON t.DefaultProductID = p1.ProductID


	DROP TABLE #tmp
	DROP TABLE #tmp2
	DROP TABLE #attributeOptions

	RAISERROR ('Importing Imagery', 0, 0) WITH NOWAIT

	DECLARE @flatshots TABLE
	(
		SkuID bigint NOT NULL,
		ProductCode varchar(255) NOT NULL,
		ImagePath nvarchar(1000) NOT NULL
	)
	INSERT INTO @flatshots
	SELECT
		SkuID,Code, 'STICKS/' +
		CASE t.SalesDivision
			WHEN 'HAR' THEN 'Harlequin'
			WHEN 'SAN' THEN 'Sanderson'
			WHEN 'ZOF' THEN 'Zoffany'
			WHEN 'MOR' THEN 'Morris'
			WHEN 'SCI' THEN 'Scion'
			WHEN 'STY' THEN 'Style Library'
			WHEN 'ANT' THEN 'Anthology'
			ELSE 'Harlequin'
		END + ' Web/' + Code + '_zoom.jpg' as ImagePath
	FROM
		dbo.commerce_Sku s (NOLOCK)
		INNER JOIN dbo.ProductImportTemp17 t (NOLOCK)
		ON t.ProductCode = s.Code
	WHERE
		Deleted = 0 AND SkuID NOT IN (SELECT DISTINCT SkuID FROM dbo.commerce_Sku_ImageAsset (NOLOCK) WHERE [Order] < 2)

	INSERT INTO dbo.core_ImageAsset
	SELECT MIN(ProductCode), MIN(ProductCode), ImagePath, GETDATE(), 0, NULL, NULL FROM @flatshots
	WHERE
		ImagePath NOT IN (SELECT [Filename] FROM dbo.core_ImageAsset (NOLOCK) WHERE Deleted = 0)
	GROUP BY ImagePath

	INSERT INTO dbo.commerce_Sku_ImageAsset
	SELECT DISTINCT
		t.SkuID,MIN(i.ImageAssetID),1
	FROM
		@flatshots t
		INNER JOIN dbo.core_ImageAsset i (NOLOCK)
		ON i.[Filename] = t.ImagePath
		AND i.Deleted = 0
	WHERE
		NOT EXISTS (SELECT * FROM dbo.commerce_Sku_ImageAsset (NOLOCK) WHERE SkuID = t.SkuID AND [Order] < 2)
	GROUP BY t.SkuID
	ORDER BY t.SkuID,MIN(i.ImageAssetID)

	/* IMPORT LIFESTYLE IMAGERY */

	RAISERROR ('Importing Lifestyle Imagery', 0, 0) WITH NOWAIT

	DECLARE @lifeStyleImages TABLE
	(
		ProductCode varchar(255),
		SkuName nvarchar(512),
		ImagePath nvarchar(max)
	)

	INSERT INTO @lifeStyleImages
	SELECT DISTINCT
		p.ProductCode, p.[Description], '2013_Site/Lifestyle Design Crops/' 
			+ CASE p.SalesDivision 
				WHEN 'HAR' THEN 'Harlequin' 
				WHEN 'SAN' THEN 'Sanderson' 
				WHEN 'ZOF' THEN 'Zoffany' 
				WHEN 'SCI' THEN 'Scion' 
				WHEN 'MOR' THEN 'Morris & Co' 
				WHEN 'ANT' THEN 'Anthology'
			END 
			+ '/' + t.OutParam as ImagePath
	FROM
		dbo.ProductImportTemp17 p (NOLOCK)
		CROSS APPLY(SELECT * FROM dbo.SplitString(p.ImageList,'|')) t
	WHERE p.SalesDivision IS NOT NULL 
		AND p.ImageList IS NOT NULL 
		AND REPLACE(p.ImageList, '|','') != ''

	INSERT INTO dbo.core_ImageAsset
	SELECT MIN(ProductCode), MIN(ProductCode), ImagePath, GETDATE(),0,0,0 FROM @lifeStyleImages
	WHERE ImagePath NOT IN (
		SELECT DISTINCT [Filename] FROM dbo.core_ImageAsset (NOLOCK) WHERE Deleted = 0
	)
	GROUP BY ImagePath
	DELETE FROM dbo.commerce_Sku_ImageAsset WHERE [Order] > 1

	INSERT INTO dbo.commerce_Sku_ImageAsset
	SELECT DISTINCT s.SkuID, MIN(i.ImageAssetID), 1 + ROW_NUMBER() OVER (PARTITION BY ProductCode ORDER BY ImagePath)
	FROM
		@lifeStyleImages t
		INNER JOIN dbo.core_ImageAsset i (NOLOCK)
		ON i.[Filename] = t.ImagePath
		AND i.Deleted = 0
		INNER JOIN dbo.commerce_Sku s (NOLOCK)
		ON s.Code = t.ProductCode
		AND s.Deleted = 0
	WHERE
		NOT EXISTS (SELECT 1 FROM dbo.commerce_Sku_ImageAsset p2 (NOLOCK) INNER JOIN dbo.core_ImageAsset i2 (NOLOCK) ON i2.ImageAssetID = p2.ImageAssetID WHERE p2.SkuID = s.SkuID and i2.[Filename] = ImagePath)
	GROUP BY s.SkuID, ProductCode, ImagePath

	-- Update Parent Sku Ids
	RAISERROR ('Updateing parent sku ids', 0, 0) WITH NOWAIT

	UPDATE sku
		SET ParentSkuId = skuParent.SkuID
	FROM commerce_Sku sku (NOLOCK)
		INNER JOIN ProductImportTemp17 import (NOLOCK) ON (sku.Code = import.ProductCode)
		INNER JOIN commerce_Sku skuParent (NOLOCK) ON (import.ParentProductCode = skuParent.Code)
	WHERE sku.Deleted != 1 
		AND skuParent.Deleted != 1 

	RAISERROR ('Updating SKU Groups B2_ visibility flags', 0, 0) WITH NOWAIT

	--	Update SKU Groups B2_ visibility flags
	;WITH skuGroupsIsB2
	 AS (
		SELECT
			sg.SkuGroupId,
			max(sku.IsB2B + 0) as IsB2B,
			max(sku.IsB2C + 0) as IsB2C
		FROM
			commerce_skuGroup sg
		INNER JOIN
			commerce_sku sku
		ON
			sg.SkuGroupId = sku.SkuGroupId
		GROUP BY
			sg.skugroupid
	)
	UPDATE T
	SET
		T.IsB2B = skuGroupsIsB2.IsB2B,
		T.IsB2C = skuGroupsIsB2.IsB2C
	FROM
		commerce_skuGroup T
	INNER JOIN
		skuGroupsIsB2
	ON
		T.SkuGroupId = skuGroupsIsB2.SkuGroupId

	--	Update Product Catgeory B2_ visibility flags
	RAISERROR ('Updating Product Category B2_ visibility flags', 0, 0) WITH NOWAIT

	;WITH productCategoriesIsB2
	 AS (
		SELECT
			pc.ProductCategoryId,
			min(sg.IsB2B + 0) as IsB2B,
			min(sg.IsB2C + 0) as IsB2C
		FROM
			commerce_ProductCategory pc
		INNER JOIN
			commerce_Product p
		ON
			pc.ProductCategoryId = p.ProductCategoryId
		INNER JOIN
			commerce_skuGroup sg
		ON
			sg.SkuGroupId = p.SkuGroupId
		GROUP BY
			pc.ProductCategoryId
	)
	UPDATE T
	SET
		T.IsB2B = productCategoriesIsB2.IsB2B,
		T.IsB2C = productCategoriesIsB2.IsB2C
	FROM
		commerce_ProductCategory T
	INNER JOIN
		productCategoriesIsB2
	ON
		T.ProductCategoryId = productCategoriesIsB2.ProductCategoryId

	-- Final update of the third party stocked field until a full investigation can take place.
	update commerce_sku
	set StockedByThirdParty=0
	where code in (select productcode from ProductImportTemp17 where StockedByThirdParty is null)

	-- Merge 'Upholstery - General Domestic' and 'Upholstery - Light Domestic' into new attribute
	update commerce_SkuAttributeOption_Sku
	set SkuAttributeOptionID = (select SkuAttributeOptionID from [commerce_SkuAttributeOption] where name = 'Upholstery' and SkuAttributeID = 47)
	where SkuAttributeOptionID in (select SkuAttributeOptionID from [commerce_SkuAttributeOption] where (name = 'Upholstery - General Domestic' or name = 'Upholstery - Light Domestic') and deleted = 0)
	And NOT EXISTS (SELECT 1 FROM commerce_SkuAttributeOption_Sku (NOLOCK) WHERE SkuAttributeOptionID in (select SkuAttributeOptionID from [commerce_SkuAttributeOption] where name = 'Upholstery') AND SkuID =  commerce_SkuAttributeOption_Sku.SkuID)

-- Compendium products
update commerce_Product set deleted = 0 where ProductCategoryID = 23940 and skugroupID in (79276, 79278, 79290, 79304, 79306)

update commerce_Product set deleted = 0 where ProductCategoryID = 23910 and skugroupID in (79276, 79278, 79278, 79304, 79306)


	SET TRANSACTION ISOLATION LEVEL READ COMMITTED

END