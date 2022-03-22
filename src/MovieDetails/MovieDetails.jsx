import React from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function MovieDetails() {

  const [Movie, setMovies] = useState({})

  let [searchParam, setSearchParam] = useSearchParams();
  let currentId = searchParam.get('id');

  let baseUrl = 'https://image.tmdb.org/t/p/original/'

  async function getDetails() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${currentId}?api_key=dab0706c5596743d9bd8fecdbefa315e&language=en-US`);

    setMovies(data);
  }

  useEffect(() => {
    getDetails();
  }, [])

  return (
    <div className='row'>
      <div className='col-md-4 p-3'>
        <img src={baseUrl + Movie.poster_path} className='w-100 ' />
      </div>
      <div className='col-md-8 p-4'>
        <h2> {Movie.title}</h2>
        <h4 className='secondColor'> {Movie.tagline}</h4>
        <p className='my-4'>
          Vote: {Movie.vote_average}
        </p>
        <p className='my-4'>
          Vote Count: {Movie.vote_count}
        </p>
        <p className='my-4'>
          Popularity: {Movie.popularity}
        </p>
        <p className='my-4'>
          Release date: {Movie.release_date}
        </p>
        <h5 className='secondColor'>
          {Movie.overview}
        </h5>
      </div>
    </div>
  )
}
