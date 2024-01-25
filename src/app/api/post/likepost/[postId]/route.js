import ConnectToDB from "@/Helper/db";
import IsLogin from "@/Helper/isLogin";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

ConnectToDB()

export const POST = async (request, { params }) => {
    try {
        const { postId } = params;
        if (await IsLogin(request) === false) {
            return NextResponse.json({ success: false, error: "invalid token" })
        }
        let post = await Post.findById(postId);
        if (!post) {
        return NextResponse.json({success: false, error: "no such post"})
        }
        if (!post.likes.includes(request.user.id)) {
            post.likes.push(request.user.id)
        }
        else {
            post.likes = post.likes.filter(like => like === request.user.id)
        }
        await post.save();
        return NextResponse.json({success: true, post})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" });
    }
}