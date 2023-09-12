const adminActivitySchema = require("../../../models/admin/adminActivityModel")

const getAdminActivity = async (req, res) => {
    const { id } = req.params
    const data = await adminActivitySchema.findOne({ userId: id });
    try {
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const addAdminActivity = async (req, res) => {
    const { id } = req.params
    const { activityLog } = req.body
    let existingUser = await adminActivitySchema.findOne({ userId: id });
    const userActivity = new adminActivitySchema({
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

module.exports = { getAdminActivity, addAdminActivity }