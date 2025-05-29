
# Trouble shooting
Locally:
When the front jsut says upgrade required it means you have multiple termina instances running the same server, jsut quit all of them then start a new one. 
 n the cloud, make sure that on vercel you are running on the prod version not one of the deployments

npm run dev

# PDP - Product Display Page



## Development Setup

1. Clone the repository
2. Install dependencies:
```sh
npm install
```

3. Create a `.env` file based on `.env.example`:
```sh
cp .env.example .env
```

4. Update the `.env` file with your Strapi credentials:
- `VITE_STRAPI_URL`: Your Strapi instance URL
- `VITE_STRAPI_TOKEN`: Your Strapi API token

5. Start the development server:
```sh
npm run dev
```

## Building for Production

```sh
npm run build
```

## Deployment

This project is configured for deployment on Vercel. The deployment process is automatic when you push to the main branch.

### Environment Variables

Make sure to set these environment variables in your Vercel project settings:
- `VITE_STRAPI_URL`
- `VITE_STRAPI_TOKEN`

## Project Structure

- `src/components/`: Vue components
- `src/stores/`: Pinia stores for state management
- `src/utils/`: Utility functions
- `src/config.js`: Configuration and environment variables

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```