import { useRef } from "react/cjs/react.development";

const URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home({ users }) {

  const lista_de_usuarios = users.body;
  const input_post = useRef(null);
  const input_update = useRef(null);
  const input_delete = useRef(null);
  const input_get_nome = useRef(null);
  const input_get_limit = useRef(null);

  const post = async () => {
    //  Inserindo dados no Banco utilizando o método POST 

    const nome_do_usuario = input_post.current.value;

    const res = await fetch(URL + "api/users", {
      method: "POST",
      body: JSON.stringify({
        name: nome_do_usuario,
        // year: 2015
      })
    })
    console.log("POST =>", res);
  }

  const put = async () => {
    //  Atualizando dados no Banco utilizando o método PUT

    const data = Date().toLocaleString();
    const id_do_usuario = input_update.current.value;
    
    const res = await fetch(URL + "api/users/" + id_do_usuario, {
      method: "PUT",
      body: JSON.stringify({
        lastupdated: data
      })
    })
    console.log("PUT =>", res);
  }

  const del = async () => {
    //  Excluindo dados do Banco utilizando o método DELETE

    const id_do_usuario = input_delete.current.value;

    const res = await fetch(URL + "api/users/" + id_do_usuario, {
      method: "DELETE"
    })
    console.log("DELETE =>", res);
  }

  const get = async () => {
    //  recebendo dados utilizando metodo GET
    // const nome = input_get_nome.current.value;
    const limit = input_get_limit.current.value;
    // const res = await fetch(URL + "api/users/nome="+nome+"&limit="+limit)
    const res = await fetch(URL + "api/users/limit="+limit)
    console.log("GET =>", res);
  }

  return (
    <div className="container">
      <h1>Usuários</h1>

      <div>
        <label>Cria usuário com o nome indicado: </label>
        <input type="text" ref={input_post} placeholder="Nome do usuário (name)"></input>
        <button type="submit" onClick={post}>POST</button>
      </div>

      <br></br>

      <div>
        <label>Atualiza o "lastupdated" do usuário com a data atual: </label>
        <input type="text" ref={input_update} placeholder="ID do usuário"></input>
        <button type="submit" onClick={put}>PUT</button>
      </div>

      <br></br>

      <div>
        <label>Exclui o usuário indicado: </label>
        <input type="text" ref={input_delete} placeholder="ID do usuário"></input>
        <button type="submit" onClick={del}>DELETE</button>
      </div>

      <br></br>

      <div>
        {/* {<label>Definir nome: </label>
        <input type="text" ref={input_get_nome}></input> } */}
        <label>&ensp; Tamanho da lista de usuários: </label>
        <input type="number" ref={input_get_limit}></input>
        <button type="submit" onClick={get}>PESQUISAR</button>
      </div>

      <ul>
        {lista_de_usuarios.map((users, index) => {
          return <li key={index}>{users.name}</li>
        })}
      </ul>
    </div>
  )
}

//  Esta função é executada toda vez que a página é carregada
export async function getServerSideProps(context) {

  //  Executa a query "GET" do api/users.js
  const res = await fetch(URL + "api/users", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  //  Armazena o conteúdo da query 
  const users = await res.json();
  return { props: { users } }
}