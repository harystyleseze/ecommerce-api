import http from "http"; //allows the app to communicate over the internet by adhering to the HTTP protocol
import app from "./app/app.js"; //bring in the app

//create the server
const PORT = process.env.PORT || 2030;
const server = http.createServer(app); //parse in the express app
server.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
