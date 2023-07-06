const NaijaData = require("../model/naija.model");
const Cache = require("../utils/CONFIG/redis.config");
const asyncHandler = require("../utils/middlewares/AsyncHandler");
const CustomError = require("../utils/error/customError");
const states = require("../nigeria-states-and-local-govts/r-s-l.json")

//function to populate states
exports.addStates = asyncHandler(async (req, res, next) => {
   //import that json file
   //console.log(states)
   // console.log(JSON.parse(states))
   states.geopolitical_regions.forEach(async region => {
      const state = new NaijaData({
         name: region.name,
         states: region.states
      })
      await state.save()
   });
   const regions = await NaijaData.find()
   res.status(200).json(regions);
})


//function to get full Json file of Nigeria regions, states,lgas and metadata
exports.getData = asyncHandler(async (req, res, next) => {
   
   const nigeriaData = await NaijaData.find();
   if (process.env.NODE_ENV !== 'test') {
      //set cache
      const cacheKey = req.originalUrl.toLowerCase();
      Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(nigeriaData));
   }
   res.status(200).json(nigeriaData)
})

//function to get  Nigeria regions ONLY
exports.getRegions = asyncHandler(async (req, res, next) => {
   console.log("im here")
   const nigeriaData = await NaijaData.find({});
   if (!nigeriaData) {
      const error = new CustomError("file not found!", 404);
      return next(error);
   }
   const region = nigeriaData.map((region) => region.name);
   if (process.env.NODE_ENV !== 'test') {
      //set cache
      const cacheKey = req.originalUrl.toLowerCase();
      Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(region));
   }
   res.status(200).json(region);
})

//function to get  Nigeria States ONLY

exports.getStates = asyncHandler(async (req, res, next) => {
   const nigeriaData = await NaijaData.find({});
   if (!nigeriaData) {
      const error = new CustomError("file not found!", 404);
      return next(error);
   }
   const states = []
   let statesResult = []
   for (let i = 0; i < nigeriaData.length; i++) {
      states.push(nigeriaData[i].states.map((state) => state.name));
   }
   if (states) {
      statesResult = states.flat();
   }
   if (process.env.NODE_ENV !== 'test') {
      //set cache
      const cacheKey = req.originalUrl.toLowerCase();
      Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(statesResult));
   }
   res.status(200).json(statesResult);
})

//function to get  Nigeria Regions and corresponding States ONLY

exports.getRegionState = asyncHandler(async (req, res, next) => {
   const nigeriaData = await NaijaData.find({});
   if (!nigeriaData) {
      const error = new CustomError("file not found!", 404);
      return next(error);
   }
   const regionState = nigeriaData.map((region => {
      return {
         regions: region.name,
         states: region.states.map((state) => state.name
         )
      }
   }))
   console.log(regionState)
   if (process.env.NODE_ENV !== 'test') {
      //set cache
      const cacheKey = req.originalUrl.toLowerCase();
      Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(regionState));
   }
   
   res.status(200).json(regionState)

})

//function to get  Nigeria Sates and corresponding Locat govt. areas ONLY
exports.getStateLga = asyncHandler(async (req, res, next) => {
   const nigeriaData = await NaijaData.find({});
   if (!nigeriaData) {
      const error = new CustomError("file not found!", 404);
      return next(error);
   }
   let stateLga = [];
   for (let i = 0; i < nigeriaData.length; i++) {

      stateLga.push(nigeriaData[i].states.map((state) => {
         return {
            states: state.name,
            lgas: state.lgas
         }
      }))
   }
   if (process.env.NODE_ENV !== 'test') {
      //set cache
      const cacheKey = req.originalUrl.toLowerCase();
      Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(stateLga));
   }
   res.status(200).json(stateLga);
})

//function to get  Nigeria Sates and corresponding Locat govt. areas ONLY
exports.getStateMetadata = asyncHandler(async (req, res, next) => {
   const nigeriaData = await NaijaData.find({});
   if (!nigeriaData) {
      const error = new CustomError("file not found!", 404);
      return next(error);
   }
   let stateMetadata = [];
   for (let i = 0; i < nigeriaData.length; i++) {

      stateMetadata.push(nigeriaData[i].states.map((state) => {
         return {
            states: state.name,
            metadata: state.metadata
         }
      }))
   }
   if (process.env.NODE_ENV !== 'test') {
      //set cache
      const cacheKey = req.originalUrl.toLowerCase();
      Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(stateMetadata));
   }

   res.status(200).json(stateMetadata);
})

//-----------Query for One Value------------

//Query for a Region
exports.getOneRegion = asyncHandler(async (req, res, next) => {
   let regionName = req.params.regionName;
   regionName = regionName.toLowerCase().split(" ");
   regionName = regionName.map(region => region.charAt(0).toUpperCase() + region.slice(1));
   regionName = regionName.join(" ");

   const data = await NaijaData.findOne({ name: regionName })
   if (!data) {
      // const error = new CustomError("file not found!", 404);
      return next();
   }
   if (process.env.NODE_ENV === "test") {
      //set cache
      const cacheKey = req.originalUrl.toLowerCase();
      Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(data));
   }
   res.status(200).json(data);

})

//Query for a State
exports.getOneState = asyncHandler(async (req, res, next) => {
   let stateName = req.params.stateName;
   stateName = stateName.toLowerCase().split(" ");
   stateName = stateName.map(state => state.charAt(0).toUpperCase() + state.slice(1));
   stateName = stateName.join(" ");

   const nigeriaData = await NaijaData.find({});
   if (!nigeriaData) {

      return next();
   }
   const states = []
   let statesResult = []
   for (let i = 0; i < nigeriaData.length; i++) {
      states.push(nigeriaData[i].states.map((state) => {
         return {
            state: state.name,
            lgas: state.lgas,
            metadata: state.metadata
         }
      }
      ));
   }
   if (states) {
      statesResult = states.flat();
   }
   for (let i = 0; i < statesResult.length; i++) {
      if (statesResult[i].state == stateName) {

         const data = statesResult[i]
         if (process.env.NODE_ENV !== 'test') {
            //set cache
            const cacheKey = req.originalUrl.toLowerCase();
            Cache.redis.SETEX(cacheKey, 3600, JSON.stringify(data));
         }
         return res.status(200).json(statesResult[i]);
      }
   }
   next()
})
