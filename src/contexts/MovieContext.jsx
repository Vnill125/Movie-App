import { useEffect, useState, createContext, useContext } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorite, setFavorite] = useState([])

    useEffect(() => {
        const storeFav = localStorage.getItem("favorites")

        if (storeFav) {setFavorite(JSON.parse(storeFav))}
    },[])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorite))
    }, [favorite])

    const addToFavorites = (movie) => {
        setFavorite(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorite(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorite.some(movie => movie.id === movieId)
    }

    const value = {
        favorite,
        addToFavorites,
        removeFromFavorites,
        isFavorite

    }
     
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}