# VUE + NODE + MONGO_DB DEMO

In order to test **Prompt Manager Platform** web application locally and due to some files inherent sensitive nature, you will have to perform the following steps:

1. Register a MongoDB account at their [website](https://account.mongodb.com/account/register). You can skip this step if you already own an account.

2. Create a free M0 cluster. Note, a **MongoDB free tier account** allows to run this application smoothly.

3. Create a database navigating to Collections after selecting the cluster.

4. Create two collections in the database, *users* and *prompts*.

5. Add a new database user from MongoDB's dashboard > Security > Database access.

6. Generate an *.env* file within the project's root directory and define the specified environment variables. <br/><br/>
   - VITE_BASE_URL
   > Back-end's base URL address (*e.g.*, VITE_BASE_URL=http<span>://localhost:3000).
   - PORT
   > The port which the back-end listens from. Note it has to match the one from the previous URL one (*e.g.* 3000).
   - USERNAME
   - PASSWORD
   > The credentials defined in step number 5.
   - DB_NAME
   > The database name specified in step number 3.
   - DB_URL
   > Navigate to the cluster and select to *connect* from drivers. Choose *Node* driver, v5.x will suffice. You will find the connection string at the bottom.
   - SECRET_KEY
   > A long string, used by **jwt** library sign method (*e.g.*, my-extra-large-secret-key-string).
   - SALT_FACTOR
   > Specifies salt length, used by **bcrypt** library hash method (*e.g.*, 10).
7. Just execute `docker compose up` command to run the application.
