import ConnectToDB from "@/Helper/db";
import IsLogin from "@/Helper/isLogin";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

ConnectToDB();
export const GET = async (request) => {
    try {
        if (await IsLogin(request) === false) {
            return NextResponse.json({success: false, error: "invalid token"})
        }
        const user = await UserModel.findById(request.user.id).select("-password");
        if (!user) {
            return NextResponse.json({success: false, error: "User not found"})
        }
        const users = await UserModel.find().select("-password").sort({
            updatedAt: -1
        })
        return NextResponse.json({success: true, users})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: true, error: "Internal Server Error"});
    }
}