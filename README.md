# Backend Engineer Work Sample

This project skeleton contains a basic Express setup one endpoint to create a user and one endpoint to fetch all users, as well as a basic empty unit test.

## Scripts ✍️
`npm start` starts the server

`npm test` executes the tests

## Docker 🐳
`docker-compose up` runs the api locally on port 9080

## Goal ⚽
1. Adjust POST /users that it accepts a user and stores it in a database.
    * The user should have a unique id, a name, a unique email address and a creation date
2. Adjust GET /users that it returns (all) users from the database.
   * This endpoint should be able to receive a query parameter `created` which sorts users by creation date ascending or descending.

Feel free to add or change this project as you like.

## Decisions 🤔

1. Project structure based on layers for such a small project, also valid would've been by feature 'users' 
2. Tests are grouped under the directory `test`
3. Handling known errors by returning error messages from methods
4. Handling unkown errors by rethrowing exceptions let express handle those
5. I have not included schema validation for user creation POST /users, just checking if those fields exist
6. Testing from outside-in using stubs and mocks
7. GET /users receive a query parameter `created` as per specs, values are `asc` or `desc`. Default value if query parameter not provided is `desc`
