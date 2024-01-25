import ConnectToDB from "@/Helper/db";
import IsLogin from "@/Helper/isLogin";
import Post from "@/models/Post";
import UserModel from "@/models/User";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

ConnectToDB();

export const GET = async (request, { params }) => {
    try {
        const { postId } = params;
        if (await IsLogin(request) === false) {
            return NextResponse.json({ success: false, error: "invalid token" });
        }

        let post = await Post.findById(postId).sort({
            updatedAt: -1
        }).populate({
            path: "likes user",
            select: "email username name pic"
        });

        if (!post) {
            return NextResponse.json({ success: false, error: "Post not found" });
        }
        return NextResponse.json({ success: true, post });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" });
    }
};
