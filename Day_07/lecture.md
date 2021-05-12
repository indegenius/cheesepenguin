## Express React Build

In this build we will

- Build an Express API
- Use Mongo/Mongoose with 1 model
- Deploy the Api with Heroku
- Build a Full Crud Frontend with React
- Deploy with Netlify

## Setup for Express Build

- Create a folder called express-react
- Inside this folder create another folder called backend
- Generate a React app called frontend `npx create-react-app frontend`

Your folder structure should look like this...

```
/express-react
 -> /backend
 -> /frontend
```

- cd into `backend` folder

## Setting up the Express app

- create a new node project `npm init -y`
- install dependencies `npm install dotenv mongoose express cors morgan`
- install dev dependencies `npm install --save-dev nodemon`
- setup npm scripts

```json
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
}
```

- make files `touch .env .gitignore server.js`

- put the following .gitignore

```
/node_modules
.env
```

- put the following in .env (make sure to use YOUR mongodb.com uri)

```
MONGODB_URL=mongodb+src://...
PORT=4000
```

## Starting Server.js

Let's build out the minimum to get server.js up and running

```js
///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
const { PORT = 3000 } = process.env;
// import express
const express = require("express");
// create application object
const app = express();

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
```

- run the server `npm run dev` and make sure you see "Hello World" when you go to `localhost:4000`

## Adding a Database Connection

Let's update our server.js to include a database connection

```js
///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 3000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
```

- Make sure you see the Mongoose Connection message when the server restarts

## Adding the People Model

Let's add a People model to server.js along with an index and create route to see and create our people. Make sure to add cors and express.json middleware!

```js
///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 3000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const PeopleSchema = new mongoose.Schema({
  name: String,
  image: String,
  title: String,
});

const People = mongoose.model("People", PeopleSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// PEOPLE INDEX ROUTE
app.get("/people", async (req, res) => {
  try {
    // send all people
    res.json(await People.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE CREATE ROUTE
app.post("/people", async (req, res) => {
  try {
    // send all people
    res.json(await People.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
```

- create 3 people using postman to make post requests to /people

- test the index route with a get request to /people

## Update and Delete

Let's add an Update and Delete API Route to server.js

```js
///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 3000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const PeopleSchema = new mongoose.Schema({
  name: String,
  image: String,
  title: String,
});

const People = mongoose.model("People", PeopleSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// PEOPLE INDEX ROUTE
app.get("/people", async (req, res) => {
  try {
    // send all people
    res.json(await People.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE CREATE ROUTE
app.post("/people", async (req, res) => {
  try {
    // send all people
    res.json(await People.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE Update Route
app.put("/people/:id", async (req, res) => {
  try {
    // send all people
    res.json(
      await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE Delete Route
app.delete("/people/:id", async (req, res) => {
  try {
    // send all people
    res.json(await People.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
```

## Deploy

- create a git repo in the `backend` folder `git init`

- add all files to staging `git add .`

- commit `git commit -m "message"`

- create a new repo on github.com (make sure its empty and public)

- add the remote to your local repo `git remote add origin URL` replate URL with your repos url

- push up your code `git push origin branchName` replace branch name with your active branch, find that with `git branch`

- go to heroku and create a new project

- under deploy connect your repo, enable auto deploys, and trigger a manual deploy

- under settings set your MONGO_URL config var

- in postman test all your API endpoints

## Lab Part 1 - Cheese App

- create another folder called "Cheese App"

- create a backend and frontend folder like you did for today's lesson

- create a cheese API with index, create, update and delete routes

- the model should look like

```
name: String,
countryOfOrigin: String,
image: String
```

- Test the API, deploy the API, test the deployed API

# React People Setup, Index, Create

## Setup

- open terminal in frontend folder

- install react router and sass `npm install react-router-dom sass`

- create a file called styles.scss in the /src folder

## Installing Router and Sass

- Update index.js to like like so

```js
import React from "react";
import ReactDOM from "react-dom";
// IMPORT SCSS FILE TO BE SOURCE OF STYLING
import "./styles.scss";
// IMPORT ROUTER
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## Scoping Out Our Components

- Create a components and pages folder

- In the components folder create a Header.js and Main.js file

- In the pages folder create a Index.js and Show.js folder

- Write the component boilerplate and export the component in all the created files

```jsx
function Component(props) {
  return <h1>Component Name</h1>;
}

