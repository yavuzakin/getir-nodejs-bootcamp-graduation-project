const Record = require('./../models/Record');

/** 
* Filters the Record documents, group them by the key, sums the count array, sorts by totalCount
* @param {Date Object} startDate The earliest date createdAt field can be
* @param {Date Object} endDate The latest date createdAt field can be
* @param {Number} minCount The minimum value for the totalCount field
* @param {Number} maxCount The maximum value for the totalCount field
* @return {Aggregate Object} Aggregation pipeline object, needs to be awaited for the expected result 
*/
exports.getFilteredRecords = (startDate, endDate, minCount, maxCount) => {
    return Record.aggregate([
        // First filter createdAt by startDate and endDate
        {
            $match: { $and: [ { createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } } ] }
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
        },
        // Sort by totalCount in ascending order
        {
            $sort: { totalCount: 1 }
        }
    ]);
}