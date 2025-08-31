### VAPI - Onboarding

## How to run the app

Running the app is as simple as running `docker-compose up --build`. After running the app, you can access it in the following ways:

* The app's frontend will be available at [http://localhost:5173/](http://localhost:5173/)

* The app's backend will be available at [http://localhost:3000/](http://localhost:3000/)


## Tech stack

In this section I will explain what is the tech stack that was chosen for this project and why did I choose it.

### Frontend 

- Library - react: required by the assignment
- Language - typescript - helps to code cleaner code (add other typescript adventages over javascript)
- Build thing (bundler) - Vite - good - fast compilation and hot reloading (add other advantages)

### Backend

- Nodejs - required
- sequelize - simple and quick way to make sql queris, also prevent sql injections (add more advantages)
- typescript - as mentioned above

### Database

- postgress - reletional db and quick and scalebale

### Email scheduler

This part of the project opens a job to send emails every 24 hours.

> Note: The best practice for this is with a serverless function (with AWS for example)

## VAPI setup:

Go to vapi and set up a user

to setup the webhooks:
under Organization Settings : set server url to the direct path. for example "https://your-server-url/calls/webhook"
the route '/calls/webhook' in your server will get message and updates from VAPI calls