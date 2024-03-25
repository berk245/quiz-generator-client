# Qgen Frontend

## Description
Qgen Frontend is the user interface component of Qgen, a full-stack web application designed to automatically generate quiz questions from teaching materials using Large Language Models (LLMs). This repository contains the codebase for the frontend interface, built using React and TypeScript and Material UI components.

## Demo
For a live demonstration of Qgen, visit [Qgen Demo](https://qgen-llm.web.app).

## Components Diagram
![Frontend Component Diagram](https://github.com/berk245/quiz-generator-client/assets/32645610/d1beeede-52a1-4345-a590-3ddcaa496669)

## Installation
To set up the Qgen Frontend locally, follow these steps:
1. Clone this repository:
   ```bash
   git clone https://github.com/berk245/quiz-generator-client.git
   ```
3. Navigate to the project directory:
   ```bash
   cd qgen-frontend
   ```
5. Install dependencies:
   ```
   bash npm install
   ```
7. Create a .env file and set REACT_APP_SERVER_URL with the local server URL or https://api.qgen.live.
8. Start the development server:
   ```bash
   npm start
   ```
10. Open your browser and go to `http://localhost:3000` to view the application.

This project uses a MySQL database to store and retrieve data. In order to run the project locally, make sure to setup a local database. 
For required database models and configurations, please refer to the [Qgen Backend repository](https://github.com/berk245/quiz-generator-server).

## Testing
Qgen Frontend uses Cypress for end to end testing. To run the test suite, use the command `npx cypress open`.


## License
This project is licensed under the [MIT License](LICENSE).

## Additional Information
For more information about Qgen and its backend, please refer to the [Qgen Backend repository](https://github.com/berk245/quiz-generator-server).
