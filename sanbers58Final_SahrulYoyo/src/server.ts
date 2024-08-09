import express from "express";
import db from "./utils/database";
import routes from "./routes";
import bodyParser from "body-parser";
const path = require('path');
import dotenv from 'dotenv';

// const app = express();
// const PORT = process.env.PORT || 3000;

// db();


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, '../public')));

// app.get('/ui', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public', 'index.html'));
// });


// app.use("/api", routes);

// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });
// Load environment variables from .env file
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.resolve(__dirname, './.env') });
} else {
  dotenv.config(); // Load default .env file for production
}

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database connection
db();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve a specific file for the /ui route
app.get('/ui', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Use routes defined in the routes file
app.use("/api", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`);
});