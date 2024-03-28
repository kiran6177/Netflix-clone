import React, { Suspense, lazy, useState } from 'react'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import Banner from '../Banner/Banner'
import SkeltonMovie from '../SearchMovie/SkeltonMovie'
import MoviePoster from '../MoviePoster/MoviePoster'
import { ORIGINALS_URL ,ACTION_URL,COMEDY_URL,HORROR_URL,DOCUMENTARIES,ROMANTIC_URL} from '../../Constants/Constants'
import axios from '../../axios'
const SearchMovie = lazy(()=>import('../SearchMovie/SearchMovie'))


function Home() {
  const [search,setSearch] = useState(true)
  const [movies,setMovies] = useState()
  const handleViewSearch = (value)=>{
    axios.get(`search/multi?query=${value}&include_adult=false&language=en-US&page=1`)
    .then((res)=>{
      if(res.data.results.length > 0){
        console.log(res.data.results);
        const movies = res.data.results
        let genreSet = new Set([])
        movies.forEach(movie => {
          if(movie.genre_ids){
          genreSet.add(...movie.genre_ids)
          }
        });
        let movieMap = new Map()
        genreSet.forEach(genre=>{
          movieMap.set(genre,[])
          movies.forEach(movie=>{
          if(movie.genre_ids && movie.genre_ids.length > 0){
            movie.genre_ids.forEach(genree=>{
              if(genree === genre){
                movieMap.set(genre,[...movieMap.get(genre),movie])
              }
            })
          }
          })
        })
        setMovies(movieMap)
      }else{

      }
    })
    setSearch(false)
  }

  return (
    <div className='netflix-home'>
      <Navbar handleViewSearch={handleViewSearch}/>
      {search ?
      <>
      <Banner/>
      <MoviePoster title='Netflix Orignals' url={ORIGINALS_URL} />
      <MoviePoster title='Action Movies' isSmall url={ACTION_URL} />
      <MoviePoster title='Romantic Movies' isSmall url={ROMANTIC_URL} />
      <MoviePoster title='Comedy Movies' isSmall url={COMEDY_URL} />
      <MoviePoster title='Documentaries' isSmall url={DOCUMENTARIES} />
      <MoviePoster title='Horror Movies' isSmall url={HORROR_URL} />
      </>
      :
      <>
        <div className='search-result'>
          <h2>Explore Movies based on Genres :</h2>
          <button className='closebtn' ><i className="fa-solid fa-xmark" onClick={()=>setSearch(true)}></i></button>
        </div>
        {movies ? Array.from(movies.entries()).map(([key,value],i)=>{return(
          <Suspense key={i} fallback={<SkeltonMovie/>}>
           <SearchMovie key={key} movies={value}/> 
          </Suspense>
           )}) : <p>Not Loading {movies}</p>}
      </>
      
    }
    </div>
  )
}
export default Home