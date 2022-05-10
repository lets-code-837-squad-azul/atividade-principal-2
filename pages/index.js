const URL = process.env.BASE_URL;

export default function Home({ movies: movies_array }) {

  return (
    <div className="container">
      <h1>Filmes de 2015</h1>

      <ul>
        {movies_array.map((movie, index) => {
          return <li key={index}>{movie.title}</li>
        }) }
      </ul>
    </div>
  )
}

export async function getServerSideProps(context) {

  const movies = await (await fetch(URL + "api/movies")).json();
  // const response = await fetch(URL + "api/movies");
  // const movies = await response.json();

  return { props: { movies } }
}