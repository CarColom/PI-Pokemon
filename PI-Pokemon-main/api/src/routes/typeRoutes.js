const { Router } = require("express");
const {
    getTypesHandler
} = require("../Handlers/typeHanldres");

const typesRouter = Router();

typesRouter.get("/", getTypesHandler);


module.exports = typesRouter;