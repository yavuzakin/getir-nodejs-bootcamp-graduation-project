const Record = require('./../models/Record');

exports.getFilteredRecords = (startDate, endDate, minCount, maxCount) => {
    return Record.aggregate([
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
}