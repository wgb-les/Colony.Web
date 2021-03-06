
/****** Object:  StoredProcedure [dbo].[homepage_Menu_MegaMenuUpdate]    Script Date: 30/05/2017 10:06:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[homepage_Menu_MegaMenuUpdate]
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
	
	if not exists (select * from dbo.homepage_MegaMenu where MenuId = @MenuId)
	begin
		exec homepage_Menu_MegaMenuInsert 
			@MenuId = @MenuId, 
			@ImageAssetId = @ImageAssetId,
			@ButtonText = @ButtonText,
			@ButtonIconClass = @ButtonIconClass,
			@ButtonUrl = @ButtonUrl,
			@PromoName = @PromoName,
			@PromoSubTitle = @PromoSubTitle,
			@PromoUrl = @PromoUrl
	end
	
	update dbo.homepage_MegaMenu
		set	ImageAssetId = @ImageAssetId,
			ButtonText = @ButtonText,
			ButtonIconClass = @ButtonIconClass,
			ButtonUrl = @ButtonUrl,
			PromoName = @PromoName,
			PromoSubTitle = @PromoSubTitle,
			PromoUrl = @PromoUrl,
			LastModified = GETDATE()
	output inserted.*
	where MenuId = @MenuId
	
end
