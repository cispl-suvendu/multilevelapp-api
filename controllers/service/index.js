const Services = require("../../models/vendor/ServiceModule")

const addService = async (req, res) => {
    const { name, cost, description, images, category, createdBy, servicestatus } = req.body
    const serviceData = new Services({
        name,
        cost,
        description,
        images,
        category,
        createdBy
    })
    try {
        const populateServiceData = await serviceData.populate([
            {
                path: 'category',
                select: ['_id', 'name', 'caturl', 'catstatus']
            },
            {
                path: 'createdBy',
                select: ['_id', 'email', 'firstName', 'lastName', 'isActive']
            }
        ])
        await populateServiceData.save()
        return res.status(200).json(populateServiceData)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

const listAllService = async (req, res) => {
    const data = await Services.find().populate([
        {
            path: 'category',
            select: ['_id', 'name', 'caturl', 'catstatus']
        },
        {
            path: 'createdBy',
            select: ['_id', 'email', 'firstName', 'lastName', 'isActive']
        }
    ])
    try {
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


const listServiceByVendorId = async (req, res) => {
    const { id } = req.params
    const data = await Services.find({ createdBy: id }).populate([
        {
            path: 'category',
            select: ['_id', 'name', 'caturl', 'catstatus']
        },
        {
            path: 'createdBy',
            select: ['_id', 'email', 'firstName', 'lastName', 'isActive']
        }
    ]);
    try {
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const listServiceByCategoryId = async (req, res) => {
    const { id } = req.params
    const data = await Services.find({ category: id }).populate([
        {
            path: 'category',
            select: ['_id', 'name', 'caturl', 'catstatus']
        },
        {
            path: 'createdBy',
            select: ['_id', 'email', 'firstName', 'lastName', 'isActive']
        }
    ]);
    try {
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


const updateSingleService = async (req, res) => {
    const { id } = req.params
    const { name, cost, description, images, category, servicestatus } = req.body
    try {
        let currentService = await Services.findById({ _id: id });
        if (!currentService) {
            return res.status(404).json({ error: "Service not found!" })
        }
        currentService.name = name || currentService.name
        currentService.cost = cost || currentService.cost
        currentService.description = description || currentService.description
        currentService.images = images || currentService.images
        currentService.category = category || currentService.category
        currentService.servicestatus = servicestatus || currentService.servicestatus
        return res.status(200).json(currentService)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const updateServiceStatusWithVendorStatus = async (req, res) => {
    const { servicestatus, serviceIds } = req.body
    try {
        const data = await Services.updateMany(
            { _id: { $in: serviceIds } },
            { $set: {servicestatus} },
            {multi: true}
         )
        return res.status(200).json(data)

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const updateServiceStatusWithCategoryStatus = async (req, res) => {
    const { servicestatus, serviceIds } = req.body
    try {
        const data = await Services.updateMany(
            { _id: { $in: serviceIds } },
            { $set: {servicestatus} },
            {multi: true}
         )
        return res.status(200).json(data)

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}




module.exports = { addService, listAllService, listServiceByVendorId, listServiceByCategoryId, updateSingleService, updateServiceStatusWithVendorStatus, updateServiceStatusWithCategoryStatus }