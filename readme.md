# SODSC

| Method | Path | Location | Purpose|
| ---- | --------------- | ------------------------ | -------------------------------- |
| GET | / | index.js | Home Page |
| GET | /profile | controllers/profile.js | User Profile Page |
| GET | /profile/admin | controllers/profile.js | Admin dashboard page |
| GET | /auth/login | controllers/auth.js | Renders Login Form |
| POST | /auth/login | controllers/auth.js | Handles Login Auth |
| GET | /auth/signup | controllers/auth.js | Renders Signup Form |
| POST | /auth/signup | controllers/auth.js | Handles New Signup Form |
| GET | /auth/logout | controllers/auth.js | Removes User Session Data |

Additional Routes from `with-facebook` branch if using oAuth:

| GET | /auth/facebook | controllers/auth.js | Outgoing Request to Facebook |
| GET | /auth/callback/facebook | controllers/auth.js | Incoming Data from Facebook |

Additional Routes