export default Component;
```

## App.js

Our desired component Architecture

```
-> App
  -> Header
  -> Main |state: people|
    -> Switch
      -> Route |path: "/"|
        -> Index |Props: people, createPeople|
      -> Route |path="/people/:id|
        -> Show |Props: people, updatePeople, deletePeople|
```

Let's add the following to App.js

```js
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
```

## Setting up router in Main.js

- let's create our routes

```js
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route path="/people/:id" render={(rp) => <Show {...rp} />} />
      </Switch>
    </main>
  );
}

export default Main;
```

## Setting Up Navigation

Let's put the following in Header.js

```js
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <div>People App</div>
      </Link>
    </nav>
  );
}

export default Header;
```

## Sass

Sass is a CSS pre-compiler that allows us some new tricks in writing CSS including...

- Nesting
- Mixin
- Variables

Let's write some Sass in our styles.scss

```scss
// --------------------------
// VARIABLES
// --------------------------
$maincolor: black;
$contrastcolor: white;

@mixin white-text-black-bg {
  color: $contrastcolor;
  background-color: $maincolor;
}

@mixin black-test-white-bg {
  color: $maincolor;
  background-color: $contrastcolor;
}

// --------------------------
// Header
// --------------------------

nav {
  @include white-text-black-bg;
  display: flex;
  justify-content: flex-start;

  a {
    @include white-text-black-bg;
    div {
      margin: 10px;
      font-size: large;
    }
  }
}
```

## Displaying People in Index

We need the state to exist in Main so it can be shared between Index and Show. So let's update Main to have:

- state to hold our list of people
- function to make the api call for people
- function to create a new person
- useEffect to make initial call for people list
- pass the people state and the create function to Index

Main.js

```js
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [people, setPeople] = useState(null);

  const URL = "http://localhost:4000/people/";

  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (person) => {
    // make post request to create people
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };

  useEffect(() => getPeople(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index people={people} createPeople={createPeople} />
        </Route>
        <Route path="/people/:id" render={(rp) => <Show {...rp} />} />
      </Switch>
    </main>
  );
}

export default Main;
```

Let's now display the people in Index.js

```js
import { useState } from "react";
import {Link} from "react-router-dom"

