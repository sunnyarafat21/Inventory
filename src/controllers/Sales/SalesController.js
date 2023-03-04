const ParentModel = require('../../models/Sales/SalesModel');
const ChildsModel = require('../../models/Sales/SaleProductsModel');
const CreateParentChildsService = require('../../services/common/CreateParentChildsService');
const ListOneJoinService = require('../../services/common/ListOneJoinService');
const DeleteParentChildsService = require('../../services/common/DeleteParentChildsService');

exports.CreateSales = async (req, res) => {
    const Result = await CreateParentChildsService(req, ParentModel, ChildsModel, 'SaleID');
    res.status(200).json(Result);
};

exports.SalesList = async (req, res) => {
    const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
    const JoinStage = {
        $lookup: {
            from: 'customers',
            localField: 'CustomerID',
            foreignField: '_id',
            as: 'customers',
        },
    };
    const SearchArray = [
        { Note: SearchRgx },
        { 'customers.CustomerName': SearchRgx },
        { 'customers.Address': SearchRgx },
        { 'customers.Phone': SearchRgx },
        { 'customers.Email': SearchRgx },
    ];
    const Result = await ListOneJoinService(req, ParentModel, SearchArray, JoinStage);
    res.status(200).json(Result);
};
exports.SaleDelete = async (req, res) => {
    const Result = await DeleteParentChildsService(req, ParentModel, ChildsModel, 'SaleID');
    res.status(200).json(Result);
};
