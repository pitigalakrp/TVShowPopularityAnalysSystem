import React, { useEffect, useState } from "react"
import "./toprate.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const TopRate = () => {

    const [ topRateMovies, setTopRateMovies ] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/movie/toprated")
        .then(res => res.json())
        .then(data => setTopRateMovies(data.top_rated_movies))
    }, [])
    console.log(topRateMovies)

    return (
        <>
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        topRateMovies.map(movie => (
                            <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.title}`} >
                                <div className="posterImage">
                                    <img src={movie.backdrop_path_url} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.title: ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.rating :""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.tagline : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieList MovieList = {topRateMovies}/>
            </div>
        </>
    )
}

export default TopRate