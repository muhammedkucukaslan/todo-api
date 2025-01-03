﻿
# Todo API

This is a simple Todo API built with Express, TypeScript, Turso (SQLite), and various tools for testing, linting, and code formatting.

## Project Structure

```bash
todo-api/
├── node_modules
├── src/
│   ├── auth/
│   │   ├── utils/
│   │   │   ├── password.ts
│   │   │   ├── token.ts
│   │   │   └── validation.ts
│   │   ├── handler.ts
│   │   ├── index.ts
│   │   ├── repository.ts
│   │   ├── router.ts
│   │   └── service.ts
│   ├── todos/
│   │   ├── utils /
│   │   │   └── validation.ts
│   │   ├── handler.ts
│   │   ├── repository.ts
│   │   ├── index.ts   
│   │   ├── router.ts
│   │   └── service.ts
│   ├── types/
│   │   └── global.ts
│   ├── users/
│   │   ├── tests/
│   │   │   ├── handler.test.ts
│   │   │   ├── repository.test.ts
│   │   │   └── service.test.ts
│   │   ├── utils/
│   │   │   └── validation.ts
│   │   ├── handler.ts
│   │   ├── index.ts
│   │   ├── repository.ts
│   │   ├── router.ts
│   │   └── service.ts
│   ├── config/
│   │   └── db.ts
│   ├── utils/
│   │   ├── functions.ts
│   │   └── middleware.ts
│   ├── middleware.ts
│   └── server.ts
├── .env
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.mjs
├── jest.config.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Features

- TypeScript for type safety
- Express for building the API
- Turso (SQLite) as the database
- Express-validator for request validation
- Jest for testing
- Prettier for code formatting
- ESLint for code linting
- Postman for API documentation

## Prerequisites

- Node.js (v16 or higher)
- npm installed
- Turso database setup

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/muhammedkucukaslan/todo-api.git
cd todo-api
```

### Install Dependencies

```bash
npm install
```

### Set up Database

1. Ensure you have Turso (or SQLite) set up.
2. Configure the database connection in your environment variables if needed.

### Running in Development Mode

```bash
npm run dev
```

This command will start the server using tsx for TypeScript compilation in watch mode.

### Building the Project

```bash
npm run build
```

This will compile TypeScript files into JavaScript.

### Running Tests

```bash
npm run test
```

This will run the Jest test suite to validate your code and create html files that contains tests' results.

### Linting and Formatting

- To lint the code:

```bash
npm run lint
```

- To format the code:

```bash
npm run format
```

## Scripts

Here are the npm scripts available in this project:

- `test`: Runs the Jest test suite.
- `format`: Formats the code using Prettier.
- `dev`: Starts the development server with tsx watch mode.
- `build`: Compiles TypeScript to JavaScript.
- `lint`: Lints the code using ESLint.
- `prepublish`: Runs the build before publishing.

## API Documentation

You can find the API documentation in the Postman collection.

[The API Doc](https://documenter.getpostman.com/view/35025978/2sAYJ3G2Mv)

## License

This project is licensed under the MIT License.
