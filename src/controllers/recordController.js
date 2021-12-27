const Record = require('./../models/Record');
const ApiError = require('./../scripts/utils/ApiError');
const logger = require('./../scripts/logger/application');

exports.fetchData = async (req, res, next) => {
    try {
        // Get request body
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const { minCount, maxCount } = req.body;

        const records = await Record.aggregate([
            // First filter createdAt by startDate and endDate
            {
                $match: { $and: [ { createdAt: { $gt: startDate } }, { createdAt: { $lt: endDate } } ] }
            },
            // Create one document per one element in count array by extracting count elements from array
            {
                $unwind: '$counts'
            },
            // Group documents by key field and then create another required fields
            {
                $group: {
                    _id: '$key',
                    key: { $first: '$key' },
                    createdAt: { $first: '$createdAt' },
                    totalCount: { $sum: '$counts' }
                }
            },
            // Unselect the _id field so that output looks exactly like the one in the sample
            {
                $project: { _id: 0 }
            },
            // Filter the totalCount by minCount and maxCount
            {
                $match: { $and: [ { totalCount: { $gte: minCount } }, { totalCount: { $lte: maxCount } } ] }
            }
        ]);

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