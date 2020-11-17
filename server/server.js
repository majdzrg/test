const express = require('express');
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require("cors");
var routes = require('./app/routes/routes');
const connectToDatabase = require("./config/connectToDatabase");

const app = express();
app.use(fileUpload({
    createParentPath: true,
    debug: true,
}))
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads',express.static(__dirname + 'uploads'));
// db connect
connectToDatabase();

// api routing
app.use('/api', routes);
// error handler
app.use((error, request, response, next) => {
    console.log(error);
    response.status(500).send("somthing went wrong")
})

let PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`Server is on port: ${PORT}`));