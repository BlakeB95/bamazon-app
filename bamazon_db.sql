DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(50),
  price FLOAT(11),
  stock_quantity INTEGER(11),
  PRIMARY KEY (item_id)
  );
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("Pencils", "Office Supplies", 5.95, 57),
  ("Schindler's List Blu-Ray", "Multimedia", 15.95, 17),
  ("Maui Coffee Beans", "Food", 9.79, 8),
  ("Samsung Galaxy S8", "Technology", 294.89, 17),
  ("Apple AirPods", "Technology", 147.00, 5),
  ("Blood Meridian by Cormac Macarthy", "Books", 12.87, 32),
  ("Gunpowder Green Tea", "Food", 14.98, 12),
  ("Pens", "Office Supplies", 7.85, 35),
  ("Into the Kill Taker by Fugazi", "Multimedia", 8.95, 5),
  ("Kindle Fire HD 8 Tablet", "Multimedia", 79.99, 3),
  ("Mr. Coffee Electric Coffee Bean Grinder", "Food", 14.49, 9);
  
  SELECT * FROM products;