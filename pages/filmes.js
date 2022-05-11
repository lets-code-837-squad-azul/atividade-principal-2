import { useRef } from "react/cjs/react.development";

const URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home({ movies }) {

  const lista_de_filmes = movies.body;
  const input_post = useRef(null);
  const input_update = useRef(null);
  const input_delete = useRef(null);

  const post = async () => {
    //  Inserindo dados no Banco utilizando o método POST 

    const nome_do_filme = input_post.current.value;

    const res = await fetch(URL + "api/movies", {
      method: "POST",
      body: JSON.stringify({
        title: nome_do_filme,
        year: 2015
      })
    })
    console.log("POST =>", res);
  }

  const put = async () => {
    //  Atualizando dados no Banco utilizando o método PUT

    const data = Date().toLocaleString();
    const nome_do_filme = input_update.current.value;
    
    const res = await fetch(URL + "api/movies", {
      method: "PUT",
      body: JSON.stringify({
        title: nome_do_filme,
        lastupdated: data
      })
    })
    console.log("PUT", res);
  }

  const del = async () => {
    //  Excluindo dados do Banco utilizando o método DELETE

    const nome_do_filme = input_delete.current.value;

    const res = await fetch(URL + "api/movies", {
      method: "DELETE",
      body: JSON.stringify({ title: nome_do_filme })
    })
    console.log("DELETE", res);
  }

  return (
    <div className="container">
      <h1>Filmes de 2015</h1>

      <div>
        <label>Cria filme com o nome indicado, no ano 2015 </label>
        <input type="text" ref={input_post} placeholder="Nome do Filme (title)"></input>
        <button type="submit" onClick={post}>POST</button>
      </div>

      <br></br>

      <div>
        <label>Atualiza o "lastupdated" do filme com a data atual </label>
        <input type="text" ref={input_update} placeholder="Nome do Filme (title)"></input>
        <button type="submit" onClick={put}>PUT</button>
      </div>

      <br></br>

      <div>
        <label>Exclui o filme indicado </label>
        <input type="text" ref={input_delete} placeholder="Nome do Filme (title)"></input>
        <button type="submit" onClick={del}>DELETE</button>
      </div>

      <ul>
        {lista_de_filmes.map((movie, index) => {
          return <li key={index}>{movie.title}</li>
        })}
      </ul>
    </div>
  )
}

//  Esta função é executada toda vez que a página é carregada
export async function getServerSideProps(context) {

  //  Executa a query "GET" do api/movies.js
  const res = await fetch(URL + "api/movies", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  //  Armazena o conteúdo da query 
  const movies = await res.json();

  return { props: { movies } }
}
