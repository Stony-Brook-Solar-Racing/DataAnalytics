module.exports = (app) => {
    var db = require("../controllers/controller.js");

    app.get("/data", db.retrieveAllData);
}