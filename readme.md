# Node/Express/PostgreSQL Boilerplate

THIS IS A BARE-BONES NODE/EXPRESS app with basic user authentication and authorization.  It has a local auth on the master branch and additionally a facebook auth on the with fb branch.  This boilerplate exists so I don't need to create a new project form scratch every time I need a project with working auth.

## What it includes

* Sequelize is set up for PostgreSQL
* Sequelize model and migration(s) for user
* Passport, Express-Session, and Flash modules
* Error/Success message alerts
* BCrypt for hashing passwords


### User Schema

| Column | Data Type | Description |
| -------------- | -------------- | -------------------------------------------- |
| id | Integer | Primary Key |
| firstname | String | Required field |
| lastname | String | - |
| email | String | usernameField for login |
| password | String | Hashed with BCrypt before creation of new row |
| birthdate	| date | Might want to use moment module for formatting |
| admin | Boolean | Set default value to false |
| image | text | A URL to an image of the user - required field |
| bio | text | - |

Additional fields from `with-facebook`

| Column | Data Type | Description |
| -------------- | -------------- | -------------------------------------------- |
| facebookId | String | Facebook Profile Id|
| facebookToken | String | Facebook login token |



This is the default schema provided.  Add additional migrations as needed for more data


## Default Routes Table

By default, the following routes are provided

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

## Steps to Use

#### 1. Close this repository, but with a different name

In your terminal:
```
git clone <repo_link> <new_name>
```

#### 2. Decided what the new project needs

*Part A: Decide if using Facebook*

If you do not need the facebook auth, then use the `master` branch.  Otherwise switch to the `with-facebook` branch with this command:

```
git checkout with-facebook
```

> Note: If using Facebook, you will need to set up an app on developers.facebook.com

**Part B: remove stuff not being used**

For example if you don't intend to have admins on the new project, remove `middleware/adminLoggedIn.js` and the routes/views for the admin dashboard

In your terminal:
```
npm install
```


#### 3. Install node modules from package.json
In your terminal:
```
npm install
```
> Tip: `npm i` can be used as a shortcut

#### 4. Restructure Git Remotes

Basically, this is git's version of updating the address book.
* First, remove the "old" remote.
	* `git remote remove origin`
* Then go to the github and create a new, empty repository
* Copy the new repository link
* Set up a new remote pointing to the new repository
	* `git remote add origin <new_repo_link>`

#### 5. Make a new .env file

At minimum the following is needed:
```
SESSION_SECRET = 'THIS IS A STRING FOR THE SESSION TO USE'
```
Optional others, including facebook specific ones:
```
PORT = 3000
FB_APP_ID = '123456678901234567890'
FB_APP_SECRET = '1234567890abcdef1234456787'
BASE_URL='http://localhost:3000'
```


#### 6. Customize with the new project's name
* Title in `Layout.ejs`
* Logo and links in `nav.ejs`
* The name, description, and repo fields in `package.json`
* Replace this readme.md content witih your own

#### 7. Create a new database for the new project

```
createdb <new_database_name>
```

#### 8. Set up Sequelize

First, update the development settings in teh `config/config.json` file.

```
{
  "development": {
    "database": "<new_database_name>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

(Optional) If additional fields on the user table are needed, follow directions [here](#adding-migrations) to create additional migrations.

Then, do the Sequelize migrations with this command:
```
sequelize db:migrate
```

#### 9. Run the server locally and ensure that it works

If you have `modemon` installed globally, run `nodemon` as a command in the root folder.

Otherwise, run `node index.js`.

Unless specified otherwise, the port in use will be 3000.

### 10. Commit and push to your new project
> Note: We switched the origin remote to point to the new project on step 4.  Make sure that this is done properly by checking the command `git remote -v` to check the remote locations.

```
git add -A
git commit -m "initial commit"
git push origin master
```

#### 11. Next Steps

Assuming that the set-up steps went smoothly, now you can add new models/migration, new controllers and routes, etc., and just generally start developing as if you had started from scratch.

## Notes on Optional Steps


#### Adding Migrations

This is an example of adding an `age` field to the user table

* Create a migration file via command line
	* `sequelize migration:create --name add-age`
* The up and down functions of the migration
	* Refer to other migations for how this looks
	* The part to add looks like: `return queryInterface.addColumn('users', 'age', Sequelize.INTEGER)`
	* Add the column into the user model
		* `user.js` - located in the models folder


### Facebook App Set Up
> Note: A Facebook login is required
* Go to developers.facebook.com
* Create a new app
* Add a platform: webiste
* Add a product: Facebook login
	*Set a Valid OAuth Redirect URL to `https://yoursite.com/auth/callback/facebook`
* Copy the App Id and App Secret to the `.env` file

## Usage

TBD - Directions on how to use this boilerplate code in a future project
