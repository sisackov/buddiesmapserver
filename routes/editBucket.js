const Express = require("express"), router = Express(), Couchbase = require("couchbase"),
    cluster = new Couchbase.Cluster('couchbase://' + process.env.COUCHBASE_HOST);
cluster.authenticate(process.env.COUCHBASE_ADMINISTRATOR_USERNAME, process.env.COUCHBASE_ADMINISTRATOR_PASSWORD);
const bucket = cluster.openBucket(process.env.COUCHBASE_BUCKET, process.env.COUCHBASE_BUCKET_PASSWORD);
//const N1qlQuery = Couchbase.N1qlQuery;

const BodyParser = require("body-parser");
const UUID = require("uuid");
router.use(BodyParser.json());

/** route for saving a user sent as JSON   */
router.post("/saveUser", function (request, response) {
    bucket.insert(UUID.v4(), request.body, function (error, result) {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

/** route for saving a recommendation sent as JSON   */
router.post("/saveRecommendation", function (request, response) {
    bucket.insert(UUID.v4(), request.body, function (error, result) {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

/** route for deleting a user sent as id number   */

/** route for deleting a recommendation sent as id number
 * TODO - how to generate recommendation IDs?*/



module.exports = router;