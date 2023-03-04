const mongoose = require('mongoose');
const DataModel = require('../../models/Brands/BrandsModel');
const ProductsModel = require('../../models/Products/ProductsModel');
const CreateService = require('../../services/common/CreateService');
const UpdateService = require('../../services/common/UpdateService');
const ListService = require('../../services/common/ListService');
const DropDownService = require('../../services/common/DropDownService');
const CheckAssociateService = require('../../services/common/CheckAssociateService');
const DeleteService = require('../../services/common/DeleteService');
const DetailsByIDService = require('../../services/common/DetailsByIDService');

exports.CreateBrand = async (req, res) => {
    const Result = await CreateService(req, DataModel);
    res.status(200).json(Result);
};
exports.UpdateBrand = async (req, res) => {
    const Result = await UpdateService(req, DataModel);
    res.status(200).json(Result);
};

exports.BrandList = async (req, res) => {
    const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
    const SearchArray = [{ Name: SearchRgx }];
    const Result = await ListService(req, DataModel, SearchArray);
    res.status(200).json(Result);
};
exports.BrandDetailsByID = async (req, res) => {
    const Result = await DetailsByIDService(req, DataModel);
    res.status(200).json(Result);
};
exports.BrandDropDown = async (req, res) => {
    const Result = await DropDownService(req, DataModel, { _id: 1, Name: 1 });
    res.status(200).json(Result);
};
exports.DeleteBrand = async (req, res) => {
    const DeleteID = req.params.id;
    const { ObjectId } = mongoose.Types;
    const CheckAssociate = await CheckAssociateService(
        { BrandID: ObjectId(DeleteID) },
        ProductsModel,
    );
    if (CheckAssociate) {
        res.status(200).json({ status: 'associate', data: 'Associate with Product' });
    } else {
        const Result = await DeleteService(req, DataModel);
        res.status(200).json(Result);
    }
};
