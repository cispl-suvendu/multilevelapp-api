const ServiceCategory = require("../../models/Global/ServiceCategory")

const addNewServiceCategory = async (req, res) => {
    const { name, caturl } = req.body
    const catExists = await ServiceCategory.findOne({ caturl });
    if (catExists) return res.status(401).json({ error: "Category allready exists" });
    const catData = new ServiceCategory({
        name,
        caturl
    })
    try {
        await catData.save()
        return res.status(200).json(catData)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const getAllServiceCategory = async (req, res) => {
    const data = await ServiceCategory.find();
    try {
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const getSingleServiceCategory = async (req, res) => {
    const { id } = req.params
    const data = await ServiceCategory.findById({ _id: id });
    try {
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const updateSingleCategory = async (req, res) => {
    const { id } = req.params
    const { catstatus, name, caturl } = req.body
    try {
        let currentCat = await ServiceCategory.findById({ _id: id });
        if (!currentCat) {
            return res.status(404).json({ error: "Service Category not found!" })
        }
        currentCat.catstatus = catstatus
        currentCat.name = name || currentCat.name
        currentCat.caturl = caturl || currentCat.caturl
        await currentCat.save()
        return res.status(201).json(currentCat)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = { addNewServiceCategory, getAllServiceCategory, getSingleServiceCategory, updateSingleCategory }