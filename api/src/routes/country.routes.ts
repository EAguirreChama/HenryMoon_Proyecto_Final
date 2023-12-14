import { Router } from "express";
import {
    createCountryHandler,
    getAllCountriesHandler,
    createManyCountriesHandler,
} from "../handlers/countryHandlers";

const countryRouter = Router();

// create Country
countryRouter.post("/", createCountryHandler);

// crea muchos countries
countryRouter.post("/many", createManyCountriesHandler);

countryRouter.get("/all", getAllCountriesHandler);

export default countryRouter;