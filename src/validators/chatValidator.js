const { check, body } = require("express-validator");
const validetorMiddleware = require("../middlewares/validatorMiddleware");

exports.createChannelValidators = [
    check("name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Channel name is required"),
    
    check("members")
        .isArray()
        .withMessage("Members should be an array"),
    
    validetorMiddleware,
];

exports.sendMessageValidators = [
    check("channelId")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Channel ID is required"),
    
    check("text")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Message text is required"),
    
    validetorMiddleware,
];