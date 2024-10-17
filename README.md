# DEMO

In order to test **Prompt Manager Platform** locally and due to some files inherent sensitive nature, you will have to perform the following steps:

1. Create a MongoDB account at their [website](https://account.mongodb.com/account/register).
> TODO

2. Create *.env* plain text files within each of the directories below.
  + **Root folder:** Add Vue's default IP address. By default, "*VITE_BASE_URL=http<span>://localhost:3000*".
  + **Front-end folder:** Again, add Vue's default IP address. Be sure to use the same value as the previous file.
  + **Back-end folder:** Add the following environment variables with your desired values. Note, a MongoDB free tier account allows to run this application smoothly.
    - USERNAME
    - PASSWORD
    - PORT
    - DB_NAME
    - DB_URL
    - SECRET_KEY (used for **jwt** library)
    - SALT_FACTOR

3. Just execute `docker compose up` command to run the application.
