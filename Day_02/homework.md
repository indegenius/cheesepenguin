## Homework Night 2

Today your going to make a page that lists several of your favorite movies.

## Setup

- create a new react app in your day 2 folder `npx create-react-app day-2-homework`

- cd into the new folder, run `npm start` to see default screen

## App.js

- empty the contents of app.js so it looks like so:

```js

function App() {
  return (
    <div className="App">

    </div>
  );
}

export default App;

```
- create an array of 5 movies including name, year and rating and optionally an image.

```js

function App() {

  const movies = [
    {
      name: "xxxxxxxxxxxxxxxxx",
      year: "2222",
      rating: "G",
      image: "https://www.something.com/image.png"

    },
    {
      name: "xxxxxxxxxxxxxxxxx",
      year: "2222",
      rating: "G",
      image: "https://www.something.com/image.png"

    },
    {
      name: "xxxxxxxxxxxxxxxxx",
      year: "2222",
      rating: "G",
      image: "https://www.something.com/image.png"

    },
    {
      name: "xxxxxxxxxxxxxxxxx",
      year: "2222",
      rating: "G",
      image: "https://www.something.com/image.png"

    },
    {
      name: "xxxxxxxxxxxxxxxxx",
      year: "2222",
      rating: "G",
      image: "https://www.something.com/image.png"

    },
  ]


  return (
    <div className="App">

    </div>
  );
}

export default App;
```

## Other Components

- create a components folder and in that folder create a movies.js file and a movie.js file with component boiler plate.

```js
// the component function
const ComponentName = (props) => {

    //The Components Returned JSX
    return <div className="ComponentName"> This is ComponentName</div>
}

// export the component
export default ComponentName
```

## App.js

Import the Movies components into App.js and render it in Apps JSX and pass it the movies array as a prop.

```js
import Movies from "./components/Movies"

function App() {

  const movies = [
    {
      name: "xxxxxxxxxxxxxxxxx",
      year: "2222",
      rating: "G",
      image: "https://www.something.com/image.png"

    },
    {
      name: "xxxxxxxxxxxxxxxxx",
      year: "2222",
      rating: "G",
      image: "https://www.something.com/image.png"

    },
    {
      name: "xxxxxxxxxxxxxxxxx",
      year: "2222",
      rating: "G",
      image: "https://www.something.com/image.png"

    },
    {
      name: "xxxxxxxxxxxxxxxxx",
      year: "2222",
      rating: "G",
      image: "https://www.something.com/image.png"

    },
    {
      name: "xxxxxxxxxxxxxxxxx",
      year: "2222",
      rating: "G",
      image: "https://www.something.com/image.png"

    },
  ]


  return (
    <div className="App">
      <Movies movies={movies}/>
    </div>
  );
}

export default App;
```

- Use the chrome dev tools to confirm that the props have been passed down to the movies component (click on Movies in dev tools to examine its data.

## Movies.js

Grab the movies array from props and use the Array Map method to look over the array and render a Movie (not Movies) component for each movie. If you need a review on using the Map Method in React, [watch this video](https://www.youtube.com/watch?v=HYjDmu9sPfc).

Using devtools, confirm that your component structure looks like so.

```
App
----Movies
-------- Movie
-------- Movie
-------- Movie
-------- Movie
-------- Movie
```

Also click on each movie and confirm each movie is getting the information of one of the movies from the array.

## Movie.js

Using the movie from props, display the individual properties in the movie in this component, you should now see all 5 movies on the screen. If you have have trouble knowing the name of the variables in your component, use dev tools to examine the props object and what is inside it for that component.

[Watch This Video on React DevTools](https://www.youtube.com/watch?v=2Kn1fry91tk)

## Hungry For More

Never hurts to get more styling practice so use SASS or CSS to style the page!
