# SUNTECH GREEN ENERGY SOLAR Website

This project now includes:

- The original Vite/React marketing website
- A new `Express + MySQL` backend
- Lead form submission and newsletter storage
- Admin login and dashboard at `/admin`
- CMS-style management for projects, testimonials, and site settings
- File uploads for project images and brochures
- Analytics event tracking
- Optional email, Twilio SMS/WhatsApp, and CRM webhook integrations

## Quick Setup

1. Copy `.env.example` to `.env`
2. Update `DATABASE_URL` to your MySQL credentials and keep the database name as `suntek`
3. Start the backend:

```bash
npm run server
```

4. Start the frontend:

```bash
npm run dev
```

## Example Database URL

```env
DATABASE_URL=mysql://root:your_mysql_password@localhost:3306/suntek
```

If the configured MySQL user has permission, the backend will auto-create the `suntek` database and required tables on startup.

## Admin Login

Default seeded admin credentials:

- Email: `admin@suntek.local`
- Password: `ChangeMe123!`

Change these in `.env` before using the project beyond local development.

## Routes

- Frontend: `http://localhost:8080/` or whatever port Vite is started on
- Admin: `http://localhost:8080/admin`
- API: `http://localhost:4000`

## Notes

- Existing seeded projects and testimonials are preserved and loaded into the new backend
- Public pages fall back to built-in content if the backend is unavailable
- Uploaded files are served from `/uploads`
