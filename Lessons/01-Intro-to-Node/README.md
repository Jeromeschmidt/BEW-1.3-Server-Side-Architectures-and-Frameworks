# Day 1: Intro to Node and Express

> _Fast, unopinionated, minimalist web framework._

### ⏱ Agenda

1. 🏆 Learning Objectives
1. 📖 [15m] Course Overview
1. 📖 [15m] A Brief Introduction
1. 📖 [15m] Review: How to Pair Program
1. 🌴 [10m] BREAK
1. 💻 [50m] Lab Activity: GIF Search
1. 📖 [30m] Review Node & Express
1. 📚 Resources & Credits


## 🏆 Learning Objectives

By the end of this class, you should be able to...

1. Write a route using Node and Express.js.
1. Use the Handlebars templating language to pass data to a template.
1. Compare and Contrast Express routes with Flask.


## 📖 [15m] Node and Express

Let's go over some definitions to get us started...

- [**Node.js**](https://nodejs.org/en/about/) is an open-source JavaScript runtime environment that executes JavaScript code outside of a browser.

- [**NPM**](https://www.npmjs.com/) is short for "Node Package Manager", and is used to download third-party packages for use with Node.

- [**Express**](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- [**Handlebars**](https://handlebarsjs.com/) is a lightweight templating language that works with Node and Express.

## 📖 [15m] Review of Pair Programming

Pair programming is useful because...

- It will train you to **ask better questions** and **work better on a team**.
- Research shows that the **fastest and most effective way** to learn something is to teach it.

In pair programming, there are 2 roles: **Driver** and **Navigator**. You should switch roles often (every 5-10 minutes).

The **driver** is responsible for...

- Typing the code
- Checking for syntax errors
- Asking questions whenever the next step isn't clear


The **navigator** is responsible for...

- Thinking of what to do next
- Explaining why to proceed a particular way
- Looking up documentation
- Checking for syntax errors

**Both programmers** in a pair should...

- Avoid trying to be 'right' - pick a direction and keep going!
- Intervene if your pair is quiet
- Communicate!!!
- Swap roles frequently

## 🌴 [10m] BREAK

## 💻 [50m] Lab Activity: GIF Search

Choose pairs randomly. You will work with your pair for the rest of class.

Open the [GIF Search tutorial](https://www.makeschool.com/academy/track/gif-search-app-ynu) and finish parts 1-4 (part 5 optional). As you work, discuss each step with your pair and make sure both partners understand before moving on.

You will submit the tutorial in Class 2. You may finish on your own (just make sure to `git push` before the end of class).

## 📖 [30m] Recap: Node & Express

### Setup

This code will likely be the same for most projects you create. *You do not need to memorize this, but instead should reference past projects or tutorials.*

```js
const express = require('express');
const app = express();

const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
```

### Writing a Route

We write routes in Express using `app.get`, `app.post`, etc.

```js
app.get('/greetings/:name', (req, res) => {
  // grab the name from the path provided
  const name = req.params.name;
  // render the greetings view, passing along the name
  res.render('greetings', { name });
})
```


### What are 'req' and 'res'?

`req` = "Request".

- `req.query` - Access the **query parameters** passed in the URL's query string.
- `req.params` - Access the **route variables** passed in the URL. E.g. `/greeting/Meredith`

`res` = "Response".


### Writing a Template

Take a look at the template syntax for Handlebars for showing a list of songs. How is it different than Jinja (or Django) syntax? How is it similar?

```js
<ul>
  {{ #each songs }}
    <li>
      <a href="/song/{{ this._id }}">
        {{ this.name }}
      </a>
    </li>
  {{ /each }}
</ul>
```

## Wrap-Up

Finish the GIF Search tutorial before the start of next class. You may finish individually - just make sure to clone the repository from your pair before you leave class!

## 📚 Resources

[Express/Node Introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)