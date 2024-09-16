const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

/**
 * @param {*} Model
 * @returns  {Function}
 * @desc    Get all documents
 */
exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const docs = await Model.find();
    res.status(200).json({
      status: "success",
      length: docs.length,
      data: {
        docs,
      },
    });
  });

/**
 *  @param {*} Model
 * @returns {Function}
 * @desc    Get one document
 */
exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new ApiError("Document not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

/**
 * @param {*} Model
 * @returns {Function}
 * @desc    Create one document
 */
exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

/**
 * @param {*} Model
 * @returns {Function}
 * @desc    Update one document
 */
exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new ApiError("Document not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

/**
 * @param {*} Model
 * @returns {Function}
 * @desc    Delete one document
 */
exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new ApiError("Document not found", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