function Index(props) {

  // loaded function
  const loaded = () => {
    return props.people.map((person) => (
      <div key={person._id} className="person">
        <Link to={`/people/${person._id}`}><h1>{person.name}</h1></Link>
        <img src={person.image} alt={person.name} />
        <h3>{person.title}</h3>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };
  return props.people ? loaded() : loading()

  );
}

export default Index;
```

## Creating People

Let's now add a form to our index.js

- state to hold the form data
- form inputs in our JSX
- handlechange function to allow our state to control the form
- handlesubmit function handle form submisssion

```js
import { useState } from "react";
import { Link } from "react-router-dom";

function Index(props) {
  // state to hold formData
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    title: "",
  });

  // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createPeople(newForm);
    setNewForm({
      name: "",
      image: "",
      title: "",
    });
  };

  // loaded function
  const loaded = () => {
    return props.people.map((person) => (
      <div key={person._id} className="person">
        <Link to={`/people/${person._id}`}>
          <h1>{person.name}</h1>
        </Link>
        <img src={person.image} alt={person.name} />
        <h3>{person.title}</h3>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Create Person" />
      </form>
      {props.people ? loaded() : loading()}
    </section>
  );
}

export default Index;
```

## Conclusion

You should now be able to see all the people and create people

## Lab

Begin the Frontend for your Cheese app, and create the ability to display and create cheeses like our People app.

# People Build, Show, Edit and Delete

## Links to Show Page

We want generate links to each persons show page so let's do the following in Index.js

```js
import { useState } from "react";
import { Link } from "react-router-dom";

function Index(props) {
  // state to hold formData
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    title: "",
  });

  // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createPeople(newForm);
    setNewForm({
      name: "",
      image: "",
      title: "",
    });
  };

  // loaded function
  const loaded = () => {
    return props.people.map((person) => (
      <div key={person._id} className="person">
        <Link to={`/people/${person._id}`}>
          <h1>{person.name}</h1>
        </Link>
        <img src={person.image} alt={person.name} />
        <h3>{person.title}</h3>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Create Person" />
      </form>
      {props.people ? loaded() : loading()}
    </section>
  );
}

export default Index;
```

## The Show Page

Let's pass the people data to the Show page via props and make a update and delete function for the show page, head over to Main.js

```js
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [people, setPeople] = useState(null);

  const URL = "http://localhost:4000/people/";

  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (person) => {
    // make post request to create people
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };

  const updatePeople = async (person, id) => {
    // make post request to create people
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };

  const deletePeople = async (id) => {
    // make post request to create people
    await fetch(URL + id, {
      method: "delete",
    });
    // update list of people
    getPeople();
  };

  useEffect(() => getPeople(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index people={people} createPeople={createPeople} />
        </Route>
        <Route
          path="/people/:id"
          render={(rp) => (
            <Show
              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;
```

Let's grab the selected person from the people array in props and display them.

Show.js

```js
function Show(props) {
  const id = props.match.params.id;
  const people = props.people;
  const person = people.find((p) => p._id === id);

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} />
    </div>
  );
}

export default Show;
```

## Updating a Person

On the show page let's add

- state for a form

- handleChange and handleSubmit function

- a form in the JSX below the person

```js
import { useState } from "react";
function Show(props) {
  const id = props.match.params.id;
  const people = props.people;
  const person = people.find((p) => p._id === id);

  // state for form
  const [editForm, setEditForm] = useState(person);

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  // handlesubmit for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.updatePeople(editForm);
    // redirect people back to index
    props.history.push("/");
  };

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
    </div>
  );
}

export default Show;
```

## Deleting a Person

Last Stop is adding a button on the show page to delete a user!

```js
import { useState } from "react";
function Show(props) {
  const id = props.match.params.id;
  const people = props.people;
  const person = people.find((p) => p._id === id);

  const [editForm, setEditForm] = useState(person);

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updatePeople(editForm);
    props.history.push("/");
  };

  const removePerson = () => {
    props.deletePeople(person._id);
    props.history.push("/");
  };

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} />
      <button id="delete" onClick={removePerson}>
        DELETE
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
    </div>
  );
}

export default Show;
```

## Some Final Styling

A few more changes to our styles.scss

```scss
// --------------------------
// VARIABLES
// --------------------------
$maincolor: black;
$contrastcolor: white;

@mixin white-text-black-bg {
  color: $contrastcolor;
  background-color: $maincolor;
}

@mixin black-test-white-bg {
  color: $maincolor;
  background-color: $contrastcolor;
}

// --------------------------
// Header
// --------------------------

nav {
  @include white-text-black-bg;
  display: flex;
  justify-content: flex-start;

  a {
    @include white-text-black-bg;
    div {
      margin: 10px;
      font-size: large;
    }
  }
}

// --------------------------
// Form
// --------------------------

section,
div {
  form {
    input {
      @include white-text-black-bg;
      padding: 10px;
      font-size: 1.1em;
      margin: 10px;

      &[type="submit"]:hover {
        @include black-test-white-bg;
      }
    }
  }
}

// --------------------------
// button
// --------------------------

button#delete {
  @include white-text-black-bg;
  display: block;
  margin: auto;
  font-size: 1.3em;
  padding: 10px;
}

// --------------------------
// images
// --------------------------

img {
  width: 300px;
  height: 300px;
  border-radius: 90px;
  object-fit: cover;
}
```

## Deploy

- add a netlify.toml with the following

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
```

_NOTE, if you wanted to deploy to Version you'd include a vercel.json with the follow_

```json
{
  "version": 2,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

- push frontend repo to github

- connect to netlify

- done

**[Finished Backend App Example](https://git.generalassemb.ly/AlexMerced/people_backend)**
**[Finished Frontend App Example](https://git.generalassemb.ly/AlexMerced/people_frontend)**

## Lab - Complete Your Cheese App

Complete your cheese app using the steps of todays lessons adding the following:

- the ability see an individual cheese
- the ability edit a cheese
- the ability to delete a cheese
>>>>>>> 193bf1e4b15f7ac275b06792bd666864b618b4d5
