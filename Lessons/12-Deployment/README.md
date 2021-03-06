# Deployment

## Agenda

1. Learning Objectives (5 minutes)
1. Activity: Deploy to Heroku! (45 minutes)
1. BREAK (10 minutes)
1. Project Work Time (50 minutes)

## Learning Objectives (5 minutes)

By the end of this class, you should be able to:

1. Push your project to production using Heroku
1. Progress on your final project

## Activity: Deploy to Heroku! (45 minutes)

#### Set Up GitHub Repository

If you haven't yet, set up your GitHub repository:

```bash
git init
git add .
git commit -m'Initial commit'
```

Make sure you create a file `.gitignore` and give it the following contents:

```
node_modules/
.env
```

If your `node_modules` folder was already added to your GitHub repository, make sure you remove it by running the following:

```bash
git rm -r node_modules
```

#### Create Procfile

In the root directory of your project, create a file called `Procfile` with the following contents:

```
web: node src/app.js
```

You may also need to add to your "scripts" in `package.json`:

```
"scripts": {
  "start": "node src/app.js"
}
```

#### Push to Heroku

Create a Heroku app:

```
$ heroku create MY_APP_NAME_HERE
```

Add, commit, and push your files to GitHub as you normally would. Then, push to Heroku:

```
$ git push heroku master
$ heroku open
```

Take a look at the logs with:

```
$ heroku logs --tail
```


#### Add a Production Database

Run the following to add the `mLabs` addon to your project:

```
$ heroku addons:create mongolab:sandbox
```

Then, add the following to your `server.js` file:

```js
const mongoose = require('mongoose')
const mongo_uri = process.env.MONGODB_URI
mongoose.connect(mongo_uri)
```

Make sure you have a key-value pair in your `.env` file for the `MONGODB_URI` environment variable (you may need to rename it if using starter code).

Also, make sure you are using the `PORT` environment variable in your server:

```js
const port = process.env.PORT
app.listen(port)
```

If you are using any other environment variables that will need to be defined on Heroku, such as the JWT secret key, you can set them as follows:

```
heroku config:set SECRET=myverysecretpassword
```

Add, commit, and push your files to Heroku, then run:

```
$ heroku open
```

If you still have errors, take a look at the logs and see if you can debug!

Woohoo! You're done!


## BREAK (10 minutes)

## Surveys (15 minutes)

Take some time to fill out the [class feedback survey](make.sc/bew_1.3_survey). We truly value your feedback so make sure to tell us of any suggestions, things you liked, didn't like, etc!

## Project Work Time (50 minutes)

Continue to work on your final project. Submit by Friday, 5pm PST using [this submission link](https://forms.gle/9zF9LaawdEMyutgs7).

## Wrap-Up

Fill out our [Vibe Check form](https://make.sc/bew1.3-vibe-check) with any feedback you have for the class.