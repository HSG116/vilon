-- Social Media Management Database Schema
-- Created for Vilon Social Media Admin Dashboard
-- Compatible with PostgreSQL

-- Note: Create database manually: CREATE DATABASE vilon_social;
-- Then connect to vilon_social database before running this schema

-- Social Media Platforms Table
CREATE TABLE IF NOT EXISTS social_platforms (
    id SERIAL PRIMARY KEY,
    platform_name VARCHAR(50) NOT NULL UNIQUE,
    platform_key VARCHAR(20) NOT NULL UNIQUE,
    icon_name VARCHAR(50),
    color_hex VARCHAR(7),
    profile_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social Media Stats Table
CREATE TABLE IF NOT EXISTS social_media_stats (
    id SERIAL PRIMARY KEY,
    platform_id INT NOT NULL UNIQUE,
    follower_count BIGINT NOT NULL DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (platform_id) REFERENCES social_platforms(id) ON DELETE CASCADE
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_platform_updated ON social_media_stats(platform_id, last_updated);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'editor' CHECK (role IN ('super_admin', 'admin', 'editor')),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update History Log Table
CREATE TABLE IF NOT EXISTS update_history (
    id SERIAL PRIMARY KEY,
    platform_id INT NOT NULL,
    old_count BIGINT,
    new_count BIGINT NOT NULL,
    updated_by VARCHAR(100) NOT NULL,
    update_source VARCHAR(20) DEFAULT 'manual' CHECK (update_source IN ('manual', 'api', 'automatic')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (platform_id) REFERENCES social_platforms(id) ON DELETE CASCADE
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_platform_date ON update_history(platform_id, created_at);

-- Insert default social media platforms (PostgreSQL syntax)
INSERT INTO social_platforms (platform_name, platform_key, icon_name, color_hex, profile_url) VALUES
('Instagram', 'instagram', 'InstagramIcon', '#E1306C', 'https://www.instagram.com/vilon/'),
('TikTok', 'tiktok', 'TikTokIcon', '#FE2C55', 'https://www.tiktok.com/@vilon'),
('X', 'x', 'XIcon', '#000000', 'https://x.com/vilon45'),
('WhatsApp', 'whatsapp', 'WhatsAppIcon', '#25D366', 'https://www.whatsapp.com/channel/vilon'),
('Snapchat', 'snapchat', 'SnapchatIcon', '#FFFC00', 'https://www.snapchat.com/add/vilon'),
('Discord', 'discord', 'DiscordIcon', '#5865F2', 'https://discord.gg/H8ujXwHkHT'),
('YouTube', 'youtube', 'YoutubeIcon', '#FF0000', 'https://www.youtube.com/@vilon45'),
('Kick', 'kick', 'KickIcon', '#53FC18', 'https://kick.com/vilon')
ON CONFLICT (platform_name) DO NOTHING;

-- Insert initial stats with current values (PostgreSQL syntax)
INSERT INTO social_media_stats (platform_id, follower_count, updated_by) VALUES
((SELECT id FROM social_platforms WHERE platform_key = 'instagram'), 21300, 'admin'),
((SELECT id FROM social_platforms WHERE platform_key = 'tiktok'), 42300, 'admin'),
((SELECT id FROM social_platforms WHERE platform_key = 'x'), 19200, 'admin'),
((SELECT id FROM social_platforms WHERE platform_key = 'whatsapp'), 9100, 'admin'),
((SELECT id FROM social_platforms WHERE platform_key = 'snapchat'), 1200000, 'admin'),
((SELECT id FROM social_platforms WHERE platform_key = 'discord'), 9000, 'admin'),
((SELECT id FROM social_platforms WHERE platform_key = 'youtube'), 5600, 'admin'),
((SELECT id FROM social_platforms WHERE platform_key = 'kick'), 121100, 'admin')
ON CONFLICT (platform_id) DO UPDATE SET follower_count = EXCLUDED.follower_count;

-- Create default admin user (password: admin123) - PostgreSQL syntax
INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES
('admin', 'admin@vilon.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Vilon Admin', 'super_admin')
ON CONFLICT (username) DO NOTHING;

-- Note: Views can be created separately if needed
-- CREATE VIEW current_social_stats AS ...
-- CREATE VIEW update_history_view AS ...
