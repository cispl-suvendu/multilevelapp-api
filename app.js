require('dotenv').config();
var cors = require('cors');
const express = require("express");
const app = express();
const contentDB = require("./db/connection")
app.use(express.json({ limit: '50mb', extended: true }));
app.use(cors())



const PORT = 5000 || process.env.PORT;

const index_route = require("./routes/index");

app.get("/", (req, res) => {
    res.send('Hi I am Live')
})



app.use("/", index_route);

let isConnected = false; // track the connection

const start = async () => {
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await contentDB();
        app.listen(PORT, () => {
            isConnected = true;
            console.log(`${PORT} conected`)
            console.log('MongoDB connected')
        })
    } catch (error) {
        console.log(error)
    }
}

start();