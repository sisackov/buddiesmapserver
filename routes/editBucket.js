const Express = require("express");
const router = Express();
const Couchbase = require("couchbase");
const cluster = new Couchbase.Cluster('couchbase://' + process.env.COUCHBASE_HOST);
cluster.authenticate(process.env.COUCHBASE_ADMINISTRATOR_USERNAME, process.env.COUCHBASE_ADMINISTRATOR_PASSWORD);
const bucket = cluster.openBucket(process.env.COUCHBASE_BUCKET, process.env.COUCHBASE_BUCKET_PASSWORD);
//const N1qlQuery = Couchbase.N1qlQuery;

const BodyParser = require("body-parser");
const UUID = require("uuid");
router.use(BodyParser.json());

router.post("/save", function (request, response) {
    bucket.insert(UUID.v4(), request.body, function (error, result) {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


module.exports = router;