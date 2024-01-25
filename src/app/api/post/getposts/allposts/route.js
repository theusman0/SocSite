import ConnectToDB from "@/Helper/db";
import IsLogin from "@/Helper/isLogin";
import Post from "@/models/Post";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

ConnectToDB();
export const GET = async (request) => {
    try {
        if (await IsLogin(request) === false) {
            return NextResponse.json({success: false, error: "invalid token"})
        }
        
        let posts = await Post.find().sort({
            updatedAt: -1
        }).populate({
            path: "likes user",
            select: "email username name pic"
        });
        console.log(posts);
        return NextResponse.json({ success: true, posts })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false, error: "Internal Server Error"})
    }
}