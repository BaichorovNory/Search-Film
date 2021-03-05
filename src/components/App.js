import React, { useReducer, useEffect } from "react"
import Header from "./Header"
import Movie from "./Movie"
import Preloader from "../assets/Preloader"
import Search from "./Search"
import { initialState, reducer } from "../store"
import axios from "axios"
import '../App.css'
import { SEARCH_MOVIES_FAILURE, SEARCH_MOVIES_REQUEST, SEARCH_MOVIES_SUCCESS } from '../store/index'

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios.get(MOVIE_API_URL).then(jsonResponse => {
            dispatch({
                type: SEARCH_MOVIES_SUCCESS,
                payload: jsonResponse.data.Search
            })
        })
    }, [])

    const search = searchValue => {
        dispatch({
            type: SEARCH_MOVIES_REQUEST
        })

        axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(
            jsonResponse => {
                if (jsonResponse.data.Response === "True") {
                    dispatch({
                        type: SEARCH_MOVIES_SUCCESS,
                        payload: jsonResponse.data.Search
                    })
                } else {
                    dispatch({
                        type: SEARCH_MOVIES_FAILURE,
                        error: jsonResponse.data.Error
                    })
                }
            }
        )
    }

    const { movies, errorMessage, loading } = state

    const retrievedMovies =
        loading && !errorMessage ? (
            <div className='spinner'>
                <Preloader />
            </div>
        ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
        ) : (
            movies.map((movie, index) => (
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
        )

    return (
        <div className="App">
            <div className="m-container">
                <Header text="ПОИСК ФИЛЬМОВ" />

                <Search search={search} />

                <p className="App-intro">Делимся несколькими лучшими фильмами(названия фильмов вводите на английском языке)</p>

                <div className="movies">{retrievedMovies}</div>
            </div>
        </div>
    )
}

export default App