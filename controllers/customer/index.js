const Customer = require("../../models/customer/customerModel")
const Service = require("../../models/vendor/ServiceModule")
const bookingNotification = require("../../emails/customer/bookingNotification")

const createCustomer = async (req, res) => {
    const { firstName, lastName, email, dateTime, serviceId, categoryId, serviceCratedBy } = req.body
    try {
        const customerData = new Customer({
            firstName, lastName, email, dateTime, serviceId, categoryId, serviceCratedBy
        })
        const bookedService = await Service.findById(serviceId)
        await customerData.save()
        //await bookingNotification({...customerData, ...bookedService})
        console.log('details:', {...customerData, ...bookedService})
        return res.status(200).json(customerData)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const listCustomer = async (req, res) => {
    const data = await Customer.find().populate([
        {
            path: 'serviceId',
            select: ['_id', 'name', 'cost']
        },
        {
            path: 'categoryId',
            select: ['_id', 'name', 'caturl']
        },
        {
            path: 'serviceCratedBy',
            select: ['_id', 'email', 'firstName', 'lastName']
        }
    ])
    try {
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const listCustomerByServiceId = async (req, res) => {
    const { id } = req.body
    const data = await Customer.find({ serviceId: id }).populate([
        {
            path: 'serviceId',
            select: ['_id', 'name', 'cost']
        },
        {
            path: 'categoryId',
            select: ['_id', 'name', 'caturl']
        },
        {
            path: 'serviceCratedBy',
            select: ['_id', 'email', 'firstName', 'lastName']
        }
    ])
    try {
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

const listCustomerByServiceCategoryId = async (req, res) => {
    const { id } = req.body
    const data = await Customer.find({ categoryId: id }).populate([
        {
            path: 'serviceId',
            select: ['_id', 'name', 'cost']
        },
        {
            path: 'categoryId',
            select: ['_id', 'name', 'caturl']
        },
        {
            path: 'serviceCratedBy',
            select: ['_id', 'email', 'firstName', 'lastName']
        }
    ])
    try {
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const listCustomerByVendorId = async (req, res) => {
    const { id } = req.body
    const data = await Customer.find({ serviceCratedBy: id }).populate([
        {
            path: 'serviceId',
            select: ['_id', 'name', 'cost']
        },
        {
            path: 'categoryId',
            select: ['_id', 'name', 'caturl']
        },
        {
            path: 'serviceCratedBy',
            select: ['_id', 'email', 'firstName', 'lastName']
        }
    ])
    try {
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


module.exports = { createCustomer, listCustomer, listCustomerByServiceId, listCustomerByServiceCategoryId, listCustomerByVendorId }