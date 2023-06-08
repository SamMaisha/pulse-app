## Loading Database table and seeding files

1. on vagrant run command `psql`
2. run commands:
   - `SET ROLE labber`
   - `CREATE DATABASE final`
3. .env file config
   - `DB_HOST=localhost`
   - `DB_USER=labber`
   - `DB_PASS=labber`
   - `DB_NAME=final`
   - `DB_PORT=5432`
4. On your local terminal in pulse-app, `cd server`
5. Run command `npm run db:reset` -> this should create tables and seed files
