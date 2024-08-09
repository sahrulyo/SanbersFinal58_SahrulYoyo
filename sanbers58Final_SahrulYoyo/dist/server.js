"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./utils/database"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const path = require('path');
const dotenv_1 = __importDefault(require("dotenv"));
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
    dotenv_1.default.config({ path: path.resolve(__dirname, './.env') });
}
else {
    dotenv_1.default.config(); // Load default .env file for production
}
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Initialize database connection
(0, database_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Serve static files from the "public" directory
app.use(express_1.default.static(path.join(__dirname, '../public')));
// Serve a specific file for the /ui route
app.get('/ui', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
// Use routes defined in the routes file
app.use("/api", routes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map