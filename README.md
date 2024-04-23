# API-REST-NodeJS
Basic example for a backend api with JWT validation and middleware.
Simple Auth managment

# Depedencies

    * @hapi/joi
    To valid inputs for http
    * bcryptjs
    Encrypt credencials
    * body-parser
    Parse http request
    * cors
    CORS header validations
    * sentry
    Manage log error with sentry
    * dotenv
    Use env file to manage enviroment values
    * express
    Http managment
    * jsonwebtoken
    Generate token with JWT
    * Axios
    Http client to request 

# Structure
    * config
    File to get env values
    * models
    Models of data tables or collections of data
    * routes
    Split validation routes
    * utils
    Middleware for validation and different files utils