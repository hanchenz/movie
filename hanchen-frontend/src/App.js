import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import FavoritesDataService from "./services/favorites.js";
import MovieDataService from "./services/movies";


import MoviesList from "./components/MoviesList";
import Movie from "./components/Movie";
import Login from "./components/Login";
import Logout from "./components/Logout";
import AddReview from "./components/AddReview";
import FavoriteList from './components/FavoriteList';
import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {

  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [doSaveFaves, setDoSaveFaves] = useState(false);
  const [favList, setFavList] = useState([]);
  const [doChangeFavList, setDoChangeFavList] = useState(false);

  useEffect(() => {
    console.log(favorites);
    console.log(favList);
  }, [favorites, favList])

  const addFavorite = (movieId) => {
    setDoSaveFaves(true);
    setFavorites([...favorites, movieId]);
  };

  const deleteFavorite = (movieId) => {
    setDoSaveFaves(true);
    setFavorites(favorites.filter(f => f !== movieId));
  };

  const changeFav = useCallback((newFavorites) => {
    setFavorites(newFavorites);
  }, []);

  const updateState = (newFavorites) => {
    console.log(newFavorites);
    changeFav(newFavorites);
    console.log(favorites);
    //setDoSaveFaves(true);
    console.log("state updated");
  }

  const updateFavoritesOrder = (newFavoritesOrder) => {
    var data = {
      _id: user.googleId,
      favorites: newFavoritesOrder
    };
    FavoritesDataService.updateFavorites(data)
      .catch(e => {
        console.log(e);
    })
  }
  
  const retrieveFavorites = useCallback(() => {
      FavoritesDataService.getFavorites(user.googleId)
        .then(response => {
          setFavorites(response.data.favorites);
        })
        .catch(e => {
          console.log(e);
        });
      }, [user]);

  const updateFavorites = useCallback(() => {
    console.log("update favorites database");
    var data = {
      _id: user.googleId,
      favorites: favorites
    };
    FavoritesDataService.updateFavorites(data)
      .catch(e => {
        console.log(e);
      })
    }, [favorites, user]);
  
  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        //Not expired
        setUser(loginData);
      } else {
        //Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      retrieveFavorites();
    }
  }, [user, retrieveFavorites]);

  useEffect(() => {
    if (user && doSaveFaves) {
      updateFavorites();
      setDoSaveFaves(false);
    }
  }, [user, favorites, updateFavorites, doSaveFaves]);
  
  const getMovie = useCallback((movieId, index) => {
    MovieDataService.getMovieById(movieId)
        .then(response => {
          console.log(index);
          setFavList((favList) => [...favList, {movie: response.data, index: index} ]);
        })
        .catch(e => {
          console.log(e);
        })
  }, [favorites]);

  const getFavList = useCallback(() => {
    setFavList([]);
    favorites.map((movieId, index) => getMovie(movieId, index));
  }, [favorites, getMovie])

  const allowSort = useCallback(() => {
    setDoChangeFavList(true);
  }, [])

  useEffect(() =>{
      getFavList();
      allowSort();
      console.log("List created");
  }, [favorites, getFavList]);

  /** 
  const sortList = useCallback(() => {
      let newList = favList;
      newList.sort((a, b) => {return a.index-b.index});
      setFavList(newList.map(x => x.movie));
      console.log(favList);
  }, [favList, doChangeFavList]);

  useEffect(() => {
    if (doChangeFavList){
      sortList();
      console.log("FavList initiated");
      setDoChangeFavList(false);
    }
  }, [favList, doChangeFavList])
  */

  useEffect(() => {
    let fav = document.getElementById('favorite-showing');
    if (user){
      fav.style.visibility = "visible";
    } else {
      fav.style.visibility = "hidden";
    }
  }, [user])

  //document.getElementById('favorite-showing')

  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className="App">
      <Navbar bg="primary" expand="lg" sticky="top" variant="dark" >
        <Container className="container-fluid">
        <Navbar.Brand className="brand" href="/">
          <img src="/images/movies-logo.png" alt="movies logo" className="moviesLogo"/>
          MOVIE TIME
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="ml-auto">
            <Nav.Link as={Link}  to={"/movies"}>
              Movies
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto" id = "favorite-showing">
            <Nav.Link as={Link}  to={"/favorites"} >
              Favorites
            </Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
        { user ? (
                <Logout setUser={setUser} />
              ) : (
                <Login setUser={setUser} />
              )}
        </Container>
      </Navbar>

      <Routes>
        <Route exact path={"/"} element={
          <MoviesList 
            user = { user}
            addFavorite = { addFavorite }
            deleteFavorite = { deleteFavorite }
            favorites = { favorites }
          />}
          />
        <Route exact path={"/movies"} element={
          <MoviesList 
            user = { user }
            addFavorite = { addFavorite }
            deleteFavorite = { deleteFavorite }
            favorites = { favorites }
          />}
          />
        <Route path={"/movies/:id"} element={
          <Movie user={ user }/>}
          />
        <Route path={"/movies/:id/review"} element={
          <AddReview user={ user } />}
          />
        <Route exact path={"/favorites"} element={
          <FavoriteList 
            favList = { favList.sort((a, b) => {return a.index-b.index}) }
            updateState = { updateState }
            updateFavoritesOrder = { updateFavoritesOrder }
          />}
          />
      </Routes>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
