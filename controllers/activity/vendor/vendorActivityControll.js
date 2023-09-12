const vendorActivitySchema = require("../../../models/vendor/vendorActivityModel")

const getVendorActivity = async (req, res) => {
    const { id } = req.params
    const data = await vendorActivitySchema.findOne({ userId: id });
    try {
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const addVendorActivity = async (req, res) => {
    const { id } = req.params
    const { activityLog } = req.body
    let existingUser = await vendorActivitySchema.findOne({ userId: id });
    const userActivity = new vendorActivitySchema({
        userId: id,
        activityLog
    })
    try {
        if (!existingUser) {
            await userActivity.save()
            return res.status(200).json(userActivity)
        }

        existingUser.activityLog = activityLog
        await existingUser.save()
        return res.status(200).json(existingUser)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { getVendorActivity, addVendorActivity }