import express from "express";
import db from "./utils/database";
import routes from "./routes";
import bodyParser from "body-parser";
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

db();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/ui', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
