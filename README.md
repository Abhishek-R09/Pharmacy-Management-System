# Pharmacy Management System

Easy Pharmacy Management System running on Node.js + Express.js server and a MySQL database.

## Getting Started

1. Clone/Download the repository
2. Open terminal in the project folder
3. Run `npm install` in the terminal. Make sure you are in your project folder
4. The database used is MySQL database.
5. Download MySQL connector for Node.js from [here](https://dev.mysql.com/downloads/installer/).
6. Complete the setup
7. Create the database either from workbench or MySQL command line
8. Now, select your default database as the one created in previous step.
9. From now on, it's recommended to use the workbench to run the queries.
10. First run the file `table_creation_queries.sql`.
11. Now, create a `.env` file in your project root folder.
12. Add the following keys:
    - DB_HOST=localhost
    - DB_USER=root
    - DB_PASS={The password you gave while creating the MySQL database connection (Don't include curly braces)}
    - DB_NAME={The database name that you gave}
    - SESSION_SECRET={Any string of your choice. This will be used to create sessions}
13. If you face issues connecting to the database in the next steps, refer this [StackOverflow question](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)
14. Now, you can start the node + express server.
15. In your project root folder, run `npm run dev`. This will start the server at port 3000.
16. Open your favourite browser and go to [localhost:3000](http://localhost:3000/). This will take you to login page.
17. Right now we don't have any users. Let's create one.
18. Go the the signup route by clicking on the link on the webpage [localhost:3000/signup](http://localhost:3000/signup)
19. Create a new user with username 'admin' and password of your choice and press signup.
20. At this point you'll face an error. This is fine as we'll rectify it.
21. In the `insertion_queries.sql`, run the query (in workbench) to create an employee. You can identify as it's only a single query.
22. Now restart the server. Go to the terminal where the server is running. Type `rs` and `Enter`. Your server is restarted.
23. Now, login using 'admin' username and the password that you used to create this user.
24. The project is up and running!

## Some notes

- This project is not meant for production
- Some features are not yet implemented but they are visible in the UI
- After each restart of the server, you need to login as the session is destroyed.
- If you encounter any issues, please feel free to raise it in the [issues tab](https://github.com/Abhishek911cse/Pharmacy-Management-System/issues)

**Please star the repository if you like it :grin:**
