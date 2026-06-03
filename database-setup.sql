-- Student Management System Database Setup
-- Run this script in MySQL to set up the database

-- Create database
CREATE DATABASE IF NOT EXISTS student_db;

-- Use the database
USE student_db;

-- The 'students' table will be automatically created by Spring Boot
-- But if you want to create it manually, use this:

CREATE TABLE IF NOT EXISTS students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    course VARCHAR(255) NOT NULL
);

-- Insert sample data (optional)
INSERT INTO students (name, email, course) VALUES
    ('John Doe', 'john.doe@example.com', 'Computer Science'),
    ('Jane Smith', 'jane.smith@example.com', 'Information Technology'),
    ('Mike Johnson', 'mike.johnson@example.com', 'Software Engineering'),
    ('Sarah Williams', 'sarah.williams@example.com', 'Data Science'),
    ('David Brown', 'david.brown@example.com', 'Cyber Security');

-- Verify data
SELECT * FROM students;

-- Show table structure
DESCRIBE students;
