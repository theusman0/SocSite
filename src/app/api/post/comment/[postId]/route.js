import ConnectToDB from "@/Helper/db";
import IsLogin from "@/Helper/isLogin";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

ConnectToDB();

export const POST = async (request, { params }) => {
    try {
        const { content } = await request.json();
        const { postId } = params;

        if (await IsLogin(request) === false) {
            return NextResponse.json({ success: false, error: "invalid token" });
        }

        let post = await Post.findById(postId);

        if (!post) {
            return NextResponse.json({ success: false, error: "no such post" });
        }

        const newComment = await Comment.create({
            content,
            user: request.user.id
        });

        
        if (!Array.isArray(post.comments)) {
            post.comments = [];
        }

        post.comment.push(newComment.id);

        await post.save();
        return NextResponse.json({ success: true, post });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" });
    }
};
