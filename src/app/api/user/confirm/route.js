import ConnectToDB from "@/Helper/db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; 

ConnectToDB();

export const POST = async (request) => {
    try {
        const { token } = await request.json();
        const user = await UserModel.findOne({ confirmationToken: token });
        if (!user) {
            return NextResponse.json({success: false, error: "Invalid confirmation token"})
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const jwtToken = jwt.sign(data, process.env.Secrete_Key);
        user.isConfirmed = true;
        await user.save();
        return NextResponse.json({ success: true, user: user, token: jwtToken });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Internal Server error" })
    }
}

