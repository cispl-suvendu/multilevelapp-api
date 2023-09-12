const express = require("express")
const router = express.Router();
const requireAdminAuth = require("../../middleware/requirAdminAuth")
const requirVendorAuth = require("../../middleware/requirVendorAuth")
const {adminSignin, adminSignup, adminForgotPassword, adminResetPassword} = require("../../controllers/auth/admin/adminAuth")
const {vendorSignin, vendorSignup, listAllVendor, updateActiveVendor, updateVendor, vendorForgotPassword, vendorResetPassword} = require("../../controllers/auth/vendor/vendorAuth")
const {getVendorActivity, addVendorActivity} = require("../../controllers/activity/vendor/vendorActivityControll")
const {getAdminActivity, addAdminActivity} = require("../../controllers/activity/admin/adminActivityControll")

// Admin API
router.post('/signin/admin', adminSignin);
// router.post('/signup/admin', adminSignup);
router.post('/signin/admin', adminSignin);
router.post('/forgot-password/admin', adminForgotPassword);
router.patch('/reset-password/admin/:id/:token', adminResetPassword);
router.get('/admin/:id/activity', requireAdminAuth, getAdminActivity);
router.post('/admin/:id/activity', requireAdminAuth, addAdminActivity);
router.get('/vendors', requireAdminAuth, listAllVendor);
router.patch('/vendor/:id', requireAdminAuth, updateActiveVendor);


// vendor
router.post('/signin/vendor', vendorSignin);
router.post('/signup/vendor', vendorSignup);
router.patch('/vendor/edit/:id', requirVendorAuth, updateVendor);
router.post('/forgot-password/vendor', vendorForgotPassword);
router.patch('/reset-password/vendor/:id/:token', vendorResetPassword);
router.get('/vendor/:id/activity', requirVendorAuth, getVendorActivity);
router.post('/vendor/:id/activity', requirVendorAuth, addVendorActivity);

module.exports = router;