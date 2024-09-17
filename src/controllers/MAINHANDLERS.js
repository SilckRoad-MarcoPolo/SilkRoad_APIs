const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

/**
 * @param {*} Model
 * @param {string[]} searchFields - Fields to search within the model
 * @returns {Function}
 * @desc Get all documents with filtering, sorting, field limiting, searching, and pagination
 */
exports.getAll = (Model, searchableFields) =>
  asyncHandler(async (req, res, next) => {
    // Initialize ApiFeatures with the Mongoose query and query string
    const features = new ApiFeatures(Model.find(), req.query);

    // Apply filtering, sorting, field limiting, searching, and pagination
    features.filter().sort().limitFields().search(searchableFields);

    // Execute the query with pagination
    const countDocuments = await Model.countDocuments();
    const docs = await features.paginate(countDocuments).mongooseQuery;

    res.status(200).json({
      status: "success",
      results: docs.length,
      pagination: features.paginationResult,
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
