DROP TABLE IF EXISTS orders_table;

CREATE TABLE orders_table
(
    id      SERIAL PRIMARY KEY,
    user_id BIGINT         NOT NULL,
    product VARCHAR(255)   NOT NULL,
    price   DECIMAL(10, 2) NOT NULL
);