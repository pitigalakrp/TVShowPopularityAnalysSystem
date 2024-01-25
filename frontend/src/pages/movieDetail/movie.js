import React, {useEffect, useState} from "react"
import "./movie.css"
import { useParams } from "react-router-dom"

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState()
    const { title } = useParams()

    useEffect(() => {
        getData()
        
    }, [])

    const getData = () => {
        fetch(`http://127.0.0.1:5000/api/movie/${title}`)
        .then(res => res.json())
        .then(data => setMovie(data))
    }

    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={currentMovieDetail ? currentMovieDetail.backdrop_path_url : ""} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={currentMovieDetail ? currentMovieDetail.poster_path_url : ""} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.rating: ""} <i class="fas fa-star" />
                            {/* <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span> */}
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.duration: ""}</div>
                        <div className="movie__runtime">{currentMovieDetail ? "Channel: " + currentMovieDetail.channel: ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Show Day: " + currentMovieDetail.week : ""}</div>
                        <div className="movie__genres">
                            {
                                
                                    <><span className="movie__genre">{currentMovieDetail?currentMovieDetail.genre:''}</span></>
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.description: ""}</div>
                    </div>
                    
                </div>
            </div>
            {/* <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div> */}
            {/* <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    // currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                    //     <>
                    //         {
                    //             company.logo_path 
                    //             && 
                    //             <span className="productionCompanyImage">
                    //                 <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                    //                 <span>{company.name}</span>
                    //             </span>
                    //         }
                    //     </>
                    // ))
                    // <span className="productionCompanyImage">
                    //     <img className="movie__productionComapany" src={currentMovieDetail? currentMovieDetail.channel_logo_url:""} />
                    //     <span>{currentMovieDetail.channel}</span>
                    // </span>

                }
            </div> */}
        </div>
    )
}

export default Movie