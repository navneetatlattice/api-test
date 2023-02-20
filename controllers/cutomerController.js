const { siteInfo } = require('../models/Lattice');
const AppError = require('../utils/appError');

exports.addSiteInformation = async (req, res, next) => {
    try {
        const { body } = req;
        const newSiteInfo = await siteInfo.create(body)
        res.status(201).json({
            status: 'ok',
            data: newSiteInfo
        })
    } catch (err) {
        next(new AppError(err.message, 500))
    }
}

exports.getSiteInformationByCustomerId = async (req, res, next) => {
    try {
        const { customerId } = req.params;
        const siteDetails = await siteInfo.findOne({ idLead: customerId })
        res.status(200).json({
            status: 'ok',
            data: siteDetails
        })
    } catch (err) {
        next(new AppError(err.message, 500))
    }
}