const express = require("express")
const router = express.Router();
const requireAdminAuth = require("../../middleware/requirAdminAuth")
const requirVendorAuth = require("../../middleware/requirVendorAuth")
const {adminSignin, adminSignup, adminForgotPassword, adminResetPassword} = require("../../controllers/auth/admin/adminAuth")
const {vendorSignin, vendorSignup, listAllVendor, updateActiveVendor, updateVendor, vendorForgotPassword, vendorResetPassword, getSingleVendor} = require("../../controllers/auth/vendor/vendorAuth")
const {getVendorActivity, addVendorActivity} = require("../../controllers/activity/vendor/vendorActivityControll")
const {getAdminActivity, addAdminActivity} = require("../../controllers/activity/admin/adminActivityControll")
const {addNewServiceCategory, getAllServiceCategory, getSingleServiceCategory, updateSingleCategory} = require("../../controllers/service-category/index")
const {addService, listAllService, listServiceByVendorId, listServiceByCategoryId, updateSingleService, updateServiceStatusWithVendorStatus, updateServiceStatusWithCategoryStatus} = require("../../controllers/service/index")
const {createCustomer, listCustomer, listCustomerByServiceId, listCustomerByServiceCategoryId, listCustomerByVendorId} = require("../../controllers/customer/index")

// Admin API
router.post('/signin/admin', adminSignin);
// router.post('/signup/admin', adminSignup);
router.post('/signin/admin', adminSignin);
router.post('/forgot-password/admin', adminForgotPassword);
router.patch('/reset-password/admin/:id/:token', adminResetPassword);
router.get('/admin/:id/activity', requireAdminAuth, getAdminActivity);
router.post('/admin/:id/activity', requireAdminAuth, addAdminActivity);
router.get('/admin/vendors', requireAdminAuth, listAllVendor);
router.patch('/admin/vendor/:id', requireAdminAuth, updateActiveVendor);
router.get('/admin/vendor/:id', requireAdminAuth, getSingleVendor);
router.post('/admin/services/cat/add', requireAdminAuth, addNewServiceCategory);
router.get('/admin/services/cat/:id', requireAdminAuth, getSingleServiceCategory);
router.get('/admin/services/cat', requireAdminAuth, getAllServiceCategory);
router.patch('/admin/services/cat/edit/:id', requireAdminAuth, updateSingleCategory);
router.get('/admin/services/all', requireAdminAuth, listAllService);
router.patch('/admin/services/groupby/vendor/edit', requireAdminAuth, updateServiceStatusWithVendorStatus);
router.patch('/admin/services/groupby/category/edit', requireAdminAuth, updateServiceStatusWithCategoryStatus);
router.get('/admin/services/groupby/category/:id', requireAdminAuth, listServiceByCategoryId);
router.get('/admin/services/groupby/createdby/:id', requireAdminAuth, listServiceByVendorId);


// vendor
router.post('/signin/vendor', vendorSignin);
router.post('/signup/vendor', vendorSignup);
router.get('/vendor/:id', requirVendorAuth, getSingleVendor);
router.patch('/vendor/edit/:id', requirVendorAuth, updateVendor);
router.post('/forgot-password/vendor', vendorForgotPassword);
router.patch('/reset-password/vendor/:id/:token', vendorResetPassword);
router.get('/vendor/:id/activity', requirVendorAuth, getVendorActivity);
router.post('/vendor/:id/activity', requirVendorAuth, addVendorActivity);
router.post('/vendor/services/cat/add', requirVendorAuth, addNewServiceCategory);
router.get('/vendor/services/cat/:id', requirVendorAuth, getSingleServiceCategory);
router.get('/vendor/services/cat', requirVendorAuth, getAllServiceCategory);
router.post('/vendor/services/add', requirVendorAuth, addService);
router.get('/vendor/services/groupby/createdby/:id', requirVendorAuth, listServiceByVendorId);
router.patch('/vendor/service/edit/:id', requireAdminAuth, updateSingleService);

// Global

router.get('/global/services/category/all', getAllServiceCategory);
router.get('/global/services/groupby/category/:id', listServiceByCategoryId);
router.post('/global/customer/add', createCustomer);
router.get('/global/customer/all', listCustomer);
router.get('/global/customer/groupby/service/:id', listCustomerByServiceId);
router.get('/global/customer/groupby/service/category/:id', listCustomerByServiceCategoryId);
router.get('/global/customer/groupby/createdby/:id', listCustomerByVendorId);

module.exports = router;