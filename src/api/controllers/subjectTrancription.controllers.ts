import { Request, Response } from 'express';
import * as TranscriptService from '../services/subjectTrancription.service';
import { HttpStatusCode } from '../../configs/statusCode.config';
import useCatchAsync from '../../helpers/useCatchAsync';
import { getCurrentSchoolYear } from '../services/schoolYear.service';
import mongoose, { ObjectId, isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

// [POST] /api/transcripts/:classId/:subjectId
export const scoreTableInputs = useCatchAsync(async (req: Request, res: Response) => {
	const data = req.body;
	const subjectId = req.params.subjectId;
	const classId = req.params.classId;
	const result = await TranscriptService.newScoreList(subjectId, classId, data);
	return res.status(HttpStatusCode.CREATED).json(result);
});

// [POST] /api/transcript/:studentId/:subjectId
export const scoreTableInputOne = useCatchAsync(async (req: Request, res: Response) => {
	const data = req.body;
	const subjectId = req.params.subjectId;
	const studentId = req.params.studentId;
	const result = await TranscriptService.newScore(subjectId, studentId, data);
	return res.status(HttpStatusCode.CREATED).json(result);
});

// [GET] /api/transcript/class/:classId/:subjectId
export const getTranscriptByClass = useCatchAsync(async (req: Request, res: Response) => {
	const subjectId = req.params.subjectId;
	const classId = req.params.classId;
	const result = await TranscriptService.selectSubjectTranscriptByClass(classId, subjectId);
	return res.status(HttpStatusCode.OK).json(result);
});

// [GET] /api/transcript/student/:id
export const getTranscriptByStudent = useCatchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await TranscriptService.getStudentTranscript(id);
	return res.status(HttpStatusCode.OK).json(result);
});

// [GET] /api/transcript/:classId
export const selectTranscriptAllSubjectByClass = useCatchAsync(async (req: Request, res: Response) => {
	const id = req.params.classId;
	const currentSchoolYear = await getCurrentSchoolYear();
	const schoolYearQueryValue = req.query._schoolYear;
	const schoolYear =
		schoolYearQueryValue && isValidObjectId(schoolYearQueryValue)
			? new mongoose.Types.ObjectId(schoolYearQueryValue as string)
			: currentSchoolYear._id;
	if (!isValidObjectId(schoolYear)) throw createHttpError.BadRequest('Invalid school year ID !');
	const result = await TranscriptService.selectTranscriptAllSubjectByClass(id, schoolYear as ObjectId);
	return res.status(HttpStatusCode.OK).json(result);
});
