USE [Videos]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 12/22/2014 09:56:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Categories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Colors]    Script Date: 12/22/2014 09:56:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Colors](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Color] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[LineItems]    Script Date: 12/22/2014 09:56:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[LineItems](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SizeId] [int] NOT NULL,
	[ColorId] [int] NOT NULL,
	[Description] [varchar](100) NOT NULL,
 CONSTRAINT [PK_LineItem] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sizes]    Script Date: 12/22/2014 09:56:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sizes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Size] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Types]    Script Date: 12/22/2014 09:56:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Types](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Type] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[UserPreferences]    Script Date: 12/22/2014 09:56:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[UserPreferences](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[PreferenceId] [int] NOT NULL,
	[Value] [varchar](100) NOT NULL CONSTRAINT [DF_UserPreferences_Value]  DEFAULT ('[]'),
 CONSTRAINT [PK_UserPreferences] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[UserProfile]    Script Date: 12/22/2014 09:56:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserProfile](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](56) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Videos]    Script Date: 12/22/2014 09:56:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Videos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](100) NOT NULL,
	[Length] [int] NOT NULL,
	[CategoryId] [int] NOT NULL,
 CONSTRAINT [PK_Video] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[VinScores]    Script Date: 12/22/2014 09:56:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VinScores](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[GlobalCustomerId] [int] NOT NULL,
	[Score] [int] NOT NULL,
 CONSTRAINT [PK_VinScore] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[webpages_Membership]    Script Date: 12/22/2014 09:56:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[webpages_Membership](
	[UserId] [int] NOT NULL,
	[CreateDate] [datetime] NULL,
	[ConfirmationToken] [nvarchar](128) NULL,
	[IsConfirmed] [bit] NULL DEFAULT ((0)),
	[LastPasswordFailureDate] [datetime] NULL,
	[PasswordFailuresSinceLastSuccess] [int] NOT NULL DEFAULT ((0)),
	[Password] [nvarchar](128) NOT NULL,
	[PasswordChangedDate] [datetime] NULL,
	[PasswordSalt] [nvarchar](128) NOT NULL,
	[PasswordVerificationToken] [nvarchar](128) NULL,
	[PasswordVerificationTokenExpirationDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[webpages_OAuthMembership]    Script Date: 12/22/2014 09:56:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[webpages_OAuthMembership](
	[Provider] [nvarchar](30) NOT NULL,
	[ProviderUserId] [nvarchar](100) NOT NULL,
	[UserId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Provider] ASC,
	[ProviderUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Categories] ON 

GO
INSERT [dbo].[Categories] ([Id], [Description]) VALUES (1, N'Comedy')
GO
INSERT [dbo].[Categories] ([Id], [Description]) VALUES (2, N'Drama')
GO
INSERT [dbo].[Categories] ([Id], [Description]) VALUES (3, N'Animated')
GO
INSERT [dbo].[Categories] ([Id], [Description]) VALUES (4, N'Action')
GO
INSERT [dbo].[Categories] ([Id], [Description]) VALUES (5, N'Documentary')
GO
SET IDENTITY_INSERT [dbo].[Categories] OFF
GO
SET IDENTITY_INSERT [dbo].[Colors] ON 

GO
INSERT [dbo].[Colors] ([Id], [Name]) VALUES (1, N'Blue')
GO
INSERT [dbo].[Colors] ([Id], [Name]) VALUES (2, N'Red')
GO
INSERT [dbo].[Colors] ([Id], [Name]) VALUES (3, N'Green')
GO
INSERT [dbo].[Colors] ([Id], [Name]) VALUES (4, N'Yellow')
GO
INSERT [dbo].[Colors] ([Id], [Name]) VALUES (5, N'Purple')
GO
INSERT [dbo].[Colors] ([Id], [Name]) VALUES (6, N'White')
GO
INSERT [dbo].[Colors] ([Id], [Name]) VALUES (7, N'Black')
GO
INSERT [dbo].[Colors] ([Id], [Name]) VALUES (8, N'Chartreuse')
GO
INSERT [dbo].[Colors] ([Id], [Name]) VALUES (9, N'Teal')
GO
INSERT [dbo].[Colors] ([Id], [Name]) VALUES (10, N'Orange')
GO
INSERT [dbo].[Colors] ([Id], [Name]) VALUES (11, N'Gold')
GO
SET IDENTITY_INSERT [dbo].[Colors] OFF
GO
SET IDENTITY_INSERT [dbo].[LineItems] ON 

GO
INSERT [dbo].[LineItems] ([Id], [SizeId], [ColorId], [Description]) VALUES (1, 1, 1, N'Line Item 1')
GO
INSERT [dbo].[LineItems] ([Id], [SizeId], [ColorId], [Description]) VALUES (2, 3, 8, N'Line Item 2')
GO
SET IDENTITY_INSERT [dbo].[LineItems] OFF
GO
SET IDENTITY_INSERT [dbo].[Sizes] ON 

GO
INSERT [dbo].[Sizes] ([Id], [Name]) VALUES (1, N'X-Small')
GO
INSERT [dbo].[Sizes] ([Id], [Name]) VALUES (2, N'Small')
GO
INSERT [dbo].[Sizes] ([Id], [Name]) VALUES (3, N'Medium')
GO
INSERT [dbo].[Sizes] ([Id], [Name]) VALUES (4, N'Large')
GO
INSERT [dbo].[Sizes] ([Id], [Name]) VALUES (5, N'X-Large')
GO
INSERT [dbo].[Sizes] ([Id], [Name]) VALUES (6, N'XX-Large')
GO
SET IDENTITY_INSERT [dbo].[Sizes] OFF
GO
SET IDENTITY_INSERT [dbo].[Types] ON 

GO
INSERT [dbo].[Types] ([Id], [Description]) VALUES (1, N'Unknown')
GO
INSERT [dbo].[Types] ([Id], [Description]) VALUES (2, N'New')
GO
INSERT [dbo].[Types] ([Id], [Description]) VALUES (3, N'Used')
GO
SET IDENTITY_INSERT [dbo].[Types] OFF
GO
SET IDENTITY_INSERT [dbo].[UserPreferences] ON 

GO
INSERT [dbo].[UserPreferences] ([Id], [UserId], [PreferenceId], [Value]) VALUES (1, 1, 2, N'[5]')
GO
INSERT [dbo].[UserPreferences] ([Id], [UserId], [PreferenceId], [Value]) VALUES (2, 1, 1, N'[11]')
GO
INSERT [dbo].[UserPreferences] ([Id], [UserId], [PreferenceId], [Value]) VALUES (3, 1, 3, N'[6]')
GO
INSERT [dbo].[UserPreferences] ([Id], [UserId], [PreferenceId], [Value]) VALUES (4, 1, 6, N'[2]')
GO
INSERT [dbo].[UserPreferences] ([Id], [UserId], [PreferenceId], [Value]) VALUES (5, 1, 4, N'[2]')
GO
INSERT [dbo].[UserPreferences] ([Id], [UserId], [PreferenceId], [Value]) VALUES (6, 1, 5, N'[3,1]')
GO
SET IDENTITY_INSERT [dbo].[UserPreferences] OFF
GO
SET IDENTITY_INSERT [dbo].[UserProfile] ON 

GO
SET IDENTITY_INSERT [dbo].[UserProfile] OFF
GO
SET IDENTITY_INSERT [dbo].[Videos] ON 

GO
INSERT [dbo].[Videos] ([Id], [Title], [Length], [CategoryId]) VALUES (1, N'Roxanne', 96, 1)
GO
INSERT [dbo].[Videos] ([Id], [Title], [Length], [CategoryId]) VALUES (2, N'WarGames', 126, 2)
GO
INSERT [dbo].[Videos] ([Id], [Title], [Length], [CategoryId]) VALUES (3, N'Dirty Rotten Scoundrels', 124, 1)
GO
INSERT [dbo].[Videos] ([Id], [Title], [Length], [CategoryId]) VALUES (4, N'Ghostbusters', 118, 1)
GO
SET IDENTITY_INSERT [dbo].[Videos] OFF
GO
SET IDENTITY_INSERT [dbo].[VinScores] ON 

GO
INSERT [dbo].[VinScores] ([Id], [GlobalCustomerId], [Score]) VALUES (1, 1, 50)
GO
INSERT [dbo].[VinScores] ([Id], [GlobalCustomerId], [Score]) VALUES (2, 2, 65)
GO
INSERT [dbo].[VinScores] ([Id], [GlobalCustomerId], [Score]) VALUES (3, 3, 85)
GO
INSERT [dbo].[VinScores] ([Id], [GlobalCustomerId], [Score]) VALUES (4, 4, 95)
GO
SET IDENTITY_INSERT [dbo].[VinScores] OFF
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UQ__UserProf__C9F2845626FBE33F]    Script Date: 12/22/2014 09:56:28 ******/
ALTER TABLE [dbo].[UserProfile] ADD UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[LineItems]  WITH CHECK ADD  CONSTRAINT [FK_LineItem_Color] FOREIGN KEY([ColorId])
REFERENCES [dbo].[Colors] ([Id])
GO
ALTER TABLE [dbo].[LineItems] CHECK CONSTRAINT [FK_LineItem_Color]
GO
ALTER TABLE [dbo].[LineItems]  WITH CHECK ADD  CONSTRAINT [FK_LineItem_Size] FOREIGN KEY([SizeId])
REFERENCES [dbo].[Sizes] ([Id])
GO
ALTER TABLE [dbo].[LineItems] CHECK CONSTRAINT [FK_LineItem_Size]
GO
ALTER TABLE [dbo].[Videos]  WITH CHECK ADD  CONSTRAINT [FK_Video_Category] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Categories] ([Id])
GO
ALTER TABLE [dbo].[Videos] CHECK CONSTRAINT [FK_Video_Category]
GO
