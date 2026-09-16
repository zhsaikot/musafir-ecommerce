# musafir-ecommerce

## Netlify deployment

The frontend is configured for Netlify in `netlify.toml`.

1. Import this repository into Netlify.
2. Set the environment variable `VITE_API_URL` to the public URL of the Express API, including `/api`.
3. Deploy. Netlify will run the client build and publish `client/dist`.

The API must be deployed separately because it is an Express server. Keep its database and service credentials in the server host's environment variables, not in Git.