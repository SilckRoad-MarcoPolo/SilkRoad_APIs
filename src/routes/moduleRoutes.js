const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../controllers/authControllers");
const moduleController = require("../controllers/moduleControllers");
const {
  createAndUpdateModuleValidators,
  checkModuleId,
} = require("../validators/moduleValidators");

router
  .route("/")
  .get(moduleController.getModules)
  .post(
    protect,
    restrictTo("admin"),
    createAndUpdateModuleValidators,
    moduleController.createModule
  );

router
  .route("/:id")
  .get(checkModuleId, moduleController.getModule)
  .patch(
    protect,
    restrictTo("admin"),
    createAndUpdateModuleValidators,
    moduleController.updateModule
  )
  .delete(
    protect,
    restrictTo("admin"),
    checkModuleId,
    moduleController.deleteModule
  );

module.exports = router;
