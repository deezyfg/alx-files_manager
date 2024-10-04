# 0x04. Files manager

## Table of Contents

- [Project Overview](#project-overview)
- [Some context on the project](#some-context-on-the-project)
- [Tech Stack](#tech-stack)
- [Coverage Badges](#coverage-badges)
- [Resources](#resources)
- [Learning Objectives](#learning-objectives)
- [Requirements](#requirements)
- [Provided files](#provided-files)
- [Project Environment](#project-environment)
- [Task](#task)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Documentation](#documentation)
- [Contribute](#contribute)
- [Support the Project](#support-the-project)
- [License](#license)
- [About Developer](#about-developer)

![GitHub contributors](https://img.shields.io/github/contributors/deezyfg/alx-files_manager?style=for-the-badge&color=48bf21)
![GitHub Repo size](https://img.shields.io/github/repo-size/deezyfg/alx-files_manager)
![ESLint](https://img.shields.io/badge/ESLint-enabled-brightgreen?style=round-square)
![Repo language count](https://img.shields.io/github/languages/count/deezyfg/alx-files_manager?style=round-square)
![Repo top language](https://img.shields.io/github/languages/top/deezyfg/alx-files_manager?style=round-square)
![GitHub Repo stars](https://img.shields.io/github/stars/deezyfg/alx-files_manager?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/deezyfg/alx-files_manager?style=for-the-badge&color=d7af2d)
![GitHub pull requests](https://img.shields.io/github/issues-pr/deezyfg/alx-files_manager?style=for-the-badge&color=f47373)
![GitHub License](https://img.shields.io/github/license/deezyfg/alx-files_manager?style=for-the-badge&color=e67234)
![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fdeezyfg%2Falx-files_manager&label=Repo%20Views&countColor=%2337d67a&labelStyle=upper)
![Latest commit](https://img.shields.io/github/last-commit/deezyfg/alx-files_manager?style=round-square)

## Project Overview 📃️

This project focuses on building a file management system using modern web technologies and practices. It involves creating a back-end application using JavaScript (ES6) with Node.js and Express.js for the server framework. The project utilizes NoSQL databases, specifically MongoDB for data storage and Redis for caching. Additionally, it incorporates Kue for handling background jobs, allowing for efficient processing of file-related tasks.

## Some context on the project 💭️

🎓 This project is a summary of this back-end trimester: authentication, NodeJS, MongoDB, Redis, pagination, and background processing.

🎯 The objective is to build a simple platform to upload and view files:

- 🔐 User authentication via a token
- 📋 List all files
- 📤 Upload a new file
- 🔒 Change permission of a file
- 👀 View a file
- 🖼️ Generate thumbnails for images

🚶‍♂️ You will be guided step by step for building it, but you have some freedoms of implementation, split in more files etc… (`utils` folder will be your friend)

💡 Of course, this kind of service already exists in real life - it's a learning purpose to assemble each piece and build a full product.

😊 Enjoy!

## Tech Stack 💻

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![ES6](https://img.shields.io/badge/ES6-000000?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Kue](https://img.shields.io/badge/Kue-FF4B00?style=for-the-badge)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![npx](https://img.shields.io/badge/npx-000000?style=for-the-badge&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

## Coverage Badges
<!-- coverage:badge -->
<!-- coverage:lines -->
<!-- coverage:branches -->
<!-- coverage:functions -->
<!-- coverage:statements -->

## Resources 📚️

**Read or watch:**

- [Node JS getting started](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [Process API doc](https://node.readthedocs.io/en/latest/api/process/)
- [Express getting started](https://expressjs.com/en/starter/installing.html)
- [Mocha documentation](https://mochajs.org/)
- [Nodemon documentation](https://github.com/remy/nodemon#nodemon)
- [MongoDB](https://github.com/mongodb/node-mongodb-native)
- [Bull](https://github.com/OptimalBits/bull)
- [Image thumbnail](https://www.npmjs.com/package/image-thumbnail)
- [Mime-Types](https://www.npmjs.com/package/mime-types)
- [Redis](https://github.com/redis/node-redis)

## Learning Objectives

At the end of this project, you are expected to be able to [explain to anyone](https://fs.blog/feynman-learning-technique/), without the help of Google:

- how to create an API with Express
- how to authenticate a user
- how to store data in MongoDB
- how to store temporary data in Redis
- how to setup and use a background worker

## Requirements

- Allowed editors: `vi`, `vim`, `emacs`, `Visual Studio Code`
- All your files will be interpreted/compiled on Ubuntu 18.04 LTS using `node` (version 12.x.x)
- All your files should end with a new line
- A `README.md` file, at the root of the folder of the project, is mandatory
- Your code should use the `js` extension
- Your code will be verified against lint using ESLint

## Provided files 🗃️

`package.json`

<details>
  <summary>Click to show/hide file contents</summary>

```js
{
    "name": "files_manager",
    "version": "1.0.0",
    "description": "A simple file management API built with Node.js.",
    "author": "Peter Opoku-Mensah <mensahpeter421@gmail.com>",
    "license": "MIT",
    "private": true,
    "main": "server.js",
    "scripts": {
        "lint": "./node_modules/.bin/eslint",
        "lint-nt": "./node_modules/.bin/eslint.cmd",
        "check-lint": "lint controllers/ libs/ middlewares/ routes/ utils/ server.js worker.js",
        "check-lint-nt": "yarn lint-nt controllers/ libs/ middlewares/ routes/ utils/ server.js worker.js",
        "start-server": "nodemon --exec babel-node --presets @babel/preset-env ./server.js",
        "start-worker": "nodemon --exec babel-node --presets @babel/preset-env ./worker.js",
        "dev": "nodemon --exec babel-node --presets @babel/preset-env",
        "test": "./node_modules/.bin/mocha --opts mocha.opts tests/**/*.js",
        "test-with-coverage": "nyc --reporter=text --reporter=json-summary ./node_modules/.bin/mocha --opts mocha.opts tests/**/*.js",
        "coveralls": "nyc ./node_modules/.bin/mocha --opts mocha.opts tests/**/*.js && nyc report --reporter=text-lcov | coveralls",
        "make-badges": "istanbul-badges-readme --coverageDir=coverage",
        "generate-docs": "apidoc -i ./ -o apidoc/"
    },
  "dependencies": {
    "bull": "^3.16.0",
    "chai-http": "^4.3.0",
    "dotenv": "^16.0.1",
    "express": "^4.17.1",
    "googleapis": "^101.0.0",
    "image-thumbnail": "^1.0.10",
    "mime-message": "^0.1.3",
    "mime-types": "^2.1.27",
    "mongodb": "^3.5.9",
    "redis": "^2.8.0",
    "sha1": "^1.1.1",
    "uuid": "^8.2.0"
  },
  "devDependencies": {
    "@babel/cli": "^7.8.0",
    "@babel/core": "^7.8.0",
    "@babel/node": "^7.8.0",
    "@babel/preset-env": "^7.8.2",
    "@babel/register": "^7.8.0",
    "apidoc": "^0.54.0",
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "coveralls": "^3.1.1",
    "eslint": "^6.4.0",
    "eslint-config-airbnb-base": "^14.0.0",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-jest": "^22.17.0",
    "istanbul-badges-readme": "^1.8.5",
    "mocha": "^6.2.2",
    "mocha-lcov-reporter": "^1.3.0",
    "nodemon": "^2.0.2",
    "nyc": "^15.1.0",
    "request": "^2.88.0",
    "sinon": "^7.5.0",
    "supertest": "^6.2.3"
  },
  "apidoc": {
    "name": "File Manager API",
    "title": "FIle Manager API",
     "url": "http://127.0.0.1:5000",
  "header": {
     "title": "Introduction",
     "filename": "header.md"
        },
  "order": [
    "Status",
    "Stats",
    "Authentication",
    "User",
    "Files"
    ]
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/deezyfg/alx-files_manager"
  },
  "bugs": {
    "url": "https://github.com/deezyfg/alx-files_manager/issues"
  },
  "homepage": "https://github.com/deezyfg/alx-files_manager/blob/master/README.md",
  "engines": {
    "node": "16.x",
    "npm": "8.x",
    "yarn": "1.x"
  }
}
```

</details>

`.eslintrc.js`

<details>
  <summary>Click to show/hide file contents</summary>

```js
module.exports = {
  env: {
    browser: false,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/all',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {
    'max-classes-per-file': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'withStatement',
    ],
  },
  overrides:[
    {
      files: ['*.js'],
      excludedFiles: 'babel.config.js',
    }
  ]
};
```

</details>


`babel.config.js`

<details>
  <summary>Click to show/hide file contents</summary>

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

</details>


### and…

Don’t forget to run `$ npm install` when you have the `package.json`

## Project Environment

| **Component**         | **Version/Details**        |
|-----------------------|----------------------------|
| **Languages**         | JavaScript                 |
| **Operating System**  | Ubuntu 18.04 LTS           |
| **Node.js Version**   | 12.x.x                     |
| **MongoDB Version**   | 4.2.x                      |
| **Redis Version**     | 6.x.x                      |
| **Style Guidelines**  | ESLint rules               |
| **Package File**      | `package.json`             |
| **Dependencies File** | `package-lock.json`        |
| **Testing Framework** | Mocha and Chai             |

### Additional Notes

- To ensure all dependencies are up-to-date for optimal performance:
  ```bash
  npm outdated           # Check for outdated packages
  npm update             # Update packages to their latest minor/patch version
  npx npm-check-updates -u && npm install  # Update all packages to latest version (including major updates)

  - Follow ESLint rules to maintain code quality and consistency.
  ```bash
  npx eslint .           # Run ESLint on your project
  npx eslint . --fix     # Automatically fix ESLint-flagged issues where possible
  ```

- For major version updates, it's recommended to update and test packages individually to avoid breaking changes.
  ```bash
  npm install <package-name>@latest
  ```

## Task 📑️

### Mandatory:

#### 0. Redis utils

Inside the folder `utils`, create a file `redis.js` that contains the class `RedisClient`.

`RedisClient` should have:

- the constructor that creates a client to Redis:
      - any error of the redis client must be displayed in the console (you should use `on('error')` of the redis client)
- a function `isAlive` that returns `true` when the connection to Redis is a success otherwise, `false`
- an asynchronous function `get` that takes a string key as argument and returns the Redis value stored for this key
- an asynchronous function `set` that takes a string key, a value and a duration in second as arguments to store it in Redis (with an expiration set by the duration argument)
- an asynchronous function `del` that takes a string key as argument and remove the value in Redis for this key

After the class definition, create and export an instance of `RedisClient` called `redisClient`.

```js
bob@dylan:~$ cat main.js
import redisClient from './utils/redis';

(async () => {
    console.log(redisClient.isAlive());
    console.log(await redisClient.get('myKey'));
    await redisClient.set('myKey', 12, 5);
    console.log(await redisClient.get('myKey'));

    setTimeout(async () => {
        console.log(await redisClient.get('myKey'));
    }, 1000*10)
})();

bob@dylan:~$ npm run dev main.js
true
null
12
null
bob@dylan:~$ 
```

**Repo:**

- GitHub repository: `alx-files_manager`
- File: `utils/redis.js`

#### 1. MongoDB utils

Inside the folder `util`s, create a file `db.js` that contains the class `DBClient`.

`DBClient` should have:

- the constructor that creates a client to MongoDB:
      - host: from the environment variable `DB_HOST` or default: `localhost`
      - port: from the environment variable `DB_PORT` or default: `27017`
      - database: from the environment variable `DB_DATABASE` or default: `files_manager`
- a function `isAlive` that returns `true` when the connection to MongoDB is a success otherwise, `false`
- an asynchronous function `nbUsers` that returns the number of documents in the collection `users`
- an asynchronous function `nbFiles` that returns the number of documents in the collection `files`

After the class definition, create and export an instance of `DBClient` called `dbClient`.

```js
bob@dylan:~$ cat main.js
import dbClient from './utils/db';

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const repeatFct = async () => {
            await setTimeout(() => {
                i += 1;
                if (i >= 10) {
                    reject()
                }
                else if(!dbClient.isAlive()) {
                    repeatFct()
                }
                else {
                    resolve()
                }
            }, 1000);
        };
        repeatFct();
    })
};

(async () => {
    console.log(dbClient.isAlive());
    await waitConnection();
    console.log(dbClient.isAlive());
    console.log(await dbClient.nbUsers());
    console.log(await dbClient.nbFiles());
})();

bob@dylan:~$ npm run dev main.js
false
true
4
30
bob@dylan:~$ 
```

**Repo:**

- GitHub repository: `alx-files_manager`
- File: `utils/db.js`

#### 2. First API

Inside `server.js`, create the Express server:

- it should listen on the port set by the environment variable `PORT` or by default 5000
- it should load all routes from the file `routes/index.js`

Inside the folder `routes`, create a file `index.js` that contains all endpoints of our API:
- `GET /status` => `AppController.getStatus`
- `GET /stats` => `AppController.getStats`

Inside the folder `controllers`, create a file `AppController.js` that contains the definition of the 2 endpoints:

- `GET /status` should return if Redis is alive and if the DB is alive too by using the 2 utils created previously: `{ "redis": true, "db": true }` with a status code 200
- `GET /stats` should return the number of users and files in DB: `{ "users": 12, "files": 1231 }` with a status code 200
	- `users` collection must be used for counting all users
	- `files` collection must be used for counting all files

**Terminal 1:**

```js
bob@dylan:~$ npm run start-server
Server running on port 5000
...
```

**Terminal 2:**

```js
bob@dylan:~$ curl 0.0.0.0:5000/status ; echo ""
{"redis":true,"db":true}
bob@dylan:~$ 
bob@dylan:~$ curl 0.0.0.0:5000/stats ; echo ""
{"users":4,"files":30}
bob@dylan:~$ 
```

**Repo:**

- GitHub repository: `alx-files_manager`
- File: `server.js, routes/index.js, controllers/AppController.js`

#### 3. Create a new user

Now that we have a simple API, it’s time to add users to our database.

In the file `routes/index.js`, add a new endpoint:

- `POST /users` => `UsersController.postNew`

Inside `controllers`, add a file `UsersController.js` that contains the new endpoint:

`POST /users` should create a new user in DB:

- To create a user, you must specify an `email` and a `password`
- If the `email` is missing, return an error `Missing email` with a status code 400
- If the `password` is missing, return an error `Missing password` with a status code 400
- If the `email` already exists in DB, return an error `Already exist` with a status code 400
- The `password` must be stored after being hashed in `SHA1`
- The endpoint is returning the new user with only the `email` and the `id` (auto generated by MongoDB) with a status code 201
- The new user must be saved in the collection `users`:
	- `email`: same as the value received
	- `password`: `SHA1` value of the value received

```js
bob@dylan:~$ curl 0.0.0.0:5000/users -XPOST -H "Content-Type: application/json" -d '{ "email": "bob@dylan.com", "password": "toto1234!" }' ; echo ""
{"id":"5f1e7d35c7ba06511e683b21","email":"bob@dylan.com"}
bob@dylan:~$ 
bob@dylan:~$ echo 'db.users.find()' | mongo files_manager
{ "_id" : ObjectId("5f1e7d35c7ba06511e683b21"), "email" : "bob@dylan.com", "password" : "89cad29e3ebc1035b29b1478a8e70854f25fa2b2" }
bob@dylan:~$ 
bob@dylan:~$ 
bob@dylan:~$ curl 0.0.0.0:5000/users -XPOST -H "Content-Type: application/json" -d '{ "email": "bob@dylan.com", "password": "toto1234!" }' ; echo ""
{"error":"Already exist"}
bob@dylan:~$ 
bob@dylan:~$ curl 0.0.0.0:5000/users -XPOST -H "Content-Type: application/json" -d '{ "email": "bob@dylan.com" }' ; echo ""
{"error":"Missing password"}
bob@dylan:~$ 
```

**Repo:**

- GitHub repository: `alx-files_manager`
- File: `utils/, routes/index.js, controllers/UsersController.js`

#### 4. Authenticate a user

In the file `routes/index.js`, add 3 new endpoints:

- `GET /connect` => `AuthController.getConnect`
- `GET /disconnect` => `AuthController.getDisconnect`
- `GET /users/me` => `UserController.getMe`

Inside `controllers`, add a file `AuthController.js` that contains new endpoints:

`GET /connect` should sign-in the user by generating a new authentication token:

- By using the header `Authorization` and the technique of the Basic auth (Base64 of the `<email>:<password>`), find the user associate to this email and with this password (reminder: we are storing the SHA1 of the password)
- If no user has been found, return an error `Unauthorized` with a status code 401
- Otherwise:
	- Generate a random string (using `uuidv4`) as token
	- Create a key: `auth_<token>`
	- Use this key for storing in Redis (by using the `redisClient` create previously) the user ID for 24 hours
	- Return this token: `{ "token": "155342df-2399-41da-9e8c-458b6ac52a0c" }` with a status code 200

Now, we have a way to identify a user, create a token (= avoid to store the password on any front-end) and use this token for 24h to access to the API!

Every authenticated endpoints of our API will look at this token inside the header `X-Token`.

`GET /disconnect` should sign-out the user based on the token:

- Retrieve the user based on the token:
	- If not found, return an error `Unauthorized` with a status code 401
	- Otherwise, delete the token in Redis and return nothing with a status code 204

Inside the file `controllers/UsersController.js` add a new endpoint:

`GET /users/me` should retrieve the user base on the token used:

- Retrieve the user based on the token:
	 - If not found, return an error `Unauthorized` with a status code 401
	- Otherwise, return the user object (`email` and `id` only)

```js
bob@dylan:~$ curl 0.0.0.0:5000/connect -H "Authorization: Basic Ym9iQGR5bGFuLmNvbTp0b3RvMTIzNCE=" ; echo ""
{"token":"031bffac-3edc-4e51-aaae-1c121317da8a"}
bob@dylan:~$ 
bob@dylan:~$ curl 0.0.0.0:5000/users/me -H "X-Token: 031bffac-3edc-4e51-aaae-1c121317da8a" ; echo ""
{"id":"5f1e7cda04a394508232559d","email":"bob@dylan.com"}
bob@dylan:~$ 
bob@dylan:~$ curl 0.0.0.0:5000/disconnect -H "X-Token: 031bffac-3edc-4e51-aaae-1c121317da8a" ; echo ""

bob@dylan:~$ curl 0.0.0.0:5000/users/me -H "X-Token: 031bffac-3edc-4e51-aaae-1c121317da8a" ; echo ""
{"error":"Unauthorized"}
bob@dylan:~$ 
```

**Repo:**

- GitHub repository: `alx-files_manager`
- File: `utils/, routes/index.js, controllers/UsersController.js, controllers/AuthController.js`
   
#### 5. First file

In the file `routes/index.js`, add a new endpoint:

- `POST /files` => `FilesController.postUpload`

Inside `controllers`, add a file `FilesController.js` that contains the new endpoint:

`POST /files` should create a new file in DB and in disk:

- Retrieve the user based on the token:
	- If not found, return an error `Unauthorized` with a status code 401
- To create a file, you must specify:
	- `name`: as filename
	- `type`: either `folder`, `file` or `image`
	- `parentId`: (optional) as ID of the parent (default: 0 - the root)
	- `isPublic`: (optional) as boolean to define if the file is public or not (default: false)
	- `data`: (only for `type=file|image`) as Base64 of the file content
- If the `name` is missing, return an error `Missing name` with a status code 400
- If the `type` is missing or not part of the list of accepted type, return an error `Missing type` with a status code 400
- If the `data` is missing and `type != folder`, return an error `Missing data` with a status code 400
- If the `parentId` is set:
	- If no file is present in DB for this `parentId`, return an error `Parent not found` with a status code 400
	- If the file present in DB for this `parentId` is not of type `folder`, return an error `Parent is not a folder` with a status code 400
- The user ID should be added to the document saved in DB - as owner of a file
- If the type is `folder`, add the new file document in the DB and return the new file with a status code 201
- Otherwise:
- All file will be stored locally in a folder (to create automatically if not present):
	- The relative path of this folder is given by the environment variable `FOLDER_PATH`
	- If this variable is not present or empty, use `/tmp/files_manager` as storing folder path
- Create a local path in the storing folder with filename a UUID
- Store the file in clear (reminder: `data` contains the Base64 of the file) in this local path
- Add the new file document in the collection `files` with these attributes:
	- `userId`: ID of the owner document (owner from the authentication)
	- `name`: same as the value received
	- `type`: same as the value received
	- `isPublic`: same as the value received
	- `parentId`: same as the value received - if not present: 0
	- `localPath`: for a `type=file|image`, the absolute path to the file save in local
- Return the new file with a status code 201

```js
bob@dylan:~$ curl 0.0.0.0:5000/connect -H "Authorization: Basic Ym9iQGR5bGFuLmNvbTp0b3RvMTIzNCE=" ; echo ""
{"token":"f21fb953-16f9-46ed-8d9c-84c6450ec80f"}
bob@dylan:~$ 
bob@dylan:~$ curl -XPOST 0.0.0.0:5000/files -H "X-Token: f21fb953-16f9-46ed-8d9c-84c6450ec80f" -H "Content-Type: application/json" -d '{ "name": "myText.txt", "type": "file", "data": "SGVsbG8gV2Vic3RhY2shCg==" }' ; echo ""
{"id":"5f1e879ec7ba06511e683b22","userId":"5f1e7cda04a394508232559d","name":"myText.txt","type":"file","isPublic":false,"parentId":0}
bob@dylan:~$
bob@dylan:~$ ls /tmp/files_manager/
2a1f4fc3-687b-491a-a3d2-5808a02942c9
bob@dylan:~$
bob@dylan:~$ cat /tmp/files_manager/2a1f4fc3-687b-491a-a3d2-5808a02942c9 
Hello Webstack!
bob@dylan:~$
bob@dylan:~$ curl -XPOST 0.0.0.0:5000/files -H "X-Token: f21fb953-16f9-46ed-8d9c-84c6450ec80f" -H "Content-Type: application/json" -d '{ "name": "images", "type": "folder" }' ; echo ""
{"id":"5f1e881cc7ba06511e683b23","userId":"5f1e7cda04a394508232559d","name":"images","type":"folder","isPublic":false,"parentId":0}
bob@dylan:~$
bob@dylan:~$ cat image_upload.py
import base64
import requests
import sys

file_path = sys.argv[1]
file_name = file_path.split('/')[-1]

file_encoded = None
with open(file_path, "rb") as image_file:
    file_encoded = base64.b64encode(image_file.read()).decode('utf-8')

r_json = { 'name': file_name, 'type': 'image', 'isPublic': True, 'data': file_encoded, 'parentId': sys.argv[3] }
r_headers = { 'X-Token': sys.argv[2] }

r = requests.post("http://0.0.0.0:5000/files", json=r_json, headers=r_headers)
print(r.json())

bob@dylan:~$
bob@dylan:~$ python image_upload.py image.png f21fb953-16f9-46ed-8d9c-84c6450ec80f 5f1e881cc7ba06511e683b23
{'id': '5f1e8896c7ba06511e683b25', 'userId': '5f1e7cda04a394508232559d', 'name': 'image.png', 'type': 'image', 'isPublic': True, 'parentId': '5f1e881cc7ba06511e683b23'}
bob@dylan:~$
bob@dylan:~$ echo 'db.files.find()' | mongo files_manager
{ "_id" : ObjectId("5f1e881cc7ba06511e683b23"), "userId" : ObjectId("5f1e7cda04a394508232559d"), "name" : "images", "type" : "folder", "parentId" : "0" }
{ "_id" : ObjectId("5f1e879ec7ba06511e683b22"), "userId" : ObjectId("5f1e7cda04a394508232559d"), "name" : "myText.txt", "type" : "file", "parentId" : "0", "isPublic" : false, "localPath" : "/tmp/files_manager/2a1f4fc3-687b-491a-a3d2-5808a02942c9" }
{ "_id" : ObjectId("5f1e8896c7ba06511e683b25"), "userId" : ObjectId("5f1e7cda04a394508232559d"), "name" : "image.png", "type" : "image", "parentId" : ObjectId("5f1e881cc7ba06511e683b23"), "isPublic" : true, "localPath" : "/tmp/files_manager/51997b88-5c42-42c2-901e-e7f4e71bdc47" }
bob@dylan:~$
bob@dylan:~$ ls /tmp/files_manager/
2a1f4fc3-687b-491a-a3d2-5808a02942c9   51997b88-5c42-42c2-901e-e7f4e71bdc47
bob@dylan:~$
```

**Repo:**

- GitHub repository: `alx-files_manager`
- File: `utils/, routes/index.js, controllers/FilesController.js`
   
#### 6. Get and list file

In the file `routes/index.js`, add 2 new endpoints:

- `GET /files/:id` => `FilesController.getShow`
- `GET /files` => `FilesController.getIndex`

In the file `controllers/FilesController.js`, add the 2 new endpoints:

`GET /files/:id` should retrieve the file document based on the ID:

- Retrieve the user based on the token:
	- If not found, return an error `Unauthorized` with a status code 401
- If no file document is linked to the user and the ID passed as parameter, return an error `Not found` with a status code 404
- Otherwise, return the file document

`GET /files` should retrieve all users file documents for a specific `parentId` and with pagination:

- Retrieve the user based on the token:
	- If not found, return an error `Unauthorized` with a status code 401
- Based on the query parameters `parentId` and `page`, return the list of file document
	- `parentId`:
		- No validation of `parentId` needed - if the `parentId` is not linked to any user folder, returns an empty list
		- By default, `parentId` is equal to 0 = the root
	- Pagination:
		- Each page should be 20 items max
		- `page` query parameter starts at 0 for the first page. If equals to 1, it means it’s the second page (form the 20th to the 40th), etc…
		- Pagination can be done directly by the `aggregate` of MongoDB

```js
bob@dylan:~$ curl 0.0.0.0:5000/connect -H "Authorization: Basic Ym9iQGR5bGFuLmNvbTp0b3RvMTIzNCE=" ; echo ""
{"token":"f21fb953-16f9-46ed-8d9c-84c6450ec80f"}
bob@dylan:~$ 
bob@dylan:~$ curl -XGET 0.0.0.0:5000/files -H "X-Token: f21fb953-16f9-46ed-8d9c-84c6450ec80f" ; echo ""
[{"id":"5f1e879ec7ba06511e683b22","userId":"5f1e7cda04a394508232559d","name":"myText.txt","type":"file","isPublic":false,"parentId":0},{"id":"5f1e881cc7ba06511e683b23","userId":"5f1e7cda04a394508232559d","name":"images","type":"folder","isPublic":false,"parentId":0},{"id":"5f1e8896c7ba06511e683b25","userId":"5f1e7cda04a394508232559d","name":"image.png","type":"image","isPublic":true,"parentId":"5f1e881cc7ba06511e683b23"}]
bob@dylan:~$
bob@dylan:~$ curl -XGET 0.0.0.0:5000/files?parentId=5f1e881cc7ba06511e683b23 -H "X-Token: f21fb953-16f9-46ed-8d9c-84c6450ec80f" ; echo ""
[{"id":"5f1e8896c7ba06511e683b25","userId":"5f1e7cda04a394508232559d","name":"image.png","type":"image","isPublic":true,"parentId":"5f1e881cc7ba06511e683b23"}]
bob@dylan:~$
bob@dylan:~$ curl -XGET 0.0.0.0:5000/files/5f1e8896c7ba06511e683b25 -H "X-Token: f21fb953-16f9-46ed-8d9c-84c6450ec80f" ; echo ""
{"id":"5f1e8896c7ba06511e683b25","userId":"5f1e7cda04a394508232559d","name":"image.png","type":"image","isPublic":true,"parentId":"5f1e881cc7ba06511e683b23"}
bob@dylan:~$
```

**Repo:**

- GitHub repository: `alx-files_manager`
- File: `utils/, routes/index.js, controllers/FilesController.js`
   
#### 7. File publish/unpublish

In the file `routes/index.js`, add 2 new endpoints:

- `PUT /files/:id/publish` => `FilesController.putPublish`
- `PUT /files/:id/publish` => `FilesController.putUnpublish`

In the file `controllers/FilesController.js`, add the 2 new endpoints:

`PUT /files/:id/publish` should set `isPublic` to `true` on the file document based on the ID:

- Retrieve the user based on the token:
	- If not found, return an error `Unauthorized` with a status code 401
- If no file document is linked to the user and the ID passed as parameter, return an error `Not found` with a status code 404
- Otherwise:
	- Update the value of `isPublic` to `true`
	- And return the file document with a status code 200

`PUT /files/:id/unpublish` should set `isPublic` to `false` on the file document based on the ID:

- Retrieve the user based on the token:
If not found, return an error `Unauthorized` with a status code 401
- If no file document is linked to the user and the ID passed as parameter, return an error `Not found` with a status code 404
- Otherwise:
	- Update the value of `isPublic` to `false`
	- And return the file document with a status code 200

```js
bob@dylan:~$ curl 0.0.0.0:5000/connect -H "Authorization: Basic Ym9iQGR5bGFuLmNvbTp0b3RvMTIzNCE=" ; echo ""
{"token":"f21fb953-16f9-46ed-8d9c-84c6450ec80f"}
bob@dylan:~$ 
bob@dylan:~$ curl -XGET 0.0.0.0:5000/files/5f1e8896c7ba06511e683b25 -H "X-Token: f21fb953-16f9-46ed-8d9c-84c6450ec80f" ; echo ""
{"id":"5f1e8896c7ba06511e683b25","userId":"5f1e7cda04a394508232559d","name":"image.png","type":"image","isPublic":false,"parentId":"5f1e881cc7ba06511e683b23"}
bob@dylan:~$
bob@dylan:~$ curl -XPUT 0.0.0.0:5000/files/5f1e8896c7ba06511e683b25/publish -H "X-Token: f21fb953-16f9-46ed-8d9c-84c6450ec80f" ; echo ""
{"id":"5f1e8896c7ba06511e683b25","userId":"5f1e7cda04a394508232559d","name":"image.png","type":"image","isPublic":true,"parentId":"5f1e881cc7ba06511e683b23"}
bob@dylan:~$ 
bob@dylan:~$ curl -XPUT 0.0.0.0:5000/files/5f1e8896c7ba06511e683b25/unpublish -H "X-Token: f21fb953-16f9-46ed-8d9c-84c6450ec80f" ; echo ""
{"id":"5f1e8896c7ba06511e683b25","userId":"5f1e7cda04a394508232559d","name":"image.png","type":"image","isPublic":false,"parentId":"5f1e881cc7ba06511e683b23"}
bob@dylan:~$ 
```

**Repo:**

- GitHub repository: `alx-files_manager`
- File: `utils/, routes/index.js, controllers/FilesController.js`
   
#### 8. File data

In the file `routes/index.js`, add one new endpoint:

- `GET /files/:id/data` => `FilesController.getFile`

In the file `controllers/FilesController.js`, add the new endpoint:

`GET /files/:id/data` should return the content of the file document based on the ID:

- If no file document is linked to the ID passed as parameter, return an error `Not found` with a status code 404
- If the file document (folder or file) is not public (`isPublic: false`) and no user authenticate or not the owner of the file, return an error `Not found` with a status code 404
- If the type of the file document is `folder`, return an error `A folder doesn't have content` with a status code 400
- If the file is not locally present, return an error `Not found` with a status code 404
- Otherwise:
	- By using the module `mime-types`, get the [MIME-type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) based on the `name` of the file
	- Return the content of the file with the correct MIME-type

```js
bob@dylan:~$ curl 0.0.0.0:5000/connect -H "Authorization: Basic Ym9iQGR5bGFuLmNvbTp0b3RvMTIzNCE=" ; echo ""
{"token":"f21fb953-16f9-46ed-8d9c-84c6450ec80f"}
bob@dylan:~$ 
bob@dylan:~$ curl -XPUT 0.0.0.0:5000/files/5f1e879ec7ba06511e683b22/unpublish -H "X-Token: f21fb953-16f9-46ed-8d9c-84c6450ec80f" ; echo ""
{"id":"5f1e879ec7ba06511e683b22","userId":"5f1e7cda04a394508232559d","name":"myText.txt","type":"file","isPublic":false,"parentId":0}
bob@dylan:~$ 
bob@dylan:~$ curl -XGET 0.0.0.0:5000/files/5f1e879ec7ba06511e683b22/data -H "X-Token: f21fb953-16f9-46ed-8d9c-84c6450ec80f" ; echo ""
Hello Webstack!

bob@dylan:~$ curl -XGET 0.0.0.0:5000/files/5f1e879ec7ba06511e683b22/data ; echo ""
{"error":"Not found"}
bob@dylan:~$ 
bob@dylan:~$ curl -XPUT 0.0.0.0:5000/files/5f1e879ec7ba06511e683b22/publish -H "X-Token: f21fb953-16f9-46ed-8d9c-84c6450ec80f" ; echo ""
{"id":"5f1e879ec7ba06511e683b22","userId":"5f1e7cda04a394508232559d","name":"myText.txt","type":"file","isPublic":true,"parentId":0}
bob@dylan:~$ 
bob@dylan:~$ curl -XGET 0.0.0.0:5000/files/5f1e879ec7ba06511e683b22/data ; echo ""
Hello Webstack!

bob@dylan:~$
```

**Repo:**

- GitHub repository: `alx-files_manager`
- File: `utils/, routes/index.js, controllers/FilesController.js`
  
#### 9. Image Thumbnails

Update the endpoint `POST /files` endpoint to start a background processing for generating thumbnails for a file of type `image`:

- Create a `Bull` queue `fileQueue`
- When a new image is stored (in local and in DB), add a job to this queue with the `userId` and `fileId`

Create a file `worker.js`:

- By using the module Bull, create a queue fileQueue
- Process this queue:
	- If `fileId` is not present in the job, raise an error `Missing fileId`
	- If `userId` is not present in the job, raise an error `Missing userId`
	- If no document is found in DB based on the `fileId` and `userId`, raise an error `File not found`
	- By using the module `image-thumbnail`, generate 3 thumbnails with `width` = 500, 250 and 100 - store each result on the same location of the original file by appending `_<width size>`

Update the endpoint `GET /files/:id/data` to accept a query parameter `size`:

- `size` can be ``500, `250` or `100`
- Based on `size`, return the correct local file
- If the local file doesn’t exist, return an error `Not found` with a status code 404

**Terminal 3:** (start the worker)

```js
bob@dylan:~$ npm run start-worker
...
```

**Terminal 2:**

```js
bob@dylan:~$ curl 0.0.0.0:5000/connect -H "Authorization: Basic Ym9iQGR5bGFuLmNvbTp0b3RvMTIzNCE=" ; echo ""
{"token":"f21fb953-16f9-46ed-8d9c-84c6450ec80f"}
bob@dylan:~$ 
bob@dylan:~$ python image_upload.py image.png f21fb953-16f9-46ed-8d9c-84c6450ec80f 5f1e881cc7ba06511e683b23
{'id': '5f1e8896c7ba06511e683b25', 'userId': '5f1e7cda04a394508232559d', 'name': 'image.png', 'type': 'image', 'isPublic': True, 'parentId': '5f1e881cc7ba06511e683b23'}
bob@dylan:~$ ls /tmp/files_manager/
2a1f4fc3-687b-491a-a3d2-5808a02942c9   51997b88-5c42-42c2-901e-e7f4e71bdc47   6dc53397-8491-4b7c-8273-f748b1a031cb   6dc53397-8491-4b7c-8273-f748b1a031cb_100   6dc53397-8491-4b7c-8273-f748b1a031cb_250    6dc53397-8491-4b7c-8273-f748b1a031cb_500
bob@dylan:~$ 
bob@dylan:~$ curl -XGET 0.0.0.0:5000/files/5f1e8896c7ba06511e683b25/data -so new_image.png ; file new_image.png
new_image.png: PNG image data, 471 x 512, 8-bit/color RGBA, non-interlaced
bob@dylan:~$ 
bob@dylan:~$ curl -XGET 0.0.0.0:5000/files/5f1e8896c7ba06511e683b25/data?size=100 -so new_image.png ; file new_image.png
new_image.png: PNG image data, 100 x 109, 8-bit/color RGBA, non-interlaced
bob@dylan:~$ 
bob@dylan:~$ curl -XGET 0.0.0.0:5000/files/5f1e8896c7ba06511e683b25/data?size=250 -so new_image.png ; file new_image.png
new_image.png: PNG image data, 250 x 272, 8-bit/color RGBA, non-interlaced
bob@dylan:~$
```

**Repo:**

- GitHub repository: `alx-files_manager`
- File: `utils/, controllers/FilesController.js, worker.js`
 
#### 10. Tests!

Of course, a strong and stable project can not be good without tests.

Create tests for `redisClient` and `dbClient`.

Create tests for each endpoints:

- `GET /status`
- `GET /stats`
- `POST /users`
- `GET /connect`
- `GET /disconnect`
- `GET /users/me`
- `POST /files`
- `GET /files/:id`
- `GET /files` (don’t forget the pagination)
- `PUT /files/:id/publish`
- `PUT /files/:id/unpublish`
- `GET /files/:id/data`

**Repo:**

- GitHub repository: `alx-files_manager`
- File: `tests/`
 
#### 11. New user - welcome email

Update the endpoint `POST /users` endpoint to start a background processing for sending a “Welcome email” to the user:

- Create a `Bull` queue `userQueue`
- When a new user is stored (in DB), add a job to this queue with the `userId`

Update the file `worker.js`:

- By using the module `Bull`, create a queue `userQueue`
- Process this queue:
	- If `userId` is not present in the job, raise an error `Missing userId`
	- If no document is found in DB based on the `userId`, raise an error `User not found`
	- Print in the console `Welcome <email>!`

In real life, you can use a third party service like [Mailgun](https://www.mailgun.com/) to send real email. These API are slow, (sending via SMTP is worst!) and sending emails via a background job is important to optimize API endpoint.

**Repo:**

- GitHub repository: `alx-files_manager`
- File: `utils/, worker.js, controllers/UsersController.js`

---

## 📂 File Structure

```
📁 alx-files_manager/
├── 📄 babel.config.js
├── 📄 CODE_OF_CONDUCT.md
├── 📄 CONTRIBUTING.md
├── 📁 controllers/
│ ├── 📄 AppController.js
│ ├── 📄 AuthController.js
│ ├── 📄 FilesController.js
│ └── 📄 UsersController.js
├── 📄 header.md
├── 📁 libs/
│ ├── 📄 boot.js
│ └── 📄 middlewares.js
├── 📄 LICENSE
├── 📁 middlewares/
│ ├── 📄 auth.js
│ └── 📄 error.js
├── 📄 mocha.opts
├── 📄 package.json
├── 📄 README.md
├── 📁 routes/
│ └── 📄 index.js
├── 📄 server.js
├── 📁 tests/
│ ├── 📁 controllers/
│ │ ├── 📄 AppController.test.js
│ │ ├── 📄 AuthController.test.js
│ │ ├── 📄 FilesController.test.js
│ │ └── 📄 UsersController.test.js
│ ├── 📄 init.test.js
│ └── 📁 utils/
│ ├── 📄 db.test.js
│ └── 📄 redis.test.js
├── 📁 utils/
│ ├── 📄 auth.js
│ ├── 📄 db.js
│ ├── 📄 env_loader.js
│ ├── 📄 mailer.js
│ └── 📄 redis.js
├── 📄 worker.js
├── 🌍 .env
├── 🌍 .env.test
├── 📝 .eslintrc.js
└── 🗑️ .gitignore
```

In this representation:
- **📁** represents directories (folders).
- **📄** represents files.
- **🌍** represents environment files.
- **📝** represents the ESLint configuration file.
- **🗑️** represents the `.gitignore` file.

## ⚙️ Installation

1. **Fork this repository:** Click the Fork button located in the top-right corner of this page to fork the repository.

2. **Clone the repository:**
    ```bash
    git clone https://github.com/deezyfg/alx-files_manager.git
    ```

3. **Navigate to the project directory:**
    ```bash
    cd alx-files_manager
    ```

4. **Install dependencies:**
    ```bash
    npm install
    ```

5. **Set up environment variables:**
   Create a `.env` file in the root directory and configure it with the following variables:

### 🌍 Environment Variables 

The required environment variables should be stored in a file named `.env` and each line should have the format `Name=Value`. The table below lists the environment variables that will be used by this server:

| Name                | Required                                                                                | Description                                                               |
|                   :-|                                                                                       :-|                                                                         :-|
| GOOGLE_MAIL_SENDER  | Yes                                                                                     | The email address of the account responsible for sending emails to users. |
| PORT                | No (Default: `5000`)                                                                    | The port the server should listen at.                                     |
| DB_HOST             | No (Default: `localhost`)                                                               | The database host.                                                        |
| DB_PORT             | No (Default: `27017`)                                                                   | The database port.                                                        |
| DB_DATABASE         | No (Default: `files_manager`)                                                           | The database name.                                                        |
| FOLDER_PATH         | No (Default: `/tmp/files_manager` (Linux, Mac OS X) & `%TEMP%/files_manager` (Windows)) | The local folder where files are saved.                                   |

`.env`

<details>
  <summary>Click to show/hide file contents</summary>

``` bash
# Required
GOOGLE_MAIL_SENDER=your_email@gmail.com  # Replace with your actual email address

# Optional (defaults provided)
PORT=5000
DB_HOST=localhost
DB_PORT=27017
DB_DATABASE=files_manager

# File storage path (OS-dependent)
# Instructions:
# 1. Uncomment the line for your operating system.
# 2. Comment out the line for the operating system you're not using.
# 3. Modify the path if needed.

# For Linux and Mac OS X (default):
FOLDER_PATH=/tmp/files_manager

# For Windows (uncomment and use this line instead for Windows systems):
# FOLDER_PATH=%TEMP%/files_manager
```
</details>

Adjust these values as needed for your setup.

6. **Create Google API:**

- A **Google API** should be created with at least an email sending scope and a valid redirect URL.
- Ensure one of the valid redirect URIs is `http://localhost:5000/`.
- Store the `credentials.json` file (provided when you create the API) in the root directory of this project.

## 🚀 Usage

### Step 1: Start Redis and MongoDB Services:

Ensure that both Redis and MongoDB services are running on your system. You can start them using the following commands:

1. **For Redis:**
    ```bash
    sudo service redis-server start
    ```

2. **For MongoDB:**
    ```bash
sudo service mongodb start
    ```

### Step 2: Check if Services Are Running:

You can verify if the services are running by checking their status:

1. **For Redis:**
    ```bash
    sudo service redis-server status
    ```

2. For MongoDB:
    ```bash
    sudo service mongodb status
    ```

- **Note:** If Redis and MongoDB are not installed, you will need to install them first.Follow the official installation guides:
          - [Redis](https://redis.io/docs/getting-started/installation/install-redis-on-linux/)
          - [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

### Step 3: Start the Server and Worker

After the Redis and MongoDB servers are running, start the server and worker to handle incoming requests, process tasks, and manage the application's core functionality. This two-component setup allows for efficient distribution of workload and improved performance.

1. **To start the server:**
    ```bash
    npm run start-server
    ```

- This command initiates the main application server, which handles HTTP requests, manages API endpoints, and coordinates communication between clients and the backend services.

2. **To start the worker (in a separate terminal):**
    ```bash
    npm run start-worker
    ```

- The worker process runs independently from the main server and is responsible for executing background tasks, processing queued jobs, and handling resource-intensive operations to keep the main server responsive.

Once both the server and worker are running, your application will be fully operational. The server will be ready to accept incoming connections and process requests, while the worker will manage background tasks and data processing operations. This separation of concerns allows for better scalability and resource management in your application architecture.

**Note:** This project is a backend service. There's no frontend to access via a web browser unless you create one separately.

## Accessing the Application
The server will be running on the **`PORT`** specified in the environment variables (`.env`), with the default being `5000`, and the **`DB_HOST`** defaulting to `localhost`.

### Server URL
The server will be running on:
    ```bash
http://localhost:<PORT>/
    ```
If the `PORT` environment variable is not set, the default will be:
    ```bash
http://localhost:5000/
    ```

This means the server will run on `localhost` at the specified port, which defaults to `5000` unless overridden in the environment variables (`.env`).

**Note**
- Make sure to replace `<PORT>` with the actual port number if you've set a custom PORT in your `.env` file.
- If you've changed the `DB_HOST`, ensure your client is configured to connect to the correct host address.

## 🧪 Tests

### Setting Up the Test Environment

1. Create a separate `.env` file for the tests named `.env.test` and store the value of the environment variables for the testing event in it.

`.env.test`

<details>
  <summary>Click to show/hide file contents</summary>

```
# Environment variables for testing purposes

# Required
GOOGLE_MAIL_SENDER=test_email@example.com

# Optional (defaults provided)
PORT=5001
DB_HOST=localhost
DB_PORT=27017
DB_DATABASE=files_manager_test

# File storage path (OS-dependent)
# Choose the appropriate line for your OS:

# For Linux and Mac OS X (default):
FOLDER_PATH=/tmp/files_manager_test

# For Windows (uncomment this line and comment out the above if on Windows):
# FOLDER_PATH=%TEMP%/files_manager_test
```

</details>

2. Specify different `DB_DATABASE` and `FOLDER_PATH` values when running test
to avoid data loss in the main database and folder. Check out [test](tests/) folder
for unit tests.

3. Before running tests, ensure that your server and worker are not running on the default port (5000). If they are, either stop them or set a different port in your .env.test file to avoid conflicts.

**Note:** If you're using the default port (5000) for your main application, make sure to set a different port in your `.env.test` file to prevent conflicts during testing. For example:
```
PORT=5001
```

This will ensure that your tests run on a separate port, avoiding any interference with your main application if it's running simultaneously.

### Running Tests
1. To execute the E2E (End-to-End) tests, run:
    ```bash
    npm run test
    ```

This command runs:
```bash
./node_modules/.bin/mocha --opts mocha.opts tests/**/*.js
```

2. Run tests with coverage:
    ```bash
    npm run test-with-coverage
    ```

This command runs:
```bash
nyc --reporter=text --reporter=json-summary ./node_modules/.bin/mocha --opts mocha.opts tests/**/*.js
```

3. Run tests, generate a coverage report, and send it to Coveralls:
    ```bash
    npm run coveralls
    ```

This command runs the tests, generates a coverage report, and sends it to Coveralls for tracking your project's code coverage over time.

After the tests and coverage report are generated, run the following command to generate coverage badges in your `README.md` file:
    ```bash
    npm run make-badges
    ```

**Note:** Your `README.md` file must contain placeholder comments for the badges. The `istanbul-badges-readme` package looks for specific comments to insert the badges. You have two alternatives for badge placeholders:

* **Option 1: Using HTML comments (Recommended)**

```text
## Coverage Badges
<!-- coverage:badge -->
<!-- coverage:lines -->
<!-- coverage:branches -->
<!-- coverage:functions -->
<!-- coverage:statements -->
```

This method is preferred for tools like `istanbul-badges-readme` that directly modify your `README.md` file. These tools typically look for specific comments like `<!-- coverage:badge -->` and replace them with the actual badge markdown.


* **Option 2: Using shield.io URLs**

```text
## Coverage Badges
![Coverage](https://img.shields.io/badge/coverage-0%25-red.svg?style=flat)
![Statements](https://img.shields.io/badge/statements-0%25-red.svg?style=flat)
![Branches](https://img.shields.io/badge/branches-0%25-red.svg?style=flat)
![Functions](https://img.shields.io/badge/functions-0%25-red.svg?style=flat)
![Lines](https://img.shields.io/badge/lines-0%25-red.svg?style=flat)
```

This method uses static URLs that need to be updated manually or through a script that modifies these URLs based on your coverage results. Initially, all badges will show `0%` coverage. After running your tests and executing the `make-badges` script, these placeholders will be updated with your actual coverage percentages and appropriate colors based on the coverage levels.

## 📚 Documentation

This project uses [apidoc](https://www.npmjs.com/package/apidoc) to generate API documentation. The configuration for apidoc is already set up in the `package.json` file.

### Generating Documentation

To generate the API documentation, follow these steps:

1. Ensure you have apidoc installed globally or as a dev dependency in your project.
If not, you can install it using:

```bash
npm install -g apidoc
# or as a dev dependency
npm install --save-dev apidoc
```

2. Run the following command in your project root:

* **Using npx:**
```bash
npx apidoc -i ./ -o docs/
```

This command uses` npx` to run the locally installed `apidoc` package. It will generate the documentation based on the configuration in your `package.json` file, using the current directory as the input (`-i ./`) and outputting the results to a `docs/` folder (`-o docs/`).

* **Using a custom npm script:**
```bash
npm run generate-docs
```

This command will work if you add a custom script to your `package.json` file. You would need to add something like this to your "scripts" section:
```json
"scripts": {
  "generate-docs": "apidoc -i ./ -o docs/"
}
```

This will generate the documentation in a `docs` folder (or whatever output directory you've specified in your apidoc configuration), containing HTML files that you can open in a web browser to view your API documentation.

### Viewing Documentation

After generating the documentation:
1. Navigate to the output directory (e.g., `docs`).
2. Open the `index.html` file in a web browser.

### Custom Introduction

The documentation includes a custom introduction, which is sourced from the `header.md` file as specified in the configuration.

### Updating Documentation

To update the documentation:
1. Add or modify apidoc comments in your source code.
2. Re-generate the documentation by running one of the following commands in your project root:

* **Using npx:**
```bash
npx apidoc -i ./ -o docs/
```

* **Using a custom npm script** (if you've added it to your `package.json`):
```bash
npm run generate-docs
```

3. The updated documentation will be generated in the `docs/` folder (or the output directory you specified).
4. Open the `index.html` file in the output directory with a web browser to view your updated API documentation.

**Important Notes:**
- Keep your API documentation up-to-date as you make changes to your endpoints or add new features.
- Ensure that your apiDoc comments accurately reflect the current state of your API.
- If you add new files or change file locations, make sure to update the input directory (`-i`) in your generation command if necessary.

For more information on how to write apidoc comments and customize your documentation, visit the [apidoc website](https://www.npmjs.com/package/apidoc).

## 🤝 Contribute

We welcome contributions to make **alx-files_manager** even better! Whether you're reporting a bug, suggesting a new feature, or fixing a typo, your input is valuable. Follow the [contribution guidelines](CONTRIBUTING.md) to get started.

## 🌟 Support the Project

If you find this helpful or valuable, please consider 🌟 starring the repository. It helps gain visibility and encourages further development. Your support is greatly appreciated!

## 🧾 License

This project is licensed under the [MIT License](LICENSE).

## ✍️ About Developer

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <img src="https://github.com/deezyfg.png" width="120px;" alt="Peter Opoku-Mensah"/>
        <br />
        <b>Peter Opoku-Mensah</b>
      </td>
    </tr>
    <tr>
        <td align="center">
            <a href="https://github.com/deezyfg">
            <img src="https://img.shields.io/badge/GitHub-100000.svg?style=for-the-badge&logo=github&logoColor=white"/>
        </a>
        <br/>
        <a href="https://www.linkedin.com/in/opokumensahpeter">
            <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"/>
        </a>
        </td>
    </tr>
  </tbody>
</table>
