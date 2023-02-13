# Express App
## Environment Variables
```
NODE_ENV="production"
MONGO_DB_USER="<MONGO_DB_USER>"
MONGO_DB_PASSWORD="<MONGO_DB_PASSWORD>"
MONGO_DB_CLUSTER="<MONGO_DB_CLUSTER>"
MONGO_URL="<MONGO_URL>"
SERVER_PORT="8080"
MONGO_URL_LOCAL="<MONGO_URL_LOCAL>"
JWT_SECRET= "<JWT_SECRET>"
```

## Endpoints
#### Create User
This endpoint creates a new user.

Route: /createUser
Method: POST
Body:
username (string, required)
password (string, required)

### Login
This endpoint logs in an existing user.

Route: /login
Method: POST
Body:
username (string, required)
password (string, required)


## Database
This app requires a MongoDB database.

## Middleware
This app uses JWT for authentication, but it does not have any protected routes at the moment.

## CORS Configuration
The CORS configuration is set up for development purposes only.