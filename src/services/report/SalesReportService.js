const SaleProductsModel = require('../../models/Sales/SaleProductsModel');

const SalesReportService = async (Request) => {
    try {
        const UserEmail = Request.headers.email;
        const { FormDate } = Request.body;
        const { ToDate } = Request.body;

        const data = await SaleProductsModel.aggregate([
            {
                $match: {
                    UserEmail,
                    CreatedDate: { $gte: new Date(FormDate), $lte: new Date(ToDate) },
                },
            },
            {
                $facet: {
                    Total: [
                        {
                            $group: {
                                _id: 0,
                                TotalAmount: { $sum: '$Total' },
                            },
                        },
                    ],
                    Rows: [
                        {
                            $lookup: {
                                from: 'products',
                                localField: 'ProductID',
                                foreignField: '_id',
                                as: 'products',
                            },
                        },
                        { $unwind: '$products' },
                        {
                            $lookup: {
                                from: 'brands',
                                localField: 'products.BrandID',
                                foreignField: '_id',
                                as: 'brands',
                            },
                        },
                        {
                            $lookup: {
                                from: 'categories',
                                localField: 'products.CategoryID',
                                foreignField: '_id',
                                as: 'categories',
                            },
                        },
                    ],
                },
            },
        ]);

        return { status: 'success', data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
};
module.exports = SalesReportService;
