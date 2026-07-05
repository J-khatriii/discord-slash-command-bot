CREATE TABLE IF NOT EXISTS interactions (
    id BIGSERIAL PRIMARY KEY,

    discord_interaction_id BIGINT NOT NULL UNIQUE,

    guild_id BIGINT NOT NULL,

    user_id BIGINT NOT NULL,

    username TEXT NOT NULL,

    command_name TEXT NOT NULL,

    status TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE admins (
    id SERIAL PRIMARY KEY,

    username VARCHAR(100) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,
    
    created_at TIMESTAMP DEFAULT NOW()
);