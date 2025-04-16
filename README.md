# Firebase Next.js App Hosting Sample

This open-source project demonstrates how to host a [Next.js](https://nextjs.org/) application on [Firebase App Hosting](https://firebase.google.com/docs/hosting/app-hosting). It includes integrated Firebase Authentication and a demonstration of secure cookie-based session management between the Next.js frontend and backend.

## Features

- **Firebase App Hosting**: Deploy and serve a Next.js app using Firebase's App Hosting platform.
- **Firebase Authentication**: Secure user authentication using Firebase Auth.
- **Cookie-based Auth**: Demonstrates how to securely set, verify, and clear authentication cookies between the Next.js frontend and backend APIs.
- **API Protection**: Protect backend API endpoints using Firebase ID tokens and middleware.
- **Environment Configuration**: Uses environment variables and Firebase secrets for secure configuration.

## Project Structure

- **/firebase-nextjs-apphosting-sample**: Next.js frontend app, hosted on Firebase App Hosting.
- **/firebase-api-sample**: Firebase Functions backend, provides protected API endpoints and authentication logic.

## How It Works

1. **User Authentication**: Users sign in via the Next.js frontend using Firebase Auth.
2. **Cookie Setting**: On successful login, the frontend exchanges the Firebase ID token for a signed cookie (JWT) via an API route.
3. **Session Validation**: Middleware on both frontend and backend validates the cookie/JWT for protected routes and API calls.
4. **API Access**: Authenticated requests from the frontend to backend APIs include the signed cookie for authorization.

## Getting Started

1. **Clone the repository**
2. **Configure Firebase**: Set up Firebase projects and update environment variables in `.env.local` and `apphosting.yaml`.
3. **Local Development**:

   - Run the Next.js app locally:

     ```bash
     cd firebase-nextjs-apphosting-sample
     npm install
     npm run dev
     ```

   - Use Firebase emulators for backend functions:

     ```bash
     cd ../firebase-api-sample
     npm install
     firebase emulators:start
     ```

4. **Deploy**:

   - Deploy the backend:

     ```bash
     cd firebase-api-sample
     firebase deploy --only functions
     ```

   - Deploy the frontend with Firebase App Hosting:

     ```bash
     cd ../firebase-nextjs-apphosting-sample
     firebase apphosting:deploy
     ```

## Basic Commands

- **Set Firebase Project**

  ```bash
  gcloud config set project <your-firebase-project-id>
  ```

- **Authenticate Service Account (for local dev)**

  ```bash
  export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
  gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
  ```

- **Grant App Hosting Secret Access**

  ```bash
  firebase apphosting:secrets:grantaccess -b <BACKEND_NAME> GCP_CREDENTIALS_JSON
  firebase apphosting:secrets:grantaccess -b <BACKEND_NAME> JOSE_JWT_SECRET
  firebase apphosting:secrets:grantaccess -b <BACKEND_NAME> NEXT_PUBLIC_FIREBASE_BACKEND_URL
  ```

See `/docs/commands.md` for more details and setup tips.

## References

- [Firebase App Hosting Documentation](https://firebase.google.com/docs/hosting/app-hosting)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

---

This project is intended for demonstration and educational purposes.
