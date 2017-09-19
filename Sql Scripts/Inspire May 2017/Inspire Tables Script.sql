

/****** Object:  Table [dbo].[StyleLibraryInspire]    Script Date: 23/05/2017 10:09:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[StyleLibraryInspire](
	[InspireId] [int] IDENTITY(1,1) NOT NULL,
	[ArticleTypeId] [int] NOT NULL CONSTRAINT [DF_StyleLibraryInspire_ArticleTypeId]  DEFAULT ((1)),
	[Title] [nvarchar](255) NOT NULL,
	[ShortDescription] [nvarchar](1000) NULL,
	[isHero] [bit] NOT NULL CONSTRAINT [DF_StyleLibraryInspire_isHero]  DEFAULT ((0)),
	[isAdvice] [bit] NOT NULL CONSTRAINT [DF_StyleLibraryInspire_isAdvice]  DEFAULT ((0)),
	[isBlog] [bit] NOT NULL CONSTRAINT [DF_StyleLibraryInspire_isBlog]  DEFAULT ((0)),
	[isOurPicks] [bit] NOT NULL CONSTRAINT [DF_StyleLibraryInspire_isOurPicks]  DEFAULT ((0)),
	[isUserContent] [bit] NOT NULL CONSTRAINT [DF_StyleLibraryInspire_isUserContent]  DEFAULT ((0)),
	[isVideo] [bit] NOT NULL,
	[isImageGallery] [bit] NOT NULL CONSTRAINT [DF_StyleLibraryInspire_isImageGallery]  DEFAULT ((0)),
	[isLookBook] [bit] NOT NULL CONSTRAINT [DF_StyleLibraryInspire_isLookBook]  DEFAULT ((0)),
	[isRooms] [bit] NOT NULL CONSTRAINT [DF_StyleLibraryInspire_isRooms]  DEFAULT ((0)),
	[ImageAssetId] [bigint] NULL,
	[ImageURL] [nvarchar](500) NULL,
	[ImageAlt] [nvarchar](500) NULL,
	[ArticleURL] [nvarchar](250) NULL,
	[ShopTheLook] [nvarchar](255) NULL,
	[DateCreated] [datetime2](7) NOT NULL CONSTRAINT [DF_StyleLibraryInspire_DateCreated]  DEFAULT (getdate()),
	[InspireHomepage] [bit] NOT NULL CONSTRAINT [DF_StyleLibraryInspire_InspireHomepage]  DEFAULT ((0)),
	[HomepageOrder] [int] NOT NULL CONSTRAINT [DF_StyleLibraryInspire_HomepageOrder]  DEFAULT ((99)),
	[deleted] [bit] NOT NULL CONSTRAINT [DF_StyleLibraryInspire_deleted]  DEFAULT ((0)),
	[Thumbnail] [nvarchar](500) NULL,
 CONSTRAINT [PK_StyleLibraryInspire] PRIMARY KEY CLUSTERED 
(
	[InspireId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[StylelibraryInspireArticle](
	[InspireID] [int] NOT NULL,
	[ArticleId] [int] IDENTITY(1,1) NOT NULL,
	[ArticleBody] [nvarchar](max) NULL,
	[MetaTitle] [nvarchar](255) NULL,
	[MetaDescription] [nvarchar](512) NULL,
 CONSTRAINT [PK_StylelibraryInspireArticle] PRIMARY KEY CLUSTERED 
(
	[ArticleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
