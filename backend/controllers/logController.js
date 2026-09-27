const logModel = require("../models/logModel");

const getLogs = (req, res, next) => {

    try{
        const logs = logModel.getLatestLogs();
        res.status(200).json(logs);
    }catch(error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    getLogs
};