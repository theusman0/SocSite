import ConnectToDB from "@/Helper/db";
import IsLogin from "@/Helper/isLogin";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
ConnectToDB();
export const POST = async (request, { params }) => {
    const { userId } = params;
    try {
        console.log(userId);
        if (await IsLogin(request) === false) {
            return NextResponse.json({ success: false, error: "invalid token" })
        }
        if (userId === request.user.id) {
            return NextResponse.json({ success: true, error: "Invalid request" })
        }
        const user = await UserModel.findById(userId)
        if (!user) {
            return NextResponse.json({ success: true, error: "user not exists" })
        }
        if (!user.following.includes(userId)) {
            user.following.push(userId)
        }
        else {
            user.following = user.following.filter(u => u !== userId)
        }
        return NextResponse.json({ success: true, user })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Internal Error" });
    }
}