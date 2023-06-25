const express = require("express");
const router =  express.Router();
const cacheMiddleware = require("../utils/middlewares/cache.middleware")
const validateApiKey = require("../utils/middlewares/authMiddleWare");
const { 
    getData,
    getRegions,
    getStates,
    getRegionState,
    getStateLga,
    getStateMetadata,
    getOneRegion,
    getOneState,
 } = require("../controllers/nigeriaData.controller")


//@Desc full search ( region-states-lga-metadata)
// url path '/search'
// router.get("/",  validateApiKey,cacheMiddleware, getData);
router.get("/", validateApiKey, getData);

//@Desc search for regions Only
// url path '/search/regions'
router.get("/regions", validateApiKey,cacheMiddleware,  getRegions);

//@Desc search for States Only
// url path '/search/states'
router.get("/states",  validateApiKey,cacheMiddleware, getStates);

//@Desc search for regions with their corresponding States Only
// url path '/search/region-state'
router.get("/region-state",  validateApiKey,cacheMiddleware, getRegionState);


//@Desc search for States with their corresponding local govt.areas Only
// url path '/search/state-lga'
router.get("/state-lga",  validateApiKey,cacheMiddleware, getStateLga);


//@Desc search for States with their corresponding meta data Only
// url path '/search/state-data'
router.get("/state-data",  validateApiKey,cacheMiddleware, getStateMetadata);


//----------------Query A value-----------------------
//@Desc search for A region it's data
// url path '/search/regions/:regionName'
router.get("/regions/:regionName", validateApiKey,cacheMiddleware,  getOneRegion);

//@Desc search for A State and it's data
// url path '/search/states/:stateName'
router.get("/states/:stateName", validateApiKey,cacheMiddleware,  getOneState);


module.exports = router;