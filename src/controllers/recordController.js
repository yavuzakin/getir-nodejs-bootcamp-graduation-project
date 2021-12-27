const Record = require('./../models/Record');
const ApiError = require('./../scripts/utils/ApiError');
const logger = require('./../scripts/logger/application');
const recordService = require('./../services/recordService');

exports.fetchData = async (req, res, next) => {
    try {
        // Get request body
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const { minCount, maxCount } = req.body;

        const records = await recordService.getFilteredRecords(startDate, endDate, minCount, maxCount);
        
        // Log file
        logger.log({ 
            level: 'info',
            message: `${req.method} ${req.baseUrl} 200`
        });

        // Response
        res.status(200).json({
            code: 0,
            msg: 'Success',
            records: records
        });
    } catch (err) {
        next(new ApiError('Internal server error', 500));
    }
}