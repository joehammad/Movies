import { createContext,useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export let MediaContext = createContext([]);

export function MediaContextProvider(props)
{
    
  const [TvShow, setTvShow] = useState([]);
  const [Movies, setMovies] = useState([]);
  
  async function getMovies()
  {
    let {data}= await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=dab0706c5596743d9bd8fecdbefa315e')
    setMovies(data.results);
    
  }
  async function getTvShow(){
    let {data}= await axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=dab0706c5596743d9bd8fecdbefa315e')
    setTvShow(data.results);
  }
  
   useEffect(()=>{
    getMovies();
    getTvShow();
  
   },[])
    return <MediaContext.Provider value={{TvShow , Movies}}>
        {props.children}
    </MediaContext.Provider>
}
