DROP TABLE IF EXISTS careers CASCADE;

CREATE TABLE careers (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  job_title VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  job_link VARCHAR(255) NOT NULL,
  is_coverletter_generated BOOLEAN default false,
  is_applied BOOLEAN default false,
  is_interviewed BOOLEAN default false,
  notes TEXT
);