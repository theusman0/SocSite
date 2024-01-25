import ConnectToDB from "@/Helper/db";
import IsLogin from "@/Helper/isLogin";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import UserModel from "@/models/User";
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

        const user = await UserModel.findById(request.user.id);
        if (!post.comment) {
            post.comment = [];
        }
        const newComment = {
            name: user.name,
            pic: user.pic,
            username: user.username,
            content
        }
        await post.comment.push(newComment);
        await post.save();
        return NextResponse.json({success: true, post})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" });
    }
};
