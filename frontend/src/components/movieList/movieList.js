import React, {useEffect, useState} from "react"
import "./movieList.css"
import Cards from "../card/card"

const MovieList = (topRateMovies) => {
    
    const [movieList, setMovieList] = useState([])
    
    console.log(topRateMovies.MovieList)
    topRateMovies.MovieList.map(movie => console.log(movie))
    // useEffect(() => {
    //     getData()
    // })

    // const getData = () => {
    //     fetch(`http://127.0.0.1:5000/api/getallmovies`)
    //     .then(res => res.json())
    //     .then(data => setMovieList(data))
    // }

    return (
        <div className="movie__list">
            {/* <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2> */}
            <div className="list__cards">
                {
                    topRateMovies.MovieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList