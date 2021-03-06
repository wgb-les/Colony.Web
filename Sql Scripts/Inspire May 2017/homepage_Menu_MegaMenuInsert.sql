/****** Object:  StoredProcedure [dbo].[homepage_Menu_MegaMenuInsert]    Script Date: 30/05/2017 10:08:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[homepage_Menu_MegaMenuInsert]
	@MenuId bigint,
	@ImageAssetId bigint = null,
	@ButtonText nvarchar(50) = null,
	@ButtonIconClass nvarchar(50) = null,
	@PromoUrl nvarchar(500) = null,
	@PromoName nvarchar(255) = null,
	@PromoSubTitle nvarchar(255) = null,
	@ButtonUrl nvarchar(500) = null
as
begin
	set nocount on
	
	insert into dbo.homepage_MegaMenu
	(
		MenuId,
		ImageAssetId,
		ButtonText,
		ButtonIconClass,
		ButtonUrl,
		PromoUrl,
		PromoName,
		PromoSubTitle
	)
	output inserted.*
	values
	(
		@MenuId,
		@ImageAssetId,
		@ButtonText,
		@ButtonIconClass,
		@ButtonUrl,
		@PromoUrl,
		@PromoName,
		@PromoSubTitle
	)
	
end
