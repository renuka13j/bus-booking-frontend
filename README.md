# TravelEase — Bus Ticket Booking Platform (Frontend)

A full-stack bus ticket booking platform built with React, featuring live seat selection, JWT-based authentication, and a responsive dark-themed UI.

**Live Demo:** https://renuka-travelease.vercel.app
**Backend Repo:** https://github.com/renuka13j/bus-booking-backend

## Features

- User authentication (signup/login) with JWT, persisted across sessions
- Search buses by source, destination, and date (case-insensitive)
- Interactive seat map with live availability
- Race-condition-safe seat booking (backed by atomic MongoDB operations)
- Booking history with cancellation support
- Admin panel to manage operators, routes, and trips
- Fully responsive design with animated transitions and loading skeletons

## Tech Stack

- **React** (Vite) — UI framework
- **React Router** — client-side routing
- **Tailwind CSS** — styling
- **Axios** — API communication
- **Context API** — auth state management
- **react-icons** — iconography


## Getting Started Locally

```bash
git clone https://github.com/renuka13j/bus-booking-frontend.git
cd bus-booking-frontend
npm install
```

Create a `.env` file: VITE_API_BASE_URL

Run the dev server:
```bash
npm run dev
```

> Note: requires the [backend](https://github.com/renuka13j/bus-booking-backend) running locally, or point `VITE_API_BASE_URL` to the deployed backend.

## Related

- [Backend repository](https://github.com/renuka13j/bus-booking-backend) — Node.js/Express API, MongoDB schemas, authentication logic