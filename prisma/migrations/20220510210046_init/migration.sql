BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[WorkoutLog] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [exercise] NVARCHAR(1000) NOT NULL,
    [amount] DECIMAL(32,16) NOT NULL,
    [units] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL,
    [minutes] INT NOT NULL,
    [calories] INT NOT NULL,
    CONSTRAINT [WorkoutLog_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] VARCHAR(255) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);

-- AddForeignKey
ALTER TABLE [dbo].[WorkoutLog] ADD CONSTRAINT [WorkoutLog_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
