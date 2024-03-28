import React from 'react'
import '../MoviePoster/MoviePoster.css'
import { IMAGE_URL } from '../../Constants/Constants'

function SearchMovie(props) {
    const {movies} = props
    return (
        <div className='poster-row'>
        <div className='poster-content'>
                {
                    movies.map(movie=>{
                        return(
                <img key={movie.id} className='poster' src={`${IMAGE_URL+movie.poster_path}`} alt=""  />
                        )
                    })
                }            
            </div>
        </div>
    )
}

export default SearchMovie
