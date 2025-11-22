const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getRidesPerHour,
  getRevenueMetrics,
  getRecentTrips
} = require('../controllers/admin/dashboardController');

const {
  getAllDrivers,
  getDriverStats,
  getDriverById,
  getDriverTrips,
  createDriver,
  updateDriverStatus,
  uploadDocuments
} = require('../controllers/admin/driverController');

const {
  getDailyTrips,
  getWeeklyPerformance,
  getMonthlyPerformance
} = require('../controllers/admin/tripController');



//dashboard routes
router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/rides-per-hour', getRidesPerHour);
router.get('/dashboard/revenue-metrics', getRevenueMetrics);
router.get('/dashboard/recent-trips', getRecentTrips);

//driver routes
router.get('/drivers', getAllDrivers);
router.get('/drivers/stats', getDriverStats);
router.get('/drivers/:id', getDriverById);
router.get('/drivers/:id/trips', getDriverTrips);
router.post('/drivers/', createDriver);
router.patch('/drivers/:id/status', updateDriverStatus);
router.post('/drivers/:id/documents', uploadDocuments);


// Trip management routes
router.get('/trips/daily', getDailyTrips);
router.get('/trips/weekly', getWeeklyPerformance);
router.get('/trips/monthly', getMonthlyPerformance);


module.exports = router;