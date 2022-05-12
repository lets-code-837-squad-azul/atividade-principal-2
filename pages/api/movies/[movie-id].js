import clientPromise from "../../../lib/mongodb";

//  Variável de Ambiente que armazena o nome do banco de dados 
const mongodb = process.env.MONGODB_DB

export default async function handler(req, res) {
    
    //  Informações do Banco
    const client = await clientPromise;
    const db = client.db(mongodb);

    switch (req.method) {

        case "PUT":
            //  Realiza o UPDATE

            const filmeAtualizado = JSON.parse(req.body);
            const atualizarFilme = await db
                .collection("movie")
                .updateOne({ 
                    title: filmeAtualizado.title }, {
                        $set:
                            { lastupdated: filmeAtualizado.lastupdated }
                    }
                );
            res.json({ body: atualizarFilme });
            break;

        case "DELETE":
            //  Realiza o DELETE

            const deletarFilme = await db
                .collection("movies")
                .deleteOne({ _id: req.query['movie-id'] });
            res.json({ body: deletarFilme });
            break;
    }
}
