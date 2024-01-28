# ModaResa Appointment Management System

This is a simple web application for managing appointments with clients. It consists of a ExpressJs back-end with TypeScript and an SQLite database, and a ReactJS front-end also written in TypeScript. The application allows users to manage staff members, clients, and appointments.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#run-application)
- [Backend](#backend)
  - [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
  - [Routes](#routes)
- [Demonstration](#demonstration)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (https://nodejs.org/)
- npm (comes with Node.js)
- Docker (optional, for Docker usage)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/modaresa-appointment-system.git
cd modaresa-appointment-system
```

2. Install dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Running the Application

To run the back-end:

```bash
cd backend
npm start
```

The API will be accessible at http://localhost:3001.

### Back-end

To run the front-end:

```bash
cd frontend
npm start
```

The front-end will be accessible at http://localhost:3000.

## Backend

### Appointments API

- **Get all Appointments:**

  - `GET /api/appointment/`
  - Retrieve a list of all appointments.

- **Create an Appointment:**

  - `POST /api/appointment/`
  - Create a new appointment. Provide the necessary data in the request body.

- **Update an Appointment:**

  - `PUT /api/appointment/:id`
  - Update an existing appointment identified by `:id`. Provide the updated data in the request body.

- **Delete an Appointment:**
  - `DELETE /api/appointment/:id`
  - Delete an appointment identified by `:id`.

### Clients API

- **Get all Clients:**

  - `GET /api/client/`
  - Retrieve a list of all clients.

- **Create a Client:**

  - `POST /api/client/`
  - Create a new client. Provide the necessary data in the request body.

- **Update a Client:**

  - `PUT /api/client/:id`
  - Update an existing client identified by `:id`. Provide the updated data in the request body.

- **Delete a Client:**
  - `DELETE /api/client/:id`
  - Delete a client identified by `:id`.

### Staff API

- **Get all Staff Members:**

  - `GET /api/staff/`
  - Retrieve a list of all staff members.

- **Create a Staff Member:**

  - `POST /api/staff/`
  - Create a new staff member. Provide the necessary data in the request body.

- **Update a Staff Member:**

  - `PUT /api/staff/:id`
  - Update an existing staff member identified by `:id`. Provide the updated data in the request body.

- **Delete a Staff Member:**
  - `DELETE /api/staff/:id`
  - Delete a staff member identified by `:id`.

## Frontend

### Staff Table

- **Staff:**
  - Path: `/staff`
  - Element: `<StaffTable />`
  - Description: Displays a table of staff members.

### Client List

- **Clients:**
  - Path: `/clients`
  - Element: `<ClientList />`
  - Description: Shows a list of clients.

### Appointments Calendar

- **Appointments:**
  - Path: `/appointments`
  - Element: `<EventCalendar />`
  - Description: Renders the event calendar for appointments.

## Demonstration

<video src="demonstration.mp4" controls title="Title"></video>
