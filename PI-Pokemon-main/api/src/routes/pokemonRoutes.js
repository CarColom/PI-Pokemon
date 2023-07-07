const { Router } = require("express");
const {
    getPokemonHandler,
    postPokemonHandler,
    getPokemonHandlerId,
} = require("../Handlers/pokemonHandlers");

const pokemonRouter = Router();

pokemonRouter.get("/", getPokemonHandler);

pokemonRouter.post("/", postPokemonHandler);

pokemonRouter.get("/:id",  getPokemonHandlerId);





module.exports = pokemonRouter;