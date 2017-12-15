DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    product_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price DECIMAL(13,2),
    stock_quantity INT,
    PRIMARY KEY (product_id)
);

INSERT INTO products(
    product_name,
    department_name,
    price,
    stock_quantity
)
VALUES
(
    "xbox",
    "gaming",
    200.00,
    10
),
(
    "coat",
    "clothing",
    80.00,
    5
),
(
    "hairdryer",
    "personal hygeine",
    30.00,
    10
),
(
    "halo 5",
    "gaming",
    10.00,
    10
),
(
    "rocket league",
    "gaming",
    22.00,
    100
),
(
    "macbook pro",
    "technology",
    1000.00,
    10
),
(
    "tv",
    "technology",
    600.00,
    15
),
(
    "lamp",
    "home decor",
    30.00,
    8
),
(
    "duffel bag",
    "gym",
    75.00,
    40
),
(
    "pizza",
    "food",
    10.00,
    500
);