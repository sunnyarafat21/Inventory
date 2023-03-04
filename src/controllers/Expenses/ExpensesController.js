const DataModel = require('../../models/Expenses/ExpensesModel');
const CreateService = require('../../services/common/CreateService');
const UpdateService = require('../../services/common/UpdateService');
const ListOneJoinService = require('../../services/common/ListOneJoinService');
const DeleteService = require('../../services/common/DeleteService');
const DetailsByIDService = require('../../services/common/DetailsByIDService');

exports.CreateExpenses = async (req, res) => {
    const Result = await CreateService(req, DataModel);
    res.status(200).json(Result);
};

exports.UpdateExpenses = async (req, res) => {
    const Result = await UpdateService(req, DataModel);
    res.status(200).json(Result);
};

exports.ExpensesList = async (req, res) => {
    const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
    const SearchArray = [{ Note: SearchRgx }, { 'Type.Name': SearchRgx }];
    const JoinStage = {
        $lookup: {
            from: 'expensetypes',
            localField: 'TypeID',
            foreignField: '_id',
            as: 'Type',
        },
    };
    const Result = await ListOneJoinService(req, DataModel, SearchArray, JoinStage);
    res.status(200).json(Result);
};

exports.ExpenseDetailsByID = async (req, res) => {
    const Result = await DetailsByIDService(req, DataModel);
    res.status(200).json(Result);
};
exports.DeleteExpense = async (req, res) => {
    const Result = await DeleteService(req, DataModel);
    res.status(200).json(Result);
};
