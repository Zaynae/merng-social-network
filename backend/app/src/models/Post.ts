import {model, Schema} from "mongoose";
//@ts-ignore

const postSchema = new Schema({
	username: String,
	body: String,
	createdAt: Schema.Types.Number,
	comments: [{
			body: String,
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
			createdAt: Schema.Types.Number,
	}],
	likes: [{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
		createdAt: Schema.Types.Number,
	}],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	}
});

export default model('Post', postSchema);