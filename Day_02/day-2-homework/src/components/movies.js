
import React from 'react'
import Movie from './movie.js'

// the component function
const Movies = (films) => {
console.log(films);
    
        return (
          <Movie
            img={films.img}
            title={films.title}
            text={films.text}
            url={films.url}
          />
        );
      };

   
    
    

// export the component
export default Movies