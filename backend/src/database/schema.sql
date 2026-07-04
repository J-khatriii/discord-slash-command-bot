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