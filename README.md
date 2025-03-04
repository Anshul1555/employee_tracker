# Employee Tracker

## Description

The **Employee Tracker** is a command-line application built with Node.js, Inquirer, and PostgreSQL, designed to manage a company's employee database. It allows users to view and manage departments, roles, and employees within an organization. The application supports CRUD operations and allows business owners to better organize and plan their business by interacting with the database through a user-friendly CLI interface.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)

## Installation

To install and run this application, follow these steps:

- Clone the repository:

  `git clone https://github.com/Anshul1555/employee-tracker.git`

- Navigate into the project directory:
  `cd employee-tracker`

- Install the required dependencies:
  `npm install`

- Set up the PostgreSQL database and import the schema (see the schema.sql file included in the project).

- Set up the database connection in the db/connection.js file with your PostgreSQL credentials.

- Start the application:
  `node src/index.js`

## Usage

Once the application is started, you will be presented with the following options:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee's role
- Choose an option by selecting the corresponding number. The application will interact with the PostgreSQL database and display the results in a formatted table.

## Features

View Departments: Display all departments in the company.
View Roles: Display all roles, including their titles, salaries, and associated departments.
View Employees: Display employee details, including first name, last name, job title, department, salary, and manager.
Add Departments, Roles, Employees: Add new departments, roles, and employees to the database.
Update Employee Role: Update an employee's role and associated information.
Walkthrough Video

To see a demonstration of the application in action, watch the walkthrough video:

Walkthrough Video Link

<!-- Uploading "Screen Recording 2025-03-04 at 12.04.14 AM.mov"... -->
