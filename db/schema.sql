CREATE TYPE UserRole AS ENUM ('USER', 'ADMIN', 'SUPERADMIN');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role UserRole DEFAULT 'USER'
);

CREATE TABLE Sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sessionToken VARCHAR(255) UNIQUE NOT NULL,
    userId UUID UNIQUE NOT NULL,
    expires TIMESTAMP WITH TIME ZONE NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_userId ON Sessions(userId);

