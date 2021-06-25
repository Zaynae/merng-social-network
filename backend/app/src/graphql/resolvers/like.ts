import Post from "@models/Post";
import { UserInputError } from "apollo-server";


export default{

    Mutation: {
		likePost: async (_:any, {postId}: {postId: string}, context: any, info: any) => {
           
            const post = await Post.findById(postId);
            const user = context.user;
            if(post){
                if(post.likes.find((like: any)=> like.user == user.id)){
                    post.likes = post.likes.filter((like: any)=> like.user != user.id);
                } else {
                    post.likes.push({
                        user: user.id,
                        createdAt: Number(Date.now())
                    });
                }
               
                await post.save();
                return post;
            } else {
                throw new UserInputError('Invalid post')
            }
        },
    }
}