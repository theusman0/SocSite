import UserModel from "@/models/User"
import { NextResponse } from "next/server";
import bycrpt from "bcryptjs"
import IsLogin from "@/Helper/isLogin";
import ConnectToDB from "@/Helper/db";


ConnectToDB()

export const PUT = async (request) => {
    try {
        const { password, Bio, name, pic, bgPic } = await request.json();
        if (await IsLogin(request) === false) {
            return NextResponse.json({ success: false, error: "invalid token" })
        }
        console.log(Bio)
        const user = await UserModel.findById(request.user.id);
        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" })
        }
        if (Bio) {
            user.Bio = Bio
            await user.save();
        }
        if (name) {
            user.name = name;
            await user.save();
        }
        if (password) {
            const salt = await bycrpt.genSalt(10);
            const hashPass = await bycrpt.hash(password, salt);
            user.password = hashPass;
            await user.save();
        }
        if (pic) {
            
            user.pic = pic;
        }
        if (bgPic)
            user.bgPic = bgPic;
        await user.save();
        return NextResponse.json({ success: true, user })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: true, "user": "user" })
    }
}