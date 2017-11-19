const path = require("path");

const express = require("express");

const root = path.join(__dirname, "../public");
const port = process.env.PORT || 3000
const app = express();

app.use((req, res, next)=>{
    console.log(req.method, req.url);
    next();
});

app.use(express.static(root));

app.listen(port, ()=> console.log(`app is running on port ${port}`));

