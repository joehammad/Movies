import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'





export default function Home() {
  let navigate =useNavigate();
  function goToDetails(id){
    navigate({
      pathname:'/MovieDetails',
      search:`?id=${id}`
    })
  }
  const [TvShow, setTvShow] = useState([]);
const [Movies, setMovies] = useState([]);
let baseUrl = 'https://image.tmdb.org/t/p/original/'
async function getMovies(){
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
  return (
    <>
    <div className='row '>
      <div className='col-md-4 d-flex align-items-center'>
        <div >
      <div className='brdr mb-3'></div>
        <h2>Trending</h2>
        <h2>Movies</h2>
        <h2>To Watch Now</h2>
        <p className='secondColor  mb-3'>Most Watched Movies By Days</p>
        <div className='brdr2'></div>
        </div>
      </div>
      {Movies.map((movie,index)=> 
      <div onClick={()=>goToDetails(movie.id)} className='col-md-2 my-3' key={index}>
         <Link style={{ textDecoration: 'none',color:"#fff" }} to={`/MovieDetails/${movie.id}`}>
        <img src={baseUrl + movie.poster_path} className='w-100' />
        <div>{movie.title}</div>
        </Link>
      </div>
      )}
    </div>
    <div className='row mt-4'>
      <div className='col-md-4 d-flex align-items-center'>
        <div >
      <div className='brdr mb-3'></div>
        <h2>Trending</h2>
        <h2>Tv Shows</h2>
        <h2>To Watch Now</h2>
        <p className='secondColor  mb-3'>Most Watched Tv Shows By Days</p>
        <div className='brdr2'></div>
        </div>
      </div>
      {TvShow.map((show,index)=> 
      <div className='col-md-2 my-3' key={index}>
        <Link style={{ textDecoration: 'none',color:"#fff" }} to={`/MovieDetails/${show.id}`}>
        <img src={baseUrl + show.poster_path} className='w-100' />
        <div>{show.name}</div>
        </Link>
          
      </div>
      )}
    </div>
    
    </>
  )
}
