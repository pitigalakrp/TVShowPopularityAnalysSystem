import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import TopRate from './pages/toprated/toprate';
import SuggestForm from './pages/suggest/suggestform';

function App() {
  return (
    <div className="App">
        <Router>
          <Header />
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="movie/:title" element={<Movie />}></Route>
                <Route path="movies" element={<MovieList />}></Route>
                <Route path='/movies/top_rated' element={<TopRate />}></Route>
                <Route path='/movies/suggestionform' element={<SuggestForm />}></Route>
                <Route path="/*" element={<h1>Error Page</h1>}></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
