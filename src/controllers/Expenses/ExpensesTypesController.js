const mongoose = require('mongoose');
const DataModel = require('../../models/Expenses/ExpensesTypesModel');
const CreateService = require('../../services/common/CreateService');
const UpdateService = require('../../services/common/UpdateService');
const ListService = require('../../services/common/ListService');
const DropDownService = require('../../services/common/DropDownService');
const CheckAssociateService = require('../../services/common/CheckAssociateService');
const ExpensesModel = require('../../models/Expenses/ExpensesModel');
const DeleteService = require('../../services/common/DeleteService');
const DetailsByIDService = require('../../services/common/DetailsByIDService');

exports.CreateExpenseTypes = async (req, res) => {
    const Result = await CreateService(req, DataModel);
    res.status(200).json(Result);
};

exports.UpdateExpenseTypes = async (req, res) => {
    const Result = await UpdateService(req, DataModel);
    res.status(200).json(Result);
};

exports.ExpenseTypesList = async (req, res) => {
    const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
    const SearchArray = [{ Name: SearchRgx }];
    const Result = await ListService(req, DataModel, SearchArray);
    res.status(200).json(Result);
};

exports.ExpenseTypesDropDown = async (req, res) => {
    const Result = await DropDownService(req, DataModel, { _id: 1, Name: 1 });
    res.status(200).json(Result);
};

exports.ExpenseTypesDetailsByID = async (req, res) => {
    const Result = await DetailsByIDService(req, DataModel);
    res.status(200).json(Result);
};
exports.DeleteExpenseTypes = async (req, res) => {
    const DeleteID = req.params.id;
    const { ObjectId } = mongoose.Types;
    const CheckAssociate = await CheckAssociateService(
        { TypeID: ObjectId(DeleteID) },
        ExpensesModel
    );
    if (CheckAssociate) {
        res.status(200).json({ status: 'associate', data: 'Associate with Expenses' });
    } else {
        const Result = await DeleteService(req, DataModel);
        res.status(200).json(Result);
    }
};
