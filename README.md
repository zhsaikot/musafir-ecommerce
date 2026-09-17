# musafir-ecommerce

## Netlify deployment

The frontend is configured for Netlify in `netlify.toml`.

1. Import this repository into Netlify.
2. Set the environment variable `VITE_API_URL` to the public URL of the Express API, including `/api`.
3. Deploy. Netlify will run the client build and publish `client/dist`.

The API must be deployed separately because it is an Express server. Keep its database and service credentials in the server host's environment variables, not in Git.

## Admin login

The admin login is available at `/admin/login`. New registrations are regular customer accounts by design. To create or promote the admin account, copy `server/.env.example` to `server/.env`, fill in the MongoDB and admin values, then run:

```bash
cd server
npm run create-admin
```

Alternatively, from the `server` directory run `npm run setup-admin` and answer the local prompts. This writes the ignored `server/.env` file for you.

Start the API with `npm run dev` in `server`, and start the storefront with `npm run dev` in `client`. The client uses `VITE_API_URL` when provided, otherwise it connects to `http://localhost:5000/api`.