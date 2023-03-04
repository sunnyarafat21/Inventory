const mongoose = require('mongoose');
const DataModel = require('../../models/Suppliers/SuppliersModel');
const CreateService = require('../../services/common/CreateService');
const UpdateService = require('../../services/common/UpdateService');
const ListService = require('../../services/common/ListService');
const DropDownService = require('../../services/common/DropDownService');
const CheckAssociateService = require('../../services/common/CheckAssociateService');
const PurchasesModel = require('../../models/Purchases/PurchasesModel');
const DeleteService = require('../../services/common/DeleteService');
const DetailsByIDService = require('../../services/common/DetailsByIDService');

exports.CreateSuppliers = async (req, res) => {
    const Result = await CreateService(req, DataModel);
    res.status(200).json(Result);
};

exports.UpdateSuppliers = async (req, res) => {
    const Result = await UpdateService(req, DataModel);
    res.status(200).json(Result);
};

exports.SuppliersList = async (req, res) => {
    const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
    const SearchArray = [
        { Name: SearchRgx },
        { Phone: SearchRgx },
        { Email: SearchRgx },
        { Address: SearchRgx },
    ];
    const Result = await ListService(req, DataModel, SearchArray);
    res.status(200).json(Result);
};

exports.SuppliersDropDown = async (req, res) => {
    const Result = await DropDownService(req, DataModel, { _id: 1, Name: 1 });
    res.status(200).json(Result);
};
exports.SuppliersDetailsByID = async (req, res) => {
    const Result = await DetailsByIDService(req, DataModel);
    res.status(200).json(Result);
};

exports.DeleteSupplier = async (req, res) => {
    const DeleteID = req.params.id;
    const { ObjectId } = mongoose.Types;
    const CheckAssociate = await CheckAssociateService(
        { SupplierID: ObjectId(DeleteID) },
        PurchasesModel
    );
    if (CheckAssociate) {
        res.status(200).json({ status: 'associate', data: 'Associate with Purchases' });
    } else {
        const Result = await DeleteService(req, DataModel);
        res.status(200).json(Result);
    }
};
