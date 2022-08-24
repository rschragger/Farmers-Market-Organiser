DROP DATABASE IF EXISTS farmers_market_db;
CREATE DATABASE farmers_market_db;

USE farmers_market_db;

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(30) NOT NULL
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  phone VARCHAR(30),
  email VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id)
    REFERENCES roles (id)
    ON DELETE SET NULL
); 

CREATE TABLE market_locations (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  market_name VARCHAR(30) NOT NULL,
  address  VARCHAR(30) NOT NULL,
  website VARCHAR(30),
  images VARCHAR(30)
);

CREATE TABLE events (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(30) NOT NULL,
    start DATETIME NOT NULL,
    end DATETIME NOT NULL
   /* location_id INT,
    FOREIGN KEY (location_id)
      REFERENCES market_locations (id)
      ON DELETE SET NULL */
);

CREATE TABLE stalls (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  stall_name VARCHAR(30),
  description TEXT NOT NULL,
  price INT NOT NULL,
  lease_expiry DATETIME,
  location_id INT,
  FOREIGN KEY (location_id)
    REFERENCES market_locations (id)
    ON DELETE SET NULL
);

CREATE TABLE stallholders (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  company_mane VARCHAR(30),
  website VARCHAR(30),
  mobile VARCHAR(30),
  image VARCHAR(30),
  description TEXT NOT NULL
);


CREATE TABLE bookings (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  FOREIGN KEY (event_id)
    REFERENCES events (id)
    ON DELETE SET NULL,
  stall_id INT,
  FOREIGN KEY (stall_id)
    REFERENCES stalls (id)
    ON DELETE SET NULL,
  stallholder_id INT,
    FOREIGN KEY (stallholder_id)
      REFERENCES stallholders (id)
      ON DELETE SET NULL
);

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(30),
  description TEXT NOT NULL,
  image VARCHAR(30)
);