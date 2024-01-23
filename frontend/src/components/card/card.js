import React, {useEffect, useState} from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "./card.css"
import { Link } from "react-router-dom"

const Cards = (movie) => {

    const [isLoading, setIsLoading] = useState(true)
    const [show,setShow] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
        setShow(movie.movie)
    }, []) 

    return <>
    {
        isLoading
        ?
        <div className="cards">
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        :
        <Link to={`/movie/${show.title}`} style={{textDecoration:"none", color:"white"}}>
            <div className="cards">
                <img className="cards__img" src={show.poster_path_url} />
                <div className="cards__overlay">
                    <div className="card__title">{show?show.title:""}</div>
                    <div className="card__runtime">
                        {show?show.duration:""}
                        <span className="card__rating">{show?show.rating:""}<i className="fas fa-star" /></span>
                    </div>
                    <div className="card__description">{show ? show.description.slice(0,118)+"..." : ""}</div>
                </div>
            </div>
        </Link>
    }
    </>
}

export default Cards