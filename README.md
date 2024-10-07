# Asgardeo + Next.js authentication with auth.js 

This is a sample project that demonstrates how to integrate Asgardeo with a Next.js application using the auth.js library.
Each step in the guide is corresponding to the folders in the project.

## Prerequisites
1. Node.js
2. npm
3. An Asgardeo account

## Run the project
1. Go to each folder in the project
```bash
cd step-1
```

2. Create a `.env.local` file in the root of the project and add the following environment variables
```bash
AUTH_SECRET="" # Added by `npx auth`. Read more: https://cli.authjs.dev
AUTH_ASGARDEO_ID=""
AUTH_ASGARDEO_SECRET=""
AUTH_ASGARDEO_ISSUER="https://api.asgardeo.io/t/{org_name}/oauth2/token"
NEXT_PUBLIC_AUTH_ASGARDEO_LOGOUT_URL="https://api.asgardeo.io/t/{org_name}/oidc/logout"
NEXT_PUBLIC_AUTH_ASGARDEO_POST_LOGOUT_REDIRECT_URL="http://localhost:3000/auth/sign-out"
NEXT_PUBLIC_AUTH_ASGARDEO_ME_ENDPOINT="https://api.asgardeo.io/t/{org_name}/scim2/Me"
```

3. Install dependencies
```bash
npm install
```

4. Run the project
```bash
npm run dev
```
