import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import { EduBackground } from "../../types/schemas.interface";

const eduBackgroundSchema = new mongoose.Schema<EduBackground>({
	level: {
		type: String,
		required: true,
	},
});

// add plugin
eduBackgroundSchema.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: "all",
});

// const model: SoftDeleteModel = mongoose.model<EduBackground>('EduBackgrounds', eduBackgroundSchema);

export default mongoose.model("EduBackgrounds", eduBackgroundSchema);
