import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from "immutability-helper";
import Cards from "./Card.js";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import FavoritesDataService from "../services/favorites.js";



import "./FavoriteList.css";

const FavoriteList = ({ favList, updateState, updateFavoritesOrder }) => {
    
    console.log(favList);
    const [favorites, setFavorites] = useState([]);
    const [doSaveFav, setDoSaveFav] = useState(false);
    const [movies, setMovies] = useState([]);
    const [doChangeFav, setDoChangeFav] = useState(false);
    const [cards, setCards] = useState([]);
    console.log(favorites);
    console.log(movies);
    console.log(doSaveFav);

    useEffect(() => {
        if (movies.length < favList.length){
            setMovies(favList);
        }
    }, [favList]);

    /**
    const sortList = useCallback(() => {
        if (!doSaveFav){
            let newList = favList;
            newList.sort((a, b) => {return a.index-b.index});
            setMovies(newList.map(x => x.movie));
            console.log(movies);
        }
    }, []);

    useEffect(() => {
        sortList();
        console.log("FavList initiated");
    }, [])
    */

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setMovies((prevFav) =>
            update(prevFav, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevFav[dragIndex]]
                ]
            })
        );
        console.log("card moved");
        setDoChangeFav(true);
    }, []);

    const buildCard = useCallback((movie, index) => {
        return (
            <Cards
                key={movie._id}
                index={index}
                id={movie._id}
                movie={movie}
                moveCard={moveCard}
            />
        )
    }, []);

    /**
    const changeFav = useCallback(() => {
        setFavorites(movies.map((movie => movie._id)));
    }, [movies, doSaveFav]);
    */

    const changeFav = useCallback(() => {
        setFavorites(movies.map((a => a.movie._id)));
    }, [movies, doSaveFav]);

    const changeState = useCallback(() => {
        updateState(favorites);
    }, [movies, doSaveFav])

    const updateFavoriteDataBase = useCallback(() => {
        changeState();
        updateFavoritesOrder(favorites);
        setDoSaveFav(false);
    }, [doSaveFav, movies])

    useEffect(() => {
        if (doChangeFav){
            changeFav();
            setDoSaveFav(true);
            setDoChangeFav(false);
            console.log("state update called in favoriteList");
        }
    }, [movies, doChangeFav, changeFav]);

    useEffect(() => {
        if (doSaveFav){
            updateFavoriteDataBase();
        }
    }, [doSaveFav, movies, updateFavoriteDataBase])

    /**
    const addCard = useCallback((card) => {
        setCards((cards) => [...cards, card]);
    }, [movies])

    const buildCardList = useCallback(() => {
        console.log("build card list html");
        movies.map((a, index) => addCard(buildCard(a.movie, index)));
    }, [movies])

    useEffect(() => {
        buildCardList();
    }, [movies])
    */

    return (
        <Container className="favoritesContainer">
            <h1 className='favoritesHeader'>
                Drag your favorites to rank them
            </h1>
            <div>
                <DndProvider backend={HTML5Backend}>
                    <div className="favoritesPanel">
                        <Row>
                            { console.log(movies)}
                            { movies.map((a, index) => buildCard(a.movie, index)) }
                        </Row>
                    </div>
                </DndProvider>
            </div>
        </Container>
    );
}


export default FavoriteList;