import Props from "./components/data"
import './App.css';
import Movies from "./components/movies.js"
// import Movie from "./components/movie.js"


function App() {
  // const props = Props.map((item, index) => {
  return <div className="App">
      
  <Movies movies={Props}/>


</div>

// })
}

export default App;
