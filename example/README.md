# Pluggy SDK Examples

The following project underlines the key features of Pluggy API and how to use them with the SDK developed for Javascript/HTML.

## Installation

From the root of this project you can just `npm install` the dependencies and run any example you want.

Examples review each flow and outputs the different steps made, this is meant as a basic example to understand how to use each method.

## Examples

Before running the examples please setup the `.env` file using the provided credentials by Pluggy. An example is provided as `.env.example` for you to use.

### Authentication

In the authentication example we validate the credentials with the API.

Initiating the SDK with a backend-generated API Key (`PLUGGY_API_KEY` env var), this will recover a connect token that serves as an api key, which is valid for a short term (30 minutes).

You can run this example to verify that you have correctly configured your env file, using the script `npm run example:auth`.

### Main Flow

There is a main example created to review the full process of connecting an account and retrieving its information.

You can run this example use the script `npm start`.

## Documentation
For most up-to-date and accurate documentation, please see our [API Reference](https://docs.pluggy.ai) page.
