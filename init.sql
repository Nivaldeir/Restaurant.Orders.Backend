DROP TABLE IF EXISTS table_order, order_product_ingredients, order_product, payment, product_ingredients, product, ingredients, category, "table"
CREATE TABLE "table"
(
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
CREATE TABLE category
(
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
CREATE TABLE ingredients
(
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
CREATE TABLE product
(
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    category_id UUID REFERENCES category(id) ON DELETE CASCADE
);
CREATE TABLE product_ingredients
(
    id UUID PRIMARY KEY,
    product_id UUID REFERENCES product(id) ON DELETE CASCADE,
    ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE
);
CREATE TABLE table_order
(
    id UUID PRIMARY KEY,
    table_id UUID REFERENCES "table"(id) ON DELETE CASCADE,
    total_price DOUBLE PRECISION NOT NULL,
    order_status VARCHAR(100) NOT NULL,
    duration TIMESTAMP NOT NULL,
    payment_id UUID REFERENCES payment(id) ON DELETE CASCADE
);
CREATE TABLE order_product
(
    id UUID PRIMARY KEY,
    order_id UUID REFERENCES table_order(id) ON DELETE CASCADE,
    product_id UUID REFERENCES product(id) ON DELETE CASCADE,
    status VARCHAR(100) NOT NULL,
    price DOUBLE PRECISION NOT NULL
);
CREATE TABLE order_product_ingredients
(
    id UUID PRIMARY KEY,
    order_product_id UUID REFERENCES order_product(id) ON DELETE CASCADE,
    ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE
);
CREATE TABLE payments
(
    id UUID PRIMARY KEY,
    method VARCHAR(255) NOT NULL,
    amount DOUBLE PRECISION NOT NULL
);
