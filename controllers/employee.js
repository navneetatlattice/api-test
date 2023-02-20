const { Op } = require('sequelize')
const { leads } = require('../models/Lattice')
const AppError = require("../utils/appError")

exports.vlidateEmployee = async (req, res, next) => {

}

exports.addContacts = async (req, res, next) => {
    try {
        const { salutation, name, contactType, phone, countryCode, classification, status, email, address } = req.body
        const newContact = await leads.create({ salutation, name, contactType, phone, countryCode, classification, status, email, address })
        res.status(201).json({
            status: 'ok',
            data: newContact
            // data: { salutation, name, contactType, phone, countryCode, classification, status, email, address }
        })
    }
    catch (err) {
        next(new AppError(err.message, 500))
    }
}
exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await leads.findAll()
        res.status(200).json({
            status: 'ok',
            data: contacts
        })
    }
    catch (err) {
        next(new AppError(err.message, 500))
    }
}
exports.getContactsById = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const contacts = await leads.findByPk(contactId)
        res.status(200).json({
            status: 'ok',
            data: contacts
        })
    }
    catch (err) {
        next(new AppError(err.message, 500))
    }
}

exports.searchContacts = async (req, res, next) => {
    try {
        const { q } = req.query
        if (!q) return next(new AppError('Please send the search query.', 400));
        const contacts = await leads.findAll({
            limit: 10,
            where: {
                name: {
                    [Op.like]: '%' + q + '%'
                }
            }
        })
        res.status(200).json({
            status: 'ok',
            data: contacts
        })
    }
    catch (err) {
        next(new AppError(err.message, 500))
    }
} 