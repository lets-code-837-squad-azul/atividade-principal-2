import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

//  Variável de Ambiente que armazena o nome do banco de dados 
const mongodb = process.env.MONGODB_DB

export default async function handler(req, res) {
    
    //  Informações do Banco
    const client = await clientPromise;
    const db = client.db(mongodb);
    
    const id_do_usuario = req.query['user-id'];

    switch (req.method) {

        case "PUT":
            //  Realiza o UPDATE

            const usuarioAtualizado = JSON.parse(req.body);
            const atualizarUsuario = await db
                .collection("users")
                .updateOne({ 
                    _id: ObjectId(id_do_usuario) }, {
                        $set:
                            { lastupdated: usuarioAtualizado.lastupdated }
                    }
                );
            res.json({ body: atualizarUsuario });
            break;

        case "DELETE":
            //  Realiza o DELETE

            const deletarUsuario = await db
                .collection("users")
                .deleteOne({ _id: ObjectId(id_do_usuario) });
            res.json({ body: deletarUsuario });
            break;
    }
}
