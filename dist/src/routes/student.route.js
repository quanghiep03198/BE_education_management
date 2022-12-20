"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controllers/student.controller");
const router = express_1.default.Router();
router.get("/students", student_controller_1.list);
router.post("/students", student_controller_1.create);
exports.default = router;
