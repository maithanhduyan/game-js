CREATE FUNCTION dbo.Calculatebetresult (@serverSeed BINARY(32),
                                        @clientSeed BINARY(8))
returns BIGINT
AS
  BEGIN
      DECLARE @hash BINARY(64)
      DECLARE @index INT
      DECLARE @r BIGINT

      SET @hash = Hashbytes('SHA2_512', @serverSeed + @clientSeed)
      SET @hash = Hashbytes('SHA2_512', @hash)

      WHILE 1 = 1
        BEGIN
            SET @index = 1

            WHILE @index <= 64 - 3
              BEGIN
                  SET @r = Cast(Substring(@hash, @index, 3) AS BIGINT)

                  IF @r < 16000000
                    RETURN @r % 1000000

                  SET @index += 3
              END

            SET @hash = Hashbytes('SHA2_512', @hash)
        END

      RETURN -1
  END 