import express from 'express';
import * as countriesController from '../Controller/countriesController';

const router = express.Router();

router.get('/all', countriesController.getAllCountries);
router.get('/name/:name', countriesController.getCountriesByName);
router.get('/region/:region', countriesController.getCountriesByRegion);
router.get('/alpha/:code', countriesController.getCountryByCode);
router.get('/regioncode/:code', countriesController.getCountriesByRegionCode);

export default router;