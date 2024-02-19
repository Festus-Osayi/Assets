# BlogPost Website

This is a simple blog post website built using Node.js, Express.js, Bootstrap, Handlebars, PostgreSQL, MongoDB, Sequelize, bcryptjs, and JavaScript.

## Features

- User authentication and authorization with bcryptjs for password hashing and Sequelize for database management.
- CRUD operations for blog posts and comments.
- MongoDB integration for storing additional user information.
- Responsive design using Bootstrap framework.
- Templating engine Handlebars for generating HTML pages.

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js
- PostgreSQL
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Festus-Osayi/Assets.git
   cd Assets/blogpost - navigate to the project directory
   npm install - install dependencies
   ```

2. Set up your database, client session, cloudinary and sequelize configuration in `.env` file:

   ```dotenv
   MONGO_URL = your_mongodb_url
   CLIENT_SESSIONS_SK = your_client_session_sk
   CLOUDINARY_NAME = your_cloudinary_name
   CLOUDINARY_API_KEY = your_cloudinary_api_key
   CLOUDINARY_API_SK = your_cloudinary_api_sk_key
   SEQUELIZE_USER = your_sequelize_username
   SEQUELIZE_PASSWORD = your_sequelize_password
   ```

3. Run the server

   ```
   node server.js
   ```

4. Open your browser and navigate to `http://localhost:8080 `to view the website.

## Usage

- Register an account or login if you already have one.
- Create, read, update, and delete blog posts.
- Leave comments on blog posts.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please submit an issue or open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

```
This README.md file provides basic information about the project, including features, prerequisites, installation instructions, usage guidelines, how to contribute, and licensing details. Make sure to customize the content according to your project's specific details.
```
