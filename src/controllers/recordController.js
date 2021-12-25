const Record = require('./../models/Record');

exports.fetchData = async (req, res) => {
    try {
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const minCount = req.body.minCount;
        const maxCount = req.body.maxCount;

        const records = await Record.aggregate([
            // First filter createdAt by startDate and endDate
            {
                $match: { $and: [ { createdAt: { $gt: startDate } }, { createdAt: { $lt: endDate } } ] }
            },
            // Create one document per one element in count array by extracting count from array
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
        
        res.status(200).json({
            code: 0,
            msg: 'Success',
            records: records
        });
    } catch (err) {
        res.status(500).json({
            code: 1,
            msg: err
        })
    }
}