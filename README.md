# Viajando API

Rest API to handle backend calls and some small business logic.

# Endpoints

endpoints works using de versioning (actually we only have v1) and the prefix of controller sectioned for the zone that will affect.

[users] 

* GET "/" - Requires a password and email to validate, returns basic (not sensitive) user data with an access_token. requires:
      - email: string
      - password: string
* POST "/" - Used for registering users, requires:
      - city: string
      - location: string
      - name: string
      - lastname: string
      - email: string
      - password: string
      it also will create some other stuffs that the user will need in future like flags, timestamps, etc.
