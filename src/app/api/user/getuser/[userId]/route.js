import ConnectToDB from "@/Helper/db";
import IsLogin from "@/Helper/isLogin";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

ConnectToDB();

export async function GET (request, { params }){
    const { userId } = params;
    if (await IsLogin(request) === false) {
        return NextResponse.json({success: false, error: "invalid token"})
    }
    try {
        console.log(userId);
        const user = await UserModel.findOne({username: userId, isConfirmed: true}).select("-password");
        if (!user) {
            return NextResponse.json({success: false, error: "User not found"})
        }
        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, error: "Internal Server Error"});
    }
}