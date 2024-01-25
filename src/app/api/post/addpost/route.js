import ConnectToDB from "@/Helper/db";
import IsLogin from "@/Helper/isLogin";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

ConnectToDB();
export const POST = async (request) => {
    try {
        const { caption, content, image, video } = await request.json();
        if (await IsLogin(request) === false) {
            return NextResponse.json({success: false, error: "invalid token"})
        }
        let post = await Post.create({
            user: request.user.id,
            caption,
            content,
            image,
            video
        })
        return NextResponse.json({ success: true, post })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false, error: "Internal Server Error"})
    }
}