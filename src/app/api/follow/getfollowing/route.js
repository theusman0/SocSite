import ConnectToDB from "@/Helper/db";
import IsLogin from "@/Helper/isLogin";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
ConnectToDB();
export const POST = async (request, { params }) => {
    try {
        if (await IsLogin(request) === false) {
            return NextResponse.json({success: false, error: "invalid token"})
        }
        const user = await UserModel.findById(request.user.id);
        if (user) {
            return NextResponse.json({success: true, error:"user not exists"})
        }
        
        return NextResponse.json({ success: true, user })
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, error :"Internal Error"});
    }
}