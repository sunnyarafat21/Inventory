const ParentModel = require('../../models/Purchases/PurchasesModel');
const ChildsModel = require('../../models/Purchases/PurchaseProductsModel');
const CreateParentChildsService = require('../../services/common/CreateParentChildsService');
const ListOneJoinService = require('../../services/common/ListOneJoinService');
const DeleteParentChildsService = require('../../services/common/DeleteParentChildsService');

exports.CreatePurchases = async (req, res) => {
    const Result = await CreateParentChildsService(req, ParentModel, ChildsModel, 'PurchaseID');
    res.status(200).json(Result);
};

exports.PurchasesList = async (req, res) => {
    const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
    const JoinStage = {
        $lookup: {
            from: 'suppliers',
            localField: 'SupplierID',
            foreignField: '_id',
            as: 'suppliers',
        },
    };
    const SearchArray = [
        { Note: SearchRgx },
        { 'suppliers.Name': SearchRgx },
        { 'suppliers.Address': SearchRgx },
        { 'suppliers.Phone': SearchRgx },
        { 'suppliers.Email': SearchRgx },
    ];
    const Result = await ListOneJoinService(req, ParentModel, SearchArray, JoinStage);
    res.status(200).json(Result);
};

exports.PurchasesDelete = async (req, res) => {
    const Result = await DeleteParentChildsService(req, ParentModel, ChildsModel, 'PurchaseID');
    res.status(200).json(Result);
};
