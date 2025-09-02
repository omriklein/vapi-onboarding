# VAPI - Onboarding App

## Overview

This project implements an **onboarding flow for new customers using VAPI**.  
The app guides users through a **3-step journey**:  

1. **Sign Up** – User provides personal and service details.  
2. **Agent Setup** – User chooses an agent name and greeting message.  
3. **Confirmation** – Success page showing the agent’s phone number from VAPI.  

At the end of the onboarding flow, the system:  
- Creates a **new VAPI agent (assistant)** via the VAPI API.  
- Persists the **new customer record** (with related agent) in the database.  
- Listens for **call events** via VAPI webhooks and stores them in a `calls` table.  
- Sends a **daily email summary** of new signups to a specified email (e.g. `adi@choopil.com`).  

The goal was to keep the solution **simple, scalable, and resilient**, while ensuring it meets the assignment requirements.

---

## How to Run the App

The entire system runs inside Docker.  

`bash
docker-compose up --build
`

After running the app, you can access it at:

- **Frontend:** [http://localhost:5173/](http://localhost:5173/)  
- **Backend:** [http://localhost:3000/](http://localhost:3000/)  

---

## Tech Stack and Design Decisions

### Frontend

- **React** – required by the assignment.  
- **TypeScript** – adds static typing, catches errors at compile time, and makes the codebase more maintainable. It also improves developer experience with autocompletion and type safety.  
- **Vite** – chosen as the bundler instead of Webpack. It provides:  
  - Very fast compilation.  
  - Hot module reloading for smoother developer workflow.  
  - Simpler configuration for modern React + TypeScript apps.  
- **Routing** – implemented with React Router for scalability, allowing us to easily add more routes or flows later.  
- **UX decisions**:  
  - A stepper shows progress through the flow.  
  - Input validation is included.  
  - Errors are displayed clearly.  
  - **Future TODO**: verify uniqueness of email/phone before proceeding.  

---

### Backend

- **Node.js + Express** – lightweight, widely used, and integrates well with Sequelize.  
- **TypeScript** – same reasons as frontend: type safety, cleaner code, fewer runtime errors.  
- **Sequelize ORM** – chosen for:  
  - Simplified database queries and migrations.  
  - Protection against SQL injection.  
  - Clear model definitions for scalability.  

---

### Database

- **Postgres** – a robust, scalable, relational database.  
- **Schema Design**:  
  - `users` table: stores customer information (name, email, phone, service).  
  - `agents` table: stores agent details (name, greeting). Each agent is connected to a user. This allows for **one-to-many** relationships (a user can have multiple agents in the future).  
  - `calls` table: persists call data received from VAPI (date, duration, transcription, summary, linked agent).  
- **Migrations** – handled with Sequelize CLI. The `migrate` service in Docker ensures the DB schema is up to date on startup.  

---

### Email Scheduler

- Runs as a separate service inside Docker.  
- Uses **Nodemailer** to send daily summary emails to a specified email (e.g. `adi@choopil.com`).  
- Job runs every 24 hour (this interval can be customized using an environment variable).  
- **Note**: In production, a serverless cron job (e.g., AWS Lambda) would be more cost-efficient and reliable.  

---

### VAPI Integration

- On **agent creation**, the backend calls the VAPI API to create a new assistant with the chosen name and greeting.  
- On **call events**, VAPI sends webhooks to `/calls/webhook`, which the backend processes and stores in the `calls` table.  

Webhook setup in VAPI:  
- Navigate to **Organization Settings** in VAPI.  
- Set the server URL to your backend endpoint, e.g. `https://your-server-url/calls/webhook`.  

---

## Architecture

The app is split into four main services (defined in `docker-compose.yml`):

- **frontend** – React + Vite app.  
- **backend** – Express server with Sequelize and VAPI integration.  
- **email-scheduler** – Cron-like job for sending daily email summaries.  
- **db** – Postgres database.  

Additionally, a **migrate** service runs Sequelize migrations on startup.

---

## Resilience & Error Handling

- **Frontend**:  
  - Field validation with user-friendly error messages.  
  - Stepper-based navigation prevents skipping required steps.  
- **Backend**:  
  - Error handling for failed DB queries and VAPI requests.  
  - Webhook routes validate incoming requests before processing.  
- **Database**:  
  - Clear schema with foreign keys to maintain data consistency.  
- **Email Scheduler**:  
  - If email sending fails, it is logged, and the job retries on the next interval.  

---

## Future Improvements

- **Validation**: Add uniqueness checks for email/phone before onboarding completes.  
- **Monitoring**:  
  - Track API response times and error rates.  
  - Add logs and metrics.  
  - Set up alerts for failed email jobs or webhook processing errors.  
- **Scalability**:  
  - Deploy scheduler as a serverless function instead of a container.  
  - Support multiple agents per user in the frontend UI.  
- **Testing**:  
  - Add unit tests for backend services.  
  - Add integration tests for onboarding flow.  

---

## Evaluation Notes

This project demonstrates:  
- **Completeness** – the onboarding flow meets all requirements (user signup, agent creation, persistence, webhook handling, daily email).  
- **Resilience** – errors are handled gracefully in both frontend and backend.  
- **Code Quality** – organized into separate services with migrations, clear schema, and modular design.  
- **Reasoning** – design decisions (TypeScript, Postgres, Sequelize, multi-service structure) are chosen for scalability and reliability.  
- **Initiative** – included webhook-based call tracking and email scheduler as independent services, with clear notes on how they could be improved in production.  