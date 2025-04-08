# TechAssessment-IOWA

# Project

This application enables university employees to submit receipts for reimbursement. The solution is split into a frontend built with Angular (using standalone components and Tailwind CSS) and a backend developed with Spring Boot and MySQL. The application ensures that the receipt date is not in the future and that the reimbursement amount is greater than 0.

This document provides step-by-step instructions to install, run, and troubleshoot the project.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 12 or above is recommended). [Download Node.js](https://nodejs.org/)

- **Java**: Ensure you have Node.js installed (version 17 or above is recommended). 

- IDE used - For this project Visual studio code is utilized to develop the frontend and IntelliJ idea to design the backend.

## Cloning the Repository

If you haven't cloned the repository yet, use the following commands:

```bash
git clone https://github.com/arpitjain1122/TechAssessment-IOWA.git
```

## Installation And Running the Frontend

1. Open your terminal and navigate to the frontend folder(receipt-frontend):

2. Install the project dependencies using npm:

   - **With npm:**

     ```bash
     npm install
     ```

2. Then install tailwind using the below command: 
   { Refer to documentation (optional)- https://tailwindcss.com/docs/installation/framework-guides/angular}
 
     ```bash
     npm install tailwindcss @tailwindcss/postcss postcss --force
     ```

4. Running the Frontend Application

    Once the dependencies are installed, start the frontend development server with:

    ```bash
    ng serve
    ```

    This command will launch the application to [http://localhost:4200] in your browser.


## MySQL Database Setup

  1. Install MySQL
  - Ensure that MySQL is installed on your machine.
  - You can download MySQL from [the official MySQL downloads page](https://dev.mysql.com/downloads/) and follow the installation instructions for your operating system.

  2. Launch Mysql and create a database by the name receiptsdb. 

  3. Go to receipt-backend folder and open application.properties file. Here you have to enter your mySQL database name and password in the specified brackets.

## Installation And Running the Backend

  1. Navigate to the receipt-backend and open it in Intellij Idea/ Eclipse.

  2. Go to the src -> main -> resources -> application.properties. Here you have to enter your mySQL database name and password in the specified brackets.

  3. Then go to ReceiptSubmissionApplication class under src/main/java and run the project.

  4. This project runs on the port 9020 as specified in application.properties

