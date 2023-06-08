# BanKing

<p align="center">
<img src="public/IMG/banking.png" width=40% height=40%>
</p>

## Banking Management Web Application

This project aims to develop a full-stack web application for banking management. The back-end will provide CRUD (Create, Read, Update, Delete) operations on a database using Node.js and Express technologies. The application will have a user-friendly interface for interacting with these CRUD functionalities. Additionally, the application will be responsive, adapting to various devices such as desktops, tablets, and smartphones to ensure an optimal user experience.

## Technologies Used

* Node.js: Node.js is a server-side runtime environment based on the Google Chrome V8 JavaScript engine. It allows executing JavaScript code outside the browser.
* Express: Express is a web framework for Node.js that simplifies the creation of robust and scalable web applications. It provides features and tools for route handling, request and response management, middleware creation, etc.
* EJS (Embedded JavaScript): EJS is a template engine that generates server-side HTML code using special tags. It allows dynamically inserting data and executing JavaScript functions within the generated HTML code.
* API REST (Representational State Transfer): REST architecture is a style of architecture for creating web services. In this project, we use a RESTful API to expose CRUD functionalities on our database. The API defines routes corresponding to CRUD operations (GET, POST, PUT, DELETE) and returns data in JSON format.

## Installation
To run the project locally, follow these steps:

Clone the repository:
```
git clone https://github.com/La_Cobble/BanKing.git
```
Install the dependencies:
```
cd your-repo
npm install
```

## Set up the database connection:

Open the project in your preferred code editor.
Create .env
Update the necessary configuration parameters such as the database link.
Save the changes.
Start the application:

```npm start```

## Access the application in your browser:
Open your browser and navigate to http://localhost:5000 (or another specified port if configured differently).
You should see the banking management application up and running.

## Usage
The banking management web application provides the following features:

Home: Displays the main page of the application with options to add users, view users, and access the transaction history.
Add User: Allows adding a new user to the system. It collects necessary details such as name, account number, and balance.
View User: Displays a list of all users in the system. It provides information about each user, such as their name, account number, and current balance.
Transfer History: Shows a history of transactions, including details like sender, receiver, and transaction amount.
Login: Provides an option to log in as an administrator and access additional administrative features.
Additional Features
Chat Support
The application includes a chat support feature implemented using Socket.IO. It allows users to interact with a support agent in real-time. The chat support is accessible via a floating chat button, and users can ask questions or seek assistance related to the banking services provided.

## Contributing
Contributions to the project are welcome. If you would like to contribute, please follow these steps:

Fork the repository on GitHub.
Clone your forked repository to your local machine.
Create a new branch with a descriptive name for your feature/fix.
Make necessary changes and commit them.
Push your changes to your forked repository.
Submit a pull request to the main repository.
Please ensure your code follows the project's coding style and conventions. Additionally, include relevant details and tests for your changes.

## License
This project is licensed under the MIT License.

##  Acknowledgments
We would like to acknowledge the following resources and libraries used in this project:

Bootstrap CSS: A popular CSS framework for building responsive and mobile-first websites.
Font Awesome: A library of scalable vector icons that can be customized and styled with CSS.
Normalize.css: A CSS file that normalizes styles across different browsers.
Socket.IO: A JavaScript library for real-time communication between the browser and the server.

## Note
This README provides an overview of the banking management web application. For detailed code and implementation, please refer to the project files.
