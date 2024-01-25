import React, { useEffect, useState } from "react"
import "./suggest.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link, useNavigate } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const SuggestForm = () => {

    const [popularMovies, setPopularMovies] = useState([])
    const [suggestMovies, setSuggestMovies] = useState([])

    const initialState  = {
        age:'',
        gender:'0',
        location:'0' 
    }
    
    const [state,setState] = useState(initialState)
    const {age,gender,location} = state

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/getallmovies")
            .then(res => res.json())
            .then(data => setPopularMovies(data))
    }, [])

    const handleChange = (e) => {
        let { name, value } = e.target
        setState({...state,[name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getData(state)
        
    }

    const getData = details => {
        fetch(`http://127.0.0.1:5000/api/suggest/${details.age}/${details.gender}/${details.location}`)
            .then(res => {
                console.log('Response status:', res.status);
                return res.json();
            })
            .then(data => {
                console.log('Data received:', data);
                setSuggestMovies(data.movies);
            })
            .catch(error => console.error('Error fetching suggest movies:', error));
    }
    
    console.log(suggestMovies)
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
                        popularMovies.map(movie => (
                            <Link style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.title}`} >
                                <div className="posterImage">
                                    <img src={movie.backdrop_path_url} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.title : ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.rating : ""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.tagline : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <div className="container">
                    <div className="suggest_title">
                        <label className="suggest_title">Get Suggest Movie</label>
                    </div>
                    <div className="card_container">
                        <div className="card formDivWrapper" style={{backgroundColor:"red"}}>
                            {/* <img className="card_img imageBackground" src={'https://c4.wallpaperflare.com/wallpaper/660/1007/743/abstract-pattern-design-texture-wallpaper-preview.jpg'} /> */}
                            <div className="card_label formWrapper">
                                <form onSubmit={handleSubmit}>
                                    <div className="input_div inputFieldWrapper">
                                        <label>Age</label>
                                        <input type="text" placeholder="Enter your age"style={{width:"388px"}} className="inputField textInput" name="age" id="name" onChange={handleChange}/>
                                    </div>

                                    <div className="input_div inputFieldWrapper">
                                        <label>Gender</label>
                                        <select name="gender" defaultValue={state.gender} onChange={handleChange} className="inputField selectInput">
                                            <option value={0}>Male</option>
                                            <option value={1}>Female</option>
                                        </select>
                                    </div>

                                    <div className="input_div inputFieldWrapper">
                                        <label>Location</label>
                                        <select name="location" onChange={handleChange} className="inputField selectInput">
                                            <option value={0}>Central Province</option>
                                            <option value={1}>Eastern Province</option>
                                            <option value={2}>North Central Province</option>
                                            <option value={3}>North Western Province</option>
                                            <option value={4}>Northern Province</option>
                                            <option value={5}>Sabaragamuwa Province</option>
                                            <option value={6}>Southern Province</option>
                                            <option value={7}>Uva Province</option>
                                            <option value={8}>Western Province</option>
                                            
                                        </select>
                                    </div>
                                    <div className="inputFieldWrapper">
                                        <button className="submitButton" type="submit" name="submit" onSubmit={handleSubmit}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <MovieList MovieList = {suggestMovies}/>
            </div>
        </>
    )
}

export default SuggestForm