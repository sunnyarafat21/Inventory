const ExpenseReportService = require('../../services/report/ExpenseReportService');
const ReturnReportService = require('../../services/report/ReturnReportService');
const PurchaseReportService = require('../../services/report/PurchaseReportService');
const SalesReportService = require('../../services/report/SalesReportService');

exports.ExpensesByDate = async (req, res) => {
    const Result = await ExpenseReportService(req);
    res.status(200).json(Result);
};
exports.ReturnByDate = async (req, res) => {
    const Result = await ReturnReportService(req);
    res.status(200).json(Result);
};

exports.PurchaseByDate = async (req, res) => {
    const Result = await PurchaseReportService(req);
    res.status(200).json(Result);
};

exports.SalesByDate = async (req, res) => {
    const Result = await SalesReportService(req);
    res.status(200).json(Result);
};
