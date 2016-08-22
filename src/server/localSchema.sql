-- to run this file and update the remote database run: heroku pg:psql --app taco-tuts-staging < usersSchema.sql

\c tacobase2
\i ./usersSchema.sql
