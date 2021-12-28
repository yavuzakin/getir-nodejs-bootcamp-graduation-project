# Case Study

* Code is written in Node.js using Express framework.
* Endpoint handles only HTTP POST requests.
* Application is deployed to Heroku.
* Layered architecture is implemented.
* Error handling is implemented.
* Logging is implemented. (src/logs/..)
* Test is applied.

## Installation 

Use the package manager [npm](https://www.npmjs.com/) to install project.

```bash
  git clone https://github.com/yavuzakin/getir-nodejs-bootcamp-graduation-project.git

  cd getir-nodejs-bootcamp-graduation-project

  npm install
```

## Run

Use the package manager [npm](https://www.npmjs.com/) to run project.

```bash
  npm start
```

## Test

Use the package manager [npm](https://www.npmjs.com/) to test project.

```
  npm test
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URL`, `PORT`

## API Reference

#### Fetch filtered records

```
  POST /api/v1/records
```

| Description                                      | Required Body Fields                           |
| :----------------------------------------------- | :--------------------------------------------- |
| Returns records filtered by required body fields | `startDate`, `endDate`, `minCount`, `maxCount` |

| Body Fields | Description                          |
| :---------- | :----------------------------------- |
| `startDate` | YYYY-MM-DD format. The earliest date |
| `endDate`   | YYYY-MM-DD format. The latest date   |
| `minCount`  | Number. The minimum value            |
| `maxCount`  | Number. The maximum value            |

## Public URL

https://yavuzakin-getir-task.herokuapp.com

## Technologies Used

**Server:** Node, Express

**Client:** Postman