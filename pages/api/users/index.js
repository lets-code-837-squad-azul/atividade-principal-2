import clientPromise from "../../../lib/mongodb";

//  Variável de Ambiente que armazena o nome do banco de dados 
const mongodb = process.env.MONGODB_DB

export default async function handler(req, res) {
    
    //  Informações do Banco
    const client = await clientPromise;
    const db = client.db(mongodb);

    switch (req.method) {

        case "GET":
            //  Realiza o SELECT (READ)

            // const filtro_nome = req.query['name'] ? req.query['name'] : "Ned Stark";
            const filtro_nome = req.query['name'] ? req.query['name'] : null;
            const filtro_limit = parseInt(req.query['limit']) || 15;

            if (filtro_nome) {
                const users = await db
                .collection("users")
                .find({ name: filtro_nome })
                .sort({ name: 1 })
                .limit(filtro_limit)
                .toArray();
                res.json({ body: users});
            }
            else {
                const users = await db
                .collection("users")
                .find()
                .sort({ name: 1 })
                .limit(filtro_limit)
                .toArray();
                res.json({ body: users});
            }
            break;
        
        case "POST":
            //  Realiza o INSERT INTO (CREATE)
            
            const novoUsuario = JSON.parse(req.body);
            const inserirUsuario = await db
                .collection("users")
                .insertOne(novoUsuario);
            res.json({ body: inserirUsuario });
            break;
    }
}
