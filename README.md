## Loading Database table and seeding files

1. on vagrant run command `psql`
2. run commands:
   - `SET ROLE labber`
   - `CREATE DATABASE final`
3. On your local terminal in pulse-app, `cd server`
4. Run command `npm run db:reset` -> this should create tables and seed files
