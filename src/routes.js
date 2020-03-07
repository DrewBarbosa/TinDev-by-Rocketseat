const express = require("express");
const DevController = require("./controllers/DevController");
const routes = express.Router();
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.post("/devs/:devId/likes", LikeController.store);
routes.post("/devs/:devId/dislikes", DislikeController.store);

module.exports = routes;
