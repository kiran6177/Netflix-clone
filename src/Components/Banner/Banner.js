import React,{useEffect, useState} from 'react'
import './Banner.css'
import { IMAGE_URL } from '../../Constants/Constants';
import axios from '../../axios';
import YouTube from 'react-youtube';

function Banner() {
  const [movie,setMovie] = useState()
  const [isChanging,setChange] = useState(false)
  const [play,setPlay] = useState(true)
  const [videoId,setVideoId] = useState()
  useEffect(() => {
    function fetch(){
      axios.get(`trending/all/day?language=en-US`)
    .then((res)=>{
      console.log(res.data)
      setMovie(res.data.results[Math.floor(Math.random()*20)])
      setInterval(()=>{
          setChange(true)
          setTimeout(() => {
            setMovie(res.data.results[Math.floor(Math.random() * 20)]);
            setTimeout(() => {
              setChange(false);
            }, 200); 
          }, 500);
      },10000)
    }).catch((err)=>console.log(err))
    }
    fetch()
  }, []);

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

  const setNull = ()=>{
    setPlay(true)
  }

  const playMovie = (id)=>{
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
      setPlay(false)
  }

  return (
    <div className='maindiv'>
    { play ?
    <div style={{backgroundImage:`url(${movie?IMAGE_URL+movie.backdrop_path : ""}`}} className={ `${isChanging? 'banner opacity':'banner'}`}>
        <div className={ `${isChanging? 'banner-content opacity':'banner-content'}`}>
            <h1>{movie ? movie.media_type==="tv"? movie.original_name :movie.original_title : ''}</h1>
            <h5>Watch Now</h5>
            <p className='description'>{movie ? movie.overview : ''}</p>
            <div className='banner-buttons'>
                <button onClick={()=>playMovie(movie.id)}><i className="fa-solid fa-play" ></i> Play</button>
                <button><i className="fa-solid fa-plus"></i>My List</button>
            </div>
        </div>
        <div className='banner-fade'></div>
    </div>
    :
      <div className='bannervideo-preview'>
        <button className='closebtn' onClick={setNull}><i className="fa-solid fa-xmark" ></i></button>
        <YouTube videoId={videoId} opts={opts} style={{borderRadius:'10px'}} /> 
      </div>
    }
    </div>
  )
}

export default Banner
