import { Model, ObjectId, SortOrder } from 'mongoose';
import { SoftDeleteDocument, SoftDeleteModel } from 'mongoose-delete';

export interface IClass {
	_id: ObjectId;
	grade: 1 | 2 | 3 | 4 | 5;
	className: string;
	headTeacher: ObjectId;
	students: Array<ObjectId>;
	totalStudents?: number;
}
export type TClassSortOption = {
	className?: SortOrder;
	grade?: SortOrder;
	createdAt?: SortOrder;
	updatedAt?: SortOrder;
};
export interface IClassDocument extends Omit<SoftDeleteDocument, '_id'>, IClass {}
export type TClassModel = Model<IClassDocument>;
export type TSoftDeleteClassModel = SoftDeleteModel<IClassDocument, TClassModel>;
