# Gym Class Scheduling and Membership Management System

## Project Overview
This is a backend system for managing gym operations, including class scheduling, trainer management, and trainee bookings. It uses TypeScript, Express.js, Prisma, PostgreSQL, and JWT for authentication. The system supports three roles: Admin, Trainer, and Trainee, with specific permissions.

## Relational Diagram
- ... ... ...

## Technology Stack
- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT

## Database Schema
- **User**: `id`, `email`, `password`, `role`, `name`, `createdAt`, `updatedAt`
- **Schedule**: `id`, `date`, `startTime`, `endTime`, `trainerId`, `createdAt`, `updatedAt`
- **Booking**: `id`, `scheduleId`, `traineeId`, `createdAt`, `updatedAt`

## API Endpoints
### Auth
- **POST /api/auth/register**: Register a user
- **POST /api/auth/login**: Login a user
### Users
- **POST /api/users/trainers**: Create a trainer (Admin only)
### Schedules
- **POST /api/schedules**: Create a schedule (Admin only)
- **GET /api/schedules/trainer**: Get trainer schedules (Trainer only)
### Bookings
- **POST /api/bookings**: Book a class (Trainee only)
- **DELETE /api/bookings/:bookingId**: Cancel a booking (Trainee only)

## Admin Credentials
- Email: admin@gmail.com
- Password: admin123

## Instructions to Run Locally
1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Set up environment variables in `.env` (see `.env` section above)
4. Generate Prisma client: `npm run prisma:generate`
5. Run migrations: `npm run prisma:migrate`
6. Start the server: `npm run dev`
``` 
## .env

DATABASE_URL="postgresql://postgres:<password>@localhost:5432/dbname"
JWT_SECRET= your_secret

```

## Live Hosting Link
[Live URL](#)

## Postman Documentation
[Postman Collection](#)

## Testing Instructions
1. Use admin credentials to log in (`POST /api/auth/login`).
2. Create trainers (`POST /api/users/trainers`).
3. Create schedules (`POST /api/schedules`).
4. Log in as a trainee and book a class (`POST /api/bookings`).