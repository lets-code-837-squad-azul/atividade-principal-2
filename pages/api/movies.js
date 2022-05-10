import connectToDatabase from "../../lib/mongodb";

export default async function (req, res) {
    
    const db = await connectToDatabase();

    if (req.method == "GET") {
        const movies = await db
            .collection("movies")
            .find({ year: 2015})
            .sort({ title: 1 })
            .toArray();
        res.json(movies);
    }
}