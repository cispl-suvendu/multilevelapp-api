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
        await serviceData.save()
        return res.status(200).json(serviceData)
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



module.exports = { addService, listAllService, listServiceByVendorId }