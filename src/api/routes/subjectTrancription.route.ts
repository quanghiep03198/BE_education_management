import express from 'express';
import * as TrancriptionController from '../controllers/subjectTrancription.controllers';

const router = express.Router();

router.post('/transcripts/:classId/:subjectId', TrancriptionController.scoreTableInputs);
router.post('/transcript/:studentId/:subjectId', TrancriptionController.scoreTableInputOne);
router.get('/transcript/class/:classId/:subjectId', TrancriptionController.getTranscriptByClass);
router.get('/transcript/student/:id', TrancriptionController.getTranscriptByStudent);

export default router;
