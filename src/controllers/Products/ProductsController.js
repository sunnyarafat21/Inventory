const mongoose = require('mongoose');
const DataModel = require('../../models/Products/ProductsModel');
const CreateService = require('../../services/common/CreateService');
const UpdateService = require('../../services/common/UpdateService');
const ListTwoJoinService = require('../../services/common/ListTwoJoinService');
const CheckAssociateService = require('../../services/common/CheckAssociateService');
const SaleProductsModel = require('../../models/Sales/SaleProductsModel');
const PurchaseProductsModel = require('../../models/Purchases/PurchaseProductsModel');
const ReturnProductsModel = require('../../models/Returns/ReturnProductsModel');
const DeleteService = require('../../services/common/DeleteService');
const DetailsByIDService = require('../../services/common/DetailsByIDService');

exports.CreateProducts = async (req, res) => {
    const Result = await CreateService(req, DataModel);
    res.status(200).json(Result);
};

exports.UpdateProducts = async (req, res) => {
    const Result = await UpdateService(req, DataModel);
    res.status(200).json(Result);
};

exports.ProductsList = async (req, res) => {
    const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
    const JoinStage1 = {
        $lookup: {
            from: 'brands',
            localField: 'BrandID',
            foreignField: '_id',
            as: 'brands',
        },
    };
    const JoinStage2 = {
        $lookup: {
            from: 'categories',
            localField: 'CategoryID',
            foreignField: '_id',
            as: 'categories',
        },
    };
    const SearchArray = [
        { Name: SearchRgx },
        { Unit: SearchRgx },
        { Details: SearchRgx },
        { 'brands.Name': SearchRgx },
        { 'categories.Name': SearchRgx },
    ];
    const Result = await ListTwoJoinService(req, DataModel, SearchArray, JoinStage1, JoinStage2);
    res.status(200).json(Result);
};
exports.ProductsDetailsByID = async (req, res) => {
    const Result = await DetailsByIDService(req, DataModel);
    res.status(200).json(Result);
};
exports.DeleteProduct = async (req, res) => {
    const DeleteID = req.params.id;
    const { ObjectId } = mongoose.Types;

    const CheckReturnAssociate = await CheckAssociateService(
        { ProductID: ObjectId(DeleteID) },
        ReturnProductsModel
    );
    const CheckPurchaseAssociate = await CheckAssociateService(
        { ProductID: ObjectId(DeleteID) },
        PurchaseProductsModel
    );
    const CheckSaleAssociate = await CheckAssociateService(
        { ProductID: ObjectId(DeleteID) },
        SaleProductsModel
    );

    if (CheckReturnAssociate) {
        res.status(200).json({ status: 'associate', data: 'Associate with Return' });
    } else if (CheckPurchaseAssociate) {
        res.status(200).json({ status: 'associate', data: 'Associate with Purchase' });
    } else if (CheckSaleAssociate) {
        res.status(200).json({ status: 'associate', data: 'Associate with Sale' });
    } else {
        const Result = await DeleteService(req, DataModel);
        res.status(200).json(Result);
    }
};
