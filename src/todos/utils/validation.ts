import { body } from "express-validator"

export const createValidation = [
    body("title")
        .notEmpty()
        .withMessage("Missed title")
        .isString()
        .isLength({ min: 3, max: 50 })
        .withMessage("Title must be between 3 and 50 characters"),
]


export const updateValidation = [
    body("title")
        .optional()
        .isString()
        .isLength({ min: 3, max: 50 })
        .withMessage("Title must be between 3 and 50 characters"),
    body("completed")
        .optional()
        .isBoolean()
        .withMessage("Completed must be a boolean"),
]