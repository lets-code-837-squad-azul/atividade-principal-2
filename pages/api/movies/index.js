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

            const filtro_ano = req.query['year'] ? parseInt(req.query['year']) : 2015;
            const filtro_limit = parseInt(req.query['limit']) || 10;
            const movies = await db
                .collection("movies")
                .find({ year: filtro_ano })
                .sort({ title: 1 })
                .limit(filtro_limit)
                .toArray();
                console.log(movies)
                res.json({ body: movies});      
            break;
        
        case "POST":
            //  Realiza o INSERT INTO (CREATE)
            
            const novoFilme = JSON.parse(req.body);
            const inserirFilme = await db
                .collection("movies")
                .insertOne(novoFilme);
            res.json({ body: inserirFilme });
            break;
    }
}
