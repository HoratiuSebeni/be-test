# 🧪 Backend test

This project is targeted as a test task and contais a small project that has a database and a backend. There are tasks listed below that are subject to be solved. This assignent is aimed to test some basic programming knowledge and experience with `git`.

The project uses the following:

-   Docker to run services in containers
-   Postgresql as the database
-   Prisma as ORM
-   A backend written in NodeJS exposing a simple API
-   JWT for basic authentication

There's instructions on how to start the service in the `🚀 Start services` section.

## 🧾 Tasks

-   Describe the roles of `docker`, `postgres`, `prisma` and `express` for the project.
-   Implement the `/users/invalidateToken/:id` endpoint. The endpoint should invalidate the JWT that is associated with the user of id `id`.
-   Add a many-to-many relationship between users and company. [Hint.](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations)
    -   Add so that when calling `/users` the company data linked to the user is also retuned.
-   **Bonus 🚨:** There is a security vulnerability in one of the `users` endpoints (Disrecarding the very busted login endpoint). If you can find it - describe the issue and patch the vulnerability.

## 🏁 Submitting the test

1. Fork this repository
2. Solve as many tasks as you can and commit them in a fitting manner
3. Upload the forked repository and
4. Share the repository with us by either making it public and send us the repository link _or_ inviting us to the forked project.

---
# Response 

##  Docker

-   Docker is an open platform for packing software to make it able to run on any hardware. 
-   The role of Docker in this project is to run multiple services. Each one of them is runing in one container. With Docker compose, we are able to start simultaneously backend and database container. 

##  Postgres

-   PostgreSQL is a open source database system that uses SQL language. 
-   The role of PostgreSQL in this project is to store organized data. In this project user information (name, email, JWT) and company information (name, location, url) are stored in PostgreSQL database.  

## Prisma

-   Prisma is an object relational mapping, a piece of software that allows developers to work with the databases. 
-   In this project Prisma allows us to map the tables of the database and make relationships between users and company tables. By using Prisma Schema we define the models in an intuitive language. Also with Prisma we did our migrations to the database.

## Express

-   Express.js is a web application framework that makes it easier to organize application functionality using routing.
-   In this project, Express allows us to: handle request at differrent URL routes using POST/GET parameters, perform HTTP request-response, handle errors. Also with the help of this framework, in this project we are able to connect to the database and insert or extract information from it. 

## Security vulnerability

-   I found a security vulnerability on the '/users' endpoint that uses GET as parameter of the request. The role of this endpoint is to return all the users with all the information for each on of them. But by returning the JWT of every user it makes it possible for everyone, that makes the request, to authenticate as another user.
-   I solved this issue by removing the JWT field from the returned objects. So that only in '/users/login/:id' endpoint, it is returned a JWT for the user that was logged in.

---

# 🚀 Start services

## 📍Prerequisits

-   Docker with docker-compose installed
-   node installed (Dockerfile runs node 18)
-   Install all node modules with `npm i`

## 💾 Run database

Start the Postgres database by starting the single docker service.

```
docker-compose up -d db
```

## 🌱 Run database migration

To get the database up and running, we need to populate the database with the prisma schema.

```
npx prisma migrate dev --name <MY_MIGRARTION_NAME>
```

Replace `<MY_MIGRARTION_NAME>` with something fitting. Initial migrations can be named `initial_migration`.

## 🏃‍♀️ Run backend

To get the backend up and running, simply start the node server:

```
node index.js
```

## 🔥 OPTIONAL: Run docker-compose

Granted that the migration has been run, you can run docker-compose to start the services:

```
docker-compose down && docker-compose up --build -d
```
