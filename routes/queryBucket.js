const Express = require("express");
const router = Express();
var Couchbase = require("couchbase");
const cluster = new Couchbase.Cluster('couchbase://' + process.env.COUCHBASE_HOST);
cluster.authenticate(process.env.COUCHBASE_ADMINISTRATOR_USERNAME, process.env.COUCHBASE_ADMINISTRATOR_PASSWORD);
const bucket = cluster.openBucket(process.env.COUCHBASE_BUCKET, process.env.COUCHBASE_BUCKET_PASSWORD);
const N1qlQuery = Couchbase.N1qlQuery;

function queryCallback(whereStmt) {
    return function (request, response) {
        let queryStr = "SELECT `" + bucket._name + "`.* FROM `" + bucket._name + "`";
        if (whereStmt)
            queryStr += whereStmt;
        let query = N1qlQuery.fromString(queryStr);
        bucket.query(query, function (error, result) {
            if (error) {
                return response.status(500).send(error);
            }
            response.send(result);
        });
    }
}

router.get("/get", queryCallback("WHERE location='San Francisco'"));//debug check

/** route to get all values in the bucket */
router.get("/getAll", queryCallback(null));


/* route to get all users  */
router.get("/getUsers", queryCallback("WHERE type=`user`"));

/* route to get all recommendations  */
router.get("/getRecommendations", queryCallback("WHERE type=`recommendation`"));


/* route to get a user with specific id  */
// ':id' is a generic path therefore it should be put under all
// other '/getUser' get handlers. otherwise the handler will never
// be used cause it will be "absorbed" by the generic handler
/* TODO */
router.get("/getUser/:id", queryCallback("WHERE type=`user`"));

/* route to get a recommendation based on recommender's id  */


/* route to get a recommendation based on location  */


module.exports = router;