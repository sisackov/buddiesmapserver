const Express = require("express");
const app = Express();

app.get("/", function (request, response) {
    response.send("Try using the `/get` or `/save` endpoints!");
});

var server = app.listen(process.env.APPLICATION_PORT || 3000, function () {
    console.log("Listening on port " + server.address().port + "...");
});

// import routes
const queryBucket = require('./routes/queryBucket');
const editBucket = require('./routes/editBucket');

// set API routes
app.use('/query', queryBucket);
app.use('/editBucket', editBucket);

module.exports = app;