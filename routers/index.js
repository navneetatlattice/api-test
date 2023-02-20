const { Router } = require('express');
const { addContacts, getContacts, getContactsById, searchContacts } = require('../controllers/employee');
const { addSiteInformation, getSiteInformationByCustomerId } = require('../controllers/cutomerController');

const router = require('express').Router();

// Employee
router.route('/employee/validate').post()
router.route('/employee/signin').post()

// Contacts
router.route('/employee/contacts').get(getContacts)
    .post(addContacts);
router.route('/employee/contacts/search').get(searchContacts)
router.route('/employee/contacts/:contactId').get(getContactsById)

// Customer
router.route('/customer/sitedetails')
    .post(addSiteInformation)
router.route('/customer/:customerId/sitedetails')
    .get(getSiteInformationByCustomerId)


module.exports = router;
