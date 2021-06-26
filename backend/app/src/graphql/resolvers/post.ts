import User from "@app/src/models/User";
import Post from "@models/Post";
import user from "./user";

export default{
    Query:{
		getPosts: async (_:any, args: any, context: any, info: any) =>{
			try{
				const posts =  (await Post.find().sort({createdAt: -1}));
				return posts;
			}catch(err){
				console.log(err)
			}
		},
		getPost: async(_:any, {id}: {id: string}, context: any, info: any)=>{
			try{
				const post = await Post.findById(id);
				return post;
			}catch(err){
				console.log(err)
			}
			
		}
    },

	Mutation: {
		createPost: async (_:any, {input}: any, context: any, info: any) => {
			const {body} = input;
			const user = context.user;
			const post = new Post({
				body,
				user: user.id,
				createdAt: Date.now()
			});
			return (await post.save());
		},
		deletePost: async (_:any, {id}: {id: string}, context: any, info: any) => {
			try{
				const post = await Post.findById(id);
				const user = context.user;
				if(user.id == post.user){
					await post.delete();
					return true;
				}
				return false;
			}catch(err){
				//console.log(err);
				return false;
			}
		}

	},

	Post: {
		likeCount : (parent: any)=> parent.likes.length,
		commentCount : (parent: any)=> parent.comments.length,
		comments: (parent: any) => {
			const comments = parent.comments.map(async (comment: any) => {
				const user = await User.findById(comment.user);
				return {
					id: comment.id,
					createdAt: comment.createdAt,
					user
				};
			});

			return comments;
		},
		likes: (parent: any) => {
			const likes = parent.likes.map(async (like: any) => {
				const user = await User.findById(like.user);
				return {
					id: like.id,
					createdAt: like.createdAt,
					user
				};
			});

			return likes;
		},
		user: async(parent: any) => (await User.findById(parent.user))
	}

}