require("dotenv").config()
const express = require("express")
const cacheMiddleware = require("../utils/middlewares/cache.middleware")
const validateApiKey = require("../utils/middlewares/authMiddleWare")
const {
    addStates,
    getData,
    getRegions,
    getStates,
    getRegionState,
    getStateLga,
    getStateMetadata,
    getOneRegion,
    getOneState,
} = require("../controllers/nigeriaData.controller")

const router = express.Router();

if (process.env.NODE_ENV === 'test') {
    router.get("/add", validateApiKey, addStates);
    router.get("/", validateApiKey, getData);
    router.get("/regions", validateApiKey, getRegions);
    router.get("/states", validateApiKey, getStates);
    router.get("/region-states", validateApiKey, getRegionState);
    router.get("/state-lgas", validateApiKey, getStateLga);
    router.get("/state-data", validateApiKey, getStateMetadata);
    // //----------------Query A value-----------------------
    router.get("/regions/:regionName", validateApiKey, getOneRegion);
    //Gets details about a state
    router.get("/states/:stateName", validateApiKey, getOneState);
} else {

    router.get("/add", validateApiKey, cacheMiddleware, addStates);
    router.get("/", validateApiKey, cacheMiddleware, getData);
    router.get("/regions", validateApiKey, cacheMiddleware, getRegions);
    router.get("/states", validateApiKey, cacheMiddleware, getStates);
    router.get("/region-states", validateApiKey, cacheMiddleware, getRegionState);
    router.get("/state-lgas", validateApiKey, cacheMiddleware, getStateLga);
    router.get("/state-data", validateApiKey, cacheMiddleware, getStateMetadata);
    // //----------------Query A value-----------------------
    router.get("/regions/:regionName", validateApiKey, cacheMiddleware, getOneRegion);
    //Gets details about a state
    router.get("/states/:stateName", validateApiKey, cacheMiddleware, getOneState);

}


module.exports = router;