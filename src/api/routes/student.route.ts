import express from 'express';
import {
	createStudent,
	updateStudent,
	getStudentByClass,
	getStudentDetail,
	serviceStudent,
	getStudentStop,
	attendanceStudentByClass,
	selectAttendanceByClass,
	selectAttendanceByStudent,
	selectAttendanceAllClass,
	getPolicyBeneficiary,
} from '../controllers/student.controller';

const router = express.Router();

// *** Chú ý ***: có 2 path student: students và student (có s và không s)
router.get('/students/attendance', selectAttendanceAllClass);
router.get('/students/policyBeneficiary', getPolicyBeneficiary);
router.get('/students/attendance/:id', selectAttendanceByStudent);
router.get('/students/attendance/:classId', selectAttendanceByClass);
router.get('/students/stop/:type', getStudentStop);
router.get('/students/:class', getStudentByClass);
router.get('/students/:id', getStudentDetail);
router.post('/students', createStudent);

router.put('/students/attendance/:classId', attendanceStudentByClass);
router.put('/students/services/:id', serviceStudent);
router.put('/students/:id', updateStudent);

export default router;
