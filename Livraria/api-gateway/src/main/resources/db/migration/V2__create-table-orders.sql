CREATE TABLE orders(
       id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
       book_name VARCHAR(100) NOT NULL,
       price NUMERIC(15,2) NOT NULL,
       status VARCHAR(100) NOT NULL,
       user_id INT NOT NULL,

       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);