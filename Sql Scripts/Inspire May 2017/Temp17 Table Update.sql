/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT

BEGIN TRANSACTION
GO

ALTER TABLE dbo.ProductImportTemp17
	DROP CONSTRAINT DF_ProductImportTemp17_ImportDate
GO

CREATE TABLE dbo.Tmp_ProductImportTemp17
	(
	Price nvarchar(255) NULL,
	Sample nvarchar(255) NULL,
	PattBooks nvarchar(255) NULL,
	PieceOnlyOrders nvarchar(255) NULL,
	AllowReserve nvarchar(255) NULL,
	StatusImage nvarchar(255) NULL,
	ProductCode nvarchar(255) NOT NULL,
	Description nvarchar(MAX) NULL,
	AfterCare nvarchar(255) NULL,
	Usage nvarchar(255) NULL,
	Finish nvarchar(255) NULL,
	ImageName nvarchar(255) NULL,
	PatternMatch nvarchar(255) NULL,
	PatternMatchDescription nvarchar(255) NULL,
	RubTestResults nvarchar(255) NULL,
	Width nvarchar(255) NULL,
	DesignCode nvarchar(255) NULL,
	DesignName nvarchar(255) NULL,
	CollectionName nvarchar(255) NULL,
	DescriptiveColour nvarchar(255) NULL,
	ProductGroup nvarchar(255) NULL,
	ProductType nvarchar(255) NULL,
	DesignType nvarchar(255) NULL,
	DesignStyle nvarchar(255) NULL,
	SalesDivision nvarchar(255) NULL,
	TechComposition nvarchar(255) NULL,
	Composition varchar(MAX) NULL,
	SmallScale nvarchar(255) NULL,
	UsageCode nvarchar(255) NULL,
	UsageImageCodes nvarchar(255) NULL,
	RRP nvarchar(255) NULL,
	FrDomestic nvarchar(255) NULL,
	FrContract nvarchar(255) NULL,
	FrDrapes nvarchar(255) NULL,
	Contract nvarchar(255) NULL,
	Blackout nvarchar(255) NULL,
	DesignDetailsSort nvarchar(255) NULL,
	CollectionSort nvarchar(255) NULL,
	NewCollection nvarchar(255) NULL,
	ImageList nvarchar(MAX) NULL,
	OnDetailPage nvarchar(255) NULL,
	ImageType nvarchar(255) NULL,
	PercentageColour nvarchar(255) NULL,
	OverallLightnessColour nvarchar(255) NULL,
	DesignDescription nvarchar(MAX) NULL,
	ComplementaryProducts nvarchar(255) NULL,
	OtherCollections nvarchar(255) NULL,
	ComingSoonUK nvarchar(255) NULL,
	ComingSoonUS nvarchar(255) NULL,
	ColourCodes nvarchar(255) NULL,
	SellCo nvarchar(255) NULL,
	AfterCareCodes nvarchar(255) NULL,
	SortName nvarchar(255) NULL,
	VerticalPatternRepeat nvarchar(255) NULL,
	HorizontalPatternRepeat nvarchar(255) NULL,
	MertexAccount nvarchar(255) NULL,
	FrWallpaper varchar(255) NULL,
	SampleProductCodes varchar(255) NULL,
	OtherInfo nvarchar(MAX) NULL,
	StyleLibraryVisible varchar(255) NULL,
	CompositionDescription varchar(500) NULL,
	StockCode varchar(255) NULL,
	LaunchDate datetime NULL,
	ReadyForWeb nvarchar(4) NULL,
	IsOptionProduct nvarchar(3) NULL,
	OutOfStock nvarchar(1) NULL,
	SiteVisibility nvarchar(10) NULL,
	ItemType nvarchar(10) NULL,
	DefaultOrderLocation nvarchar(10) NULL,
	ParentProductCode nvarchar(255) NULL,
	GBPPrice nvarchar(100) NULL,
	EURPrice nvarchar(100) NULL,
	USDPrice nvarchar(100) NULL,
	StyleLibraryContractsVisible nvarchar(255) NULL,
	Weight nvarchar(255) NULL,
	FROther varchar(MAX) NULL,
	FRInherent varchar(MAX) NULL,
	FRTreated varchar(MAX) NULL,
	FRTreatable varchar(MAX) NULL,
	StockedByThirdParty varchar(255) NULL,
	ContractUsage nvarchar(MAX) NULL,
	ContractUsageFilter nvarchar(MAX) NULL,
	SpecSheetAvePieceSize nvarchar(255) NULL,
	SpecSheetFinCodes nvarchar(MAX) NULL,
	SpecSheetIntraStat nvarchar(255) NULL,
	SpecSheetOrCountry nvarchar(255) NULL,
	SpecSheetReverse nvarchar(255) NULL,
	SpecSheetSQMeter nvarchar(255) NULL,
	SpecSheetThreadPerCm nvarchar(255) NULL,
	SpecSheetYarnNo nvarchar(255) NULL,
	ImportDate datetime NOT NULL,
	UOM varchar(50) NULL,
	SpecSupplierCode nvarchar(255) NULL,
	SpecEanCode nvarchar(255) NULL,
	SpecSupplierProductCode nvarchar(255) NULL,
	SpecUnitOfMeasurement nvarchar(255) NULL,
	SpecRoom nvarchar(255) NULL,
	SpecColours nvarchar(255) NULL,
	EuroRRP nvarchar(255) NULL,
	UsdRRP nvarchar(255) NULL,
	ThirdPartyUrl nvarchar(150) NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_ProductImportTemp17 SET (LOCK_ESCALATION = TABLE)
GO
ALTER TABLE dbo.Tmp_ProductImportTemp17 ADD CONSTRAINT
	DF_ProductImportTemp17_ImportDate DEFAULT (getdate()) FOR ImportDate
GO
IF EXISTS(SELECT * FROM dbo.ProductImportTemp17)
	 EXEC('INSERT INTO dbo.Tmp_ProductImportTemp17 (Price, Sample, PattBooks, PieceOnlyOrders, AllowReserve, StatusImage, ProductCode, Description, AfterCare, Usage, Finish, ImageName, PatternMatch, PatternMatchDescription, RubTestResults, Width, DesignCode, DesignName, CollectionName, DescriptiveColour, ProductGroup, ProductType, DesignType, DesignStyle, SalesDivision, TechComposition, Composition, SmallScale, UsageCode, UsageImageCodes, RRP, FrDomestic, FrContract, FrDrapes, Contract, Blackout, DesignDetailsSort, CollectionSort, NewCollection, ImageList, OnDetailPage, ImageType, PercentageColour, OverallLightnessColour, DesignDescription, ComplementaryProducts, OtherCollections, ComingSoonUK, ComingSoonUS, ColourCodes, SellCo, AfterCareCodes, SortName, VerticalPatternRepeat, HorizontalPatternRepeat, MertexAccount, FrWallpaper, SampleProductCodes, OtherInfo, StyleLibraryVisible, CompositionDescription, StockCode, LaunchDate, ReadyForWeb, IsOptionProduct, OutOfStock, SiteVisibility, ItemType, DefaultOrderLocation, ParentProductCode, GBPPrice, EURPrice, USDPrice, StyleLibraryContractsVisible, Weight, FROther, FRInherent, FRTreated, FRTreatable, StockedByThirdParty, ContractUsage, ContractUsageFilter, SpecSheetAvePieceSize, SpecSheetFinCodes, SpecSheetIntraStat, SpecSheetOrCountry, SpecSheetReverse, SpecSheetSQMeter, SpecSheetThreadPerCm, SpecSheetYarnNo, ImportDate, UOM, SpecSupplierCode, SpecEanCode, SpecSupplierProductCode, SpecUnitOfMeasurement, SpecRoom, SpecColours, EuroRRP, UsdRRP)
		SELECT Price, Sample, PattBooks, PieceOnlyOrders, AllowReserve, StatusImage, ProductCode, Description, AfterCare, Usage, Finish, ImageName, PatternMatch, PatternMatchDescription, RubTestResults, Width, DesignCode, DesignName, CollectionName, DescriptiveColour, ProductGroup, ProductType, DesignType, DesignStyle, SalesDivision, TechComposition, Composition, SmallScale, UsageCode, UsageImageCodes, RRP, FrDomestic, FrContract, FrDrapes, Contract, Blackout, DesignDetailsSort, CollectionSort, NewCollection, ImageList, OnDetailPage, ImageType, PercentageColour, OverallLightnessColour, DesignDescription, ComplementaryProducts, OtherCollections, ComingSoonUK, ComingSoonUS, ColourCodes, SellCo, AfterCareCodes, SortName, VerticalPatternRepeat, HorizontalPatternRepeat, MertexAccount, FrWallpaper, SampleProductCodes, CONVERT(nvarchar(MAX), OtherInfo), StyleLibraryVisible, CompositionDescription, StockCode, LaunchDate, ReadyForWeb, IsOptionProduct, OutOfStock, SiteVisibility, ItemType, DefaultOrderLocation, ParentProductCode, GBPPrice, EURPrice, USDPrice, StyleLibraryContractsVisible, Weight, FROther, FRInherent, FRTreated, FRTreatable, StockedByThirdParty, ContractUsage, ContractUsageFilter, SpecSheetAvePieceSize, SpecSheetFinCodes, SpecSheetIntraStat, SpecSheetOrCountry, SpecSheetReverse, SpecSheetSQMeter, SpecSheetThreadPerCm, SpecSheetYarnNo, ImportDate, UOM, SpecSupplierCode, SpecEanCode, SpecSupplierProductCode, SpecUnitOfMeasurement, SpecRoom, SpecColours, EuroRRP, UsdRRP FROM dbo.ProductImportTemp17 WITH (HOLDLOCK TABLOCKX)')
GO
DROP TABLE dbo.ProductImportTemp17
GO
EXECUTE sp_rename N'dbo.Tmp_ProductImportTemp17', N'ProductImportTemp17', 'OBJECT' 
GO
ALTER TABLE dbo.ProductImportTemp17 ADD CONSTRAINT
	PK_ProductImportTemp17 PRIMARY KEY CLUSTERED 
	(
	ProductCode
	) WITH( PAD_INDEX = OFF, FILLFACTOR = 90, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
CREATE NONCLUSTERED INDEX IX_ProductImportTemp17_CollectionName ON dbo.ProductImportTemp17
	(
	CollectionName
	) WITH( PAD_INDEX = OFF, FILLFACTOR = 90, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX IX_ProductImportTemp17_ComplementaryProducts ON dbo.ProductImportTemp17
	(
	ComplementaryProducts
	) INCLUDE (ProductCode) 
 WITH( PAD_INDEX = OFF, FILLFACTOR = 90, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX IX_ProductImportTemp17_DesignDetailsSort ON dbo.ProductImportTemp17
	(
	DesignDetailsSort
	) INCLUDE (ProductCode) 
 WITH( PAD_INDEX = OFF, FILLFACTOR = 90, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX IX_ProductImportTemp17_PattBooks ON dbo.ProductImportTemp17
	(
	PattBooks
	) WITH( PAD_INDEX = OFF, FILLFACTOR = 90, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX IX_ProductImportTemp17_ColourCodes ON dbo.ProductImportTemp17
	(
	ColourCodes
	) INCLUDE (ProductCode) 
 WITH( PAD_INDEX = OFF, FILLFACTOR = 90, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX missing_index_3460_3459_ProductImportTemp17 ON dbo.ProductImportTemp17
	(
	ProductGroup
	) WITH( PAD_INDEX = OFF, FILLFACTOR = 90, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX IX_ProductImportTemp_UsageImageCodes ON dbo.ProductImportTemp17
	(
	UsageImageCodes
	) INCLUDE (ProductCode) 
 WITH( PAD_INDEX = OFF, FILLFACTOR = 90, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
COMMIT
