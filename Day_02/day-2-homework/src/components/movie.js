import React from 'react'


// the component function
const Movie = (props) => {
    console.log(props + 'again wit props');
    //The Components Returned JSX
    return <div className="Movie"> 
        <img
      src={props.img}
      className="movie-img-top"
      alt="..."
    />
      <h5 className="movie-title">{props.title}</h5>
      <p className="movie-text">
        {props.text}
      </p>
      <a href={props.url} className="btn btn-primary">Go now</a>
    </div>
}

// export the component
export default Movie