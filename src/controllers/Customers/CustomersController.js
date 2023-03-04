const mongoose = require('mongoose');
const DataModel = require('../../models/Customers/CustomersModel');
const CreateService = require('../../services/common/CreateService');
const UpdateService = require('../../services/common/UpdateService');
const ListService = require('../../services/common/ListService');
const DropDownService = require('../../services/common/DropDownService');
const CheckAssociateService = require('../../services/common/CheckAssociateService');
const SalesModel = require('../../models/Sales/SalesModel');
const DeleteService = require('../../services/common/DeleteService');
const DetailsByIDService = require('../../services/common/DetailsByIDService');

exports.CreateCustomers = async (req, res) => {
    const Result = await CreateService(req, DataModel);
    res.status(200).json(Result);
};

exports.UpdateCustomers = async (req, res) => {
    const Result = await UpdateService(req, DataModel);
    res.status(200).json(Result);
};

exports.CustomersList = async (req, res) => {
    const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
    const SearchArray = [
        { CustomerName: SearchRgx },
        { Phone: SearchRgx },
        { Email: SearchRgx },
        { Address: SearchRgx },
    ];
    const Result = await ListService(req, DataModel, SearchArray);
    res.status(200).json(Result);
};

exports.CustomersDropDown = async (req, res) => {
    const Result = await DropDownService(req, DataModel, { _id: 1, CustomerName: 1 });
    res.status(200).json(Result);
};

exports.CustomersDetailsByID = async (req, res) => {
    const Result = await DetailsByIDService(req, DataModel);
    res.status(200).json(Result);
};

exports.DeleteCustomer = async (req, res) => {
    const DeleteID = req.params.id;
    const { ObjectId } = mongoose.Types;
    const CheckAssociate = await CheckAssociateService(
        { CustomerID: ObjectId(DeleteID) },
        SalesModel
    );
    if (CheckAssociate) {
        res.status(200).json({ status: 'associate', data: 'Associate with Sales' });
    } else {
        const Result = await DeleteService(req, DataModel);
        res.status(200).json(Result);
    }
};
