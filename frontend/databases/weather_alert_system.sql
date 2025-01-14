-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) DEFAULT 'user'
);

-- Create favorite_locations table
CREATE TABLE favorite_locations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    location_name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL
);

-- Create weather_data table
CREATE TABLE weather_data (
    id SERIAL PRIMARY KEY,
    location_name VARCHAR(100) NOT NULL,
    temperature DECIMAL(5, 2) NOT NULL,
    humidity INTEGER NOT NULL,
    wind_speed DECIMAL(5, 2) NOT NULL,
    weather_description VARCHAR(255) NOT NULL,
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create alerts table
CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    location_name VARCHAR(100) NOT NULL,
    alert_message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
