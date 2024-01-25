import ConnectToDB from "@/Helper/db";
import IsLogin from "@/Helper/isLogin";
import Post from "@/models/Post";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

ConnectToDB();

export const GET = async (request) => {
    try {
        if (await IsLogin(request) === false) {
            return NextResponse.json({ success: false, error: "Invalid token" });
        }

        const userId = request.user.id;
        const user = await UserModel.findById(userId);

        let posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate({
                path: "user likes",
                select: "email username name pic",
            });

        

        posts.sort((a, b) => {
            const likesA = a.likes ? a.likes.length : 0;
            const likesB = b.likes ? b.likes.length : 0;

            if (likesB !== likesA) {
                return likesB - likesA;
            }

            
            return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
        });

        return NextResponse.json({ success: true, posts });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" });
    }
};
