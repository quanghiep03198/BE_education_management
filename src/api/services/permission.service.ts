import { MongooseError } from 'mongoose';
import PermissionModel, { Permission } from '../models/permission.model';

export const createPermission = async (permission: Permission & Partial<Permission>) => {
	try {
		return await new PermissionModel(permission).save();
	} catch (error) {
		return error;
	}
};

export const getPermissions = async () => {
	try {
		const result = await PermissionModel.find().exec();

		return result;
	} catch (error) {
		return error as MongooseError;
	}
};

export const getPermissionByID = async (permissionID: string) => {
	try {
		const result = await PermissionModel.findOne({ _id: permissionID }).exec();

		return result;
	} catch (error) {
		return error as MongooseError;
	}
};

export const deletePermission = async (permissionID: string) => {
	try {
		const result = await PermissionModel.findOneAndDelete({ _id: permissionID }).exec();

		return result;
	} catch (error) {
		return error;
	}
};

export const updatePermission = async (
	permissionID: string,
	permission: Permission & Partial<Permission>
) => {
	try {
		const result = await PermissionModel.findOneAndUpdate({ _id: permissionID }, permission, {
			new: true,
		}).exec();

		return result;
	} catch (error) {
		return error as MongooseError;
	}
};
