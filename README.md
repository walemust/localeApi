# Locale API

Locale API is a web service that provides developers with information about Nigeria's regions, states, and local government areas (LGAs). It allows developers to search for specific information and retrieve metadata associated with each region or state. This document provides a comprehensive guide on how to use the API, including authentication and authorization, search functionality, and general APIs for retrieving information.

## Table of Contents

- Libraries and Tools
- Authentication and Authorization
- Search
- General APIs
- Usage
- API Endpoints
- Response Format
- Error Handling
- Rate Limiting
- Some Examples
- Documentation

## Tools and Libraries

- [Express](https://expressjs.com/): A fast and minimalist web application framework for Node.js that provides a robust set of features for building web applications and APIs.

[express-rate-limiter](https://www.npmjs.com/package/express-rate-limiter): An Express middleware for rate limiting HTTP requests based on various criteria such as IP address, user agent, or route.

[cross-env](https://www.npmjs.com/package/cross-env): A command-line tool that sets environment variables for cross-platform compatibility. It allows you to define environment variables in a way that works across Windows, Linux, and macOS.

[cors](https://www.npmjs.com/package/cors): A middleware for Express that enables Cross-Origin Resource Sharing (CORS). It allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated.

[mongoose](https://mongoosejs.com/): An object modeling tool for MongoDB and Node.js that provides a simple and flexible way to interact with MongoDB databases. It allows you to define schemas, models, and perform database operations using an intuitive API.

[redis](https://redis.io/): An open-source, in-memory data structure store that can be used as a cache, message broker, or database. Redis is often used as a caching layer in web applications to improve performance.

[uuid](https://www.npmjs.com/package/uuid): A library for generating universally unique identifiers (UUIDs). UUIDs are commonly used as unique identifiers for resources in distributed systems.

[body-parser](https://www.npmjs.com/package/body-parser): A middleware for Express that parses incoming request bodies in JSON, URL-encoded, or multipart format and exposes them on the req.body property.

[Jest](https://jestjs.io/): A JavaScript testing framework that provides a simple and intuitive way to write unit tests for your code. It offers features like test runners, assertions, mocking, and code coverage reporting.

[supertest](https://www.npmjs.com/package/supertest): A library that provides a high-level abstraction for testing HTTP servers. It allows you to send HTTP requests and make assertions on the responses, making it easier to write integration tests for your Express application.

[mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server): A library that provides an in-memory MongoDB server for testing purposes. It allows you to spin up a MongoDB instance in memory during tests, eliminating the need for a separate MongoDB server for testing.

## Authentication and Authorization

To access the Locale API, developers must authenticate their requests using an API key. The API key serves as a unique identifier for each developer and is generated `ONLY` upon signing up. Each developer can only retrieve their API key once, so it is crucial to securely store and protect it.

To include the API key in the request, developers should include it as a header:

```javascript
    Authorization: Bearer <API_KEY>
```

If the API key is missing or invalid, the API will return a `400 (Bad request)` or `401 (Unauthorized)` error respectively.

## Search

Locale API provides a search functionality that allows developers to find information about Nigeria based on the following categories: region, state, and local government area (LGA). Developers can search for regions with their associated states, states with their associated LGAs, or directly retrieve information about a specific LGA.

## General APIs

Locale API provides general APIs for developers to retrieve information about all regions, states, and More.

- Get all Data

```javascript
GET / api / v1 / search;
```

This API endpoint returns a list of all data in Nigeria which includes Regions, States, LGAs, and their metadata.

- Get all regions

```javascript
GET / api / v1 / search / regions;
```

This API endpoint returns a list of all regions in Nigeria.

- Get all states

```javascript
GET / api / v1 / search / states;
```

This API endpoint returns a list of all states in Nigeria.

- Get all states Grouped by their regions

```javascript
GET / api / v1 / search / region - states;
```

This API endpoint returns lists of all states Grouped by their Region in Nigeria.

- Get all LGAs Grouped by their states

```javascript
GET / api / v1 / search / state - lgas;
```

This API endpoint returns lists of all LGAs Grouped by their States in Nigeria.

- Get all states and ther MetaData

```javascript
GET / api / v1 / search / state - lgas;
```

This API endpoint returns lists of all states with more in-dept data about them.

- Get A region

```javascript
GET / api / v1 / search / regions / { regionName };
```

This API endpoint accepts a path parameter for the `name of a region` and returns more in-dept data about that region.

- Get A state

```javascript
GET / api / v1 / search / states / { stateName };
```

This API endpoint accpets a path parameter for the `name of a state` and returns more in-dept data about that state.

## Usage

To use the Locale API, developers need to send HTTP requests to the appropriate endpoints using the desired HTTP client. The API supports standard HTTP methods such as `GET`.

## API Endpoints

The Locale API provides the following endpoints:

- Authentication and Authorization
  - `POST /api/v1/auth/register`: Sign up as a new developer and generate an API key.
- Genral APIs
  - `GET /api/v1/search` : Retrieves all data in Nigeria.
  - `GET /api/v1/search/regions` : Retrieves a list of all regions in Nigeria.
  - `GET /api/v1/search/states` : Retrieves a list of all states in Nigeria.
  - `GET /api/v1/search/region-states` : Retrieves a list of all states grouped by regions in Nigeria.
  - `GET /api/v1/search/state-lgas` : Retrieves a list of all LGAs grouped by states in Nigeria.
  - `GET /api/v1/search/state-data` : Retrieves a list of all states with more details about Them in Nigeria.
  - `GET /api/v1/search/regions/{regionName}` : Retrieves details about a selected Region in Nigeria.
  - `GET /api/v1/search/states/{stateName}` : Retrieves details about a selected state in Nigeria.

## Response Format

The Locale API returns responses in JSON format. The response contains the requested data or an appropriate error message.

## Error Handling

In case of an error, the Locale API will return the appropriate HTTP status code along with an error message in the response body. Common error codes include:

- 400 Bad Request: The request is malformed or missing required parameters or Api Key.
- 401 Unauthorized: The API key is invalid.
- 404 Not Found: The requested resource was not found.
- 500 Internal Server Error: An unexpected error occurred on the server.

## Rate Limiting

To ensure fair usage and prevent abuse, the Locale API implements rate limiting. Each developer is allowed a certain number of requests per minute.

Some Examples
Here are some examples demonstrating the usage of the Locale API:

Sign up as a new developer:

```javascript
POST / api / v1 / auth / register;
```

#### Request body

```json
{
  "username": "John Wich",
  "email": "john.wich@movies.com",
  "password": "!@#$%^"
}
```

#### Response:

```json
{
  "success": true,
  "message": "Registration completed!!!, Make sure you keep your API KEY Safe!",
  "user": {
    "id": "xxxxxxxxxxxxxxxxxxxxxxxx",
    "username": "john wich",
    "email": "john.wich@movies.com",
    "apiKey": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  }
}
```

- Get all regions

```javascript
GET / api / v1 / search / regions;
```

#### Response:

```json
[
  "South West",
  "North Central",
  "North East",
  "South East",
  "North West",
  "South South"
]
```

`Please note that these examples assume a successful request and may not include all possible fields in the response.`

## Documentation

To further Understand the API, Click [here](https://nigeria-locale-api.onrender.com/) to access the live link to the documentation.

- [Swagger](https://swagger.io/resources/articles/documenting-apis-with-swagger/) was used for documentation.

## Contact

If you have any questions, suggestions, or feedback, please feel free to contact Me:

Name: Mustapha Olawale Babatunde
Email: walemust28@gmail.com
GitHub: https://github.com/walemust
