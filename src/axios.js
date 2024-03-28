import axios from 'axios'
import { BASE_URL } from './Constants/Constants'

const instance = axios.create({
    baseURL: BASE_URL,
    headers:{
        Accept:'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGU5MzdmMjU5NzA4NDZhYTU3YWQ1ZmMxMDA5NjQxNiIsInN1YiI6IjY1ZmJkODJiMDQ3MzNmMDEzMWU1ZDk3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qsEM8PDyuV6pc_g_MBZv0COfrNihuueRtWmF_lSFCW4'
    }
  });

export  default instance