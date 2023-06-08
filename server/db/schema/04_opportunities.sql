DROP TABLE IF EXISTS opportunities CASCADE;

CREATE TABLE opportunities (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  notes TEXT
);