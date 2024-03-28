import React, { useEffect, useState } from 'react'
import './MoviePoster.css'
import axios from '../../axios'
import { IMAGE_URL } from '../../Constants/Constants'
import Youtube from 'react-youtube'

function MoviePoster(props) {
    const [movies,setMovies] = useState([])
    const [videoId,setVideoId] = useState()
    useEffect(()=>{
        axios.get(props.url)
        .then((res)=>{
            console.log(res.data)
            setMovies(res.data.results)
        })
    },[props.url])


    const opts = {
        height: '640',
        width: '100%',
        playerVars: {
          autoplay: 1,
          controls:0,
          rel:1,
          fs:0,
          iv_load_policy:3
        },
      };

      const showVideo = (id)=>{
        axios.get(`movie/${id}/videos?language=en-US`)
        .then(res=>{
            if(res.data){
                if(res.data.results.length > 0){
                    setVideoId(res.data.results[0].key)
                }else{
                    setVideoId('No videos')
                }
            }
        })
      }

      const setNull = ()=>{
        console.log('cross clicked')
        setVideoId(null)
      }
  return (
    <div className='poster-row'>
        <h2>{props.title}</h2>
        <div className='poster-content'>
            {
                movies.map(movie=>{
                    return(
            <img key={movie.id} className={props.isSmall ? 'smallposter':'poster'} src={`${IMAGE_URL+movie.poster_path}`} alt="" onClick={()=>showVideo(movie.id)} />
                    )
                })
            }            
        </div>
        { videoId ?
        videoId==="No videos"?
        
        <div className='video-preview'>
            <h3>YOUTUBE</h3>
            <button className='closebtn' style={{top:'0'}}><i className="fa-solid fa-square-xmark" onClick={setNull}></i></button>
            <h6 style={{color:'#b00612',textAlign:'center',fontSize:'2rem'}}>No Trailers Released.</h6>
        </div>
        :<div className='video-preview'>
            <button className='closebtn' ><i className="fa-solid fa-xmark" onClick={setNull}></i></button>
           <Youtube videoId={videoId} opts={opts} style={{borderRadius:'10px'}} /> 
        </div>
        :  null}
    </div>
  )
}

export default MoviePoster
