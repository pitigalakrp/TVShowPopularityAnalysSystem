import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src="https://firebasestorage.googleapis.com/v0/b/tv-show-6a544.appspot.com/o/Television%20World.png?alt=media&token=19dc0485-774c-436a-be08-7efad24343a5" /></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/suggestionform" style={{textDecoration: "none"}}><span>Suggestion</span></Link>
            </div>
        </div>
    )
}

export default Header