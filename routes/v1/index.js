const express = require("express")
const router = express.Router();
const requireAdminAuth = require("../../middleware/requirAdminAuth")
const requirVendorAuth = require("../../middleware/requirVendorAuth")
const {adminSignin, adminSignup, adminForgotPassword, adminResetPassword} = require("../../controllers/auth/admin/adminAuth")
const {vendorSignin, vendorSignup, listAllVendor, updateActiveVendor, updateVendor, vendorForgotPassword, vendorResetPassword} = require("../../controllers/auth/vendor/vendorAuth")


// Admin
router.post('/signin/admin', adminSignin);
// router.post('/signup/admin', adminSignup);
router.post('/signin/admin', adminSignin);
router.post('/forgot-password/admin', adminForgotPassword);
router.patch('/reset-password/admin/:token', adminResetPassword);

// vendor
router.post('/signin/vendor', vendorSignin);
router.post('/signup/vendor', vendorSignup);
router.get('/vendors', requireAdminAuth, listAllVendor);
router.patch('/vendor/:id', requireAdminAuth, updateActiveVendor);
router.patch('/vendor/edit/:id', requirVendorAuth, updateVendor);
router.post('/forgot-password/vendor', vendorForgotPassword);
router.patch('/reset-password/vendor/:token', vendorResetPassword);



module.exports = router;