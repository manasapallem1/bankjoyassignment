# Bankjoy Automation Framework

## Overview
This project automates API testing for the Bank Joy using Cypress. It includes test cases for validating various endpoints, schema validation, and error handling.

## Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Cypress (installed as a dependency)

## Installation
Clone the repository and install dependencies:
sh
git clone <repository_url>
cd bankjoy-api-automation-framework
npm install


## Running Tests
### Run tests in different environments:
sh
npm run test:staging    # Runs tests in the staging environment
npm run test:production # Runs tests in the production environment
npm run test:run        # Runs tests with the default environment


## Generating Reports
### Merge reports:
sh
npm run report:merge


### Generate HTML report:
sh
npm run report:generate


## Cypress Configuration
Cypress is configured using cypress.config.js. The baseUrl is set dynamically based on the environment variable test_env. Default is set to production.

## Folder Structure

./cypress
 ├── e2e           # API test cases
 ├── fixtures      # JSON test data
 ├── reports       # Test reports
 ├── support       # Custom commands and utilities
 ├── cypress.config.js # Cypress configuration


## Dependencies
- Cypress
- Mochawesome (for reports)
- Axios (for API requests)

## Author
Manasa Pallem
