CREATE OR REPLACE FUNCTION calculatebetresult(serverSeed BYTEA, clientSeed BYTEA)
RETURNS BIGINT AS $$
DECLARE
    hash BYTEA;
    index INT;
    r BIGINT;
BEGIN
    hash := digest(serverSeed || clientSeed, 'sha512');
    hash := digest(hash, 'sha512');

    LOOP
        index := 1;

        WHILE index <= 64 - 3 LOOP
            r := ('x' || substr(encode(hash, 'hex'), index * 2, 6))::bit(24)::bigint;

            IF r < 16000000 THEN
                RETURN r % 1000000;
            END IF;

            index := index + 3;
        END LOOP;

        hash := digest(hash, 'sha512');
    END LOOP;

    RETURN -1;
END;
$$ LANGUAGE plpgsql;
