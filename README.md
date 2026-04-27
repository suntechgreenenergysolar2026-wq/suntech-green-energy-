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

## Google Reviews Setup

The website can already display Google reviews together with your manual testimonials. To import your old Google reviews and keep future reviews updated automatically, connect the Google Business Profile API:

1. Request access to the Google Business Profile APIs and enable the required APIs in Google Cloud.
2. Get your verified location name in the format `accounts/{accountId}/locations/{locationId}`.
3. Create OAuth credentials, generate a refresh token, and add these values in `.env`:

```env
GOOGLE_BUSINESS_PROFILE_LOCATION_NAME=
GOOGLE_BUSINESS_PROFILE_CLIENT_ID=
GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET=
GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN=
```

4. Restart the backend.
5. Run the helper command below to confirm your OAuth credentials work and to list the exact `accounts/{accountId}/locations/{locationId}` value to paste into `.env`:

```bash
npm run google:reviews:setup
```

6. Open `http://localhost:8080/admin`, go to `Testimonials CMS`, and click `Sync Google Reviews Now`.

The `googleReviewUrl` setting in the admin is only the public Google link used by the `View on Google` button. It does not import reviews by itself.

Why this uses Business Profile instead of the Google search page:

- Business Profile can return all reviews for a verified location.
- Places API only returns up to 5 reviews.
- Using the official API is the reliable way to keep new reviews showing on your website.

## Routes

- Frontend: `http://localhost:8080/` or whatever port Vite is started on
- Admin: `http://localhost:8080/admin`
- API: `http://localhost:4000`

## Notes

- Existing seeded projects and testimonials are preserved and loaded into the new backend
- Public pages fall back to built-in content if the backend is unavailable
- Uploaded files are served from `/uploads`
