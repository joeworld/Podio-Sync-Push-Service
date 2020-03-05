//Environment file
require('dotenv').config();
//Server file
const server = require('./Server/Index.js');
//Port number
const PORT = process.env.PORT || 5000;
//Listening to port
server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`)); //