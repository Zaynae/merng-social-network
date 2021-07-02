import Post from "@models/Post";
import { AuthenticationError, UserInputError } from "apollo-server";
import { postValidator } from "../validators/post";

export default{

    Mutation: {
		createComment: async (_:any, {input}: {input: {postId: string, body: string}}, context: any, info: any) => {
            postValidator(input);
            const {postId, body} = input;

            const post = await Post.findById(postId);
            const user = context.user;
            if(post){
                post.comments.unshift({
                    body,
                    user: user.id,
                    createdAt: Date.now()
                });
                await post.save();
                return post;
            } else {
                throw new UserInputError('Invalid post')
            }
        },

        deleteComment: async (_:any, {postId, commentId}: {postId: string, commentId: string}, context: any, info: any) => {
            const post = await Post.findById(postId);
            const user = context.user;
            if(post){
                const commentIndex = post.comments.findIndex((c:any) => c.id === commentId);
                if(post.comments[commentIndex]?.user == user.id){
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                }else {
                    throw new AuthenticationError('Action not allowed');
                }
            } else {
                throw new UserInputError('Invalid post')
            }
        }
    }

}