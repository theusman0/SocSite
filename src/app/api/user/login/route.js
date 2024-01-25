import ConnectToDB from "@/Helper/db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server"
import bycrpt from "bcryptjs"
import jwt from "jsonwebtoken"


ConnectToDB();
export const POST = async (request) => {
    try {
        const { username, password } = await request.json();
        
        const user = await UserModel.findOne({ username, isConfirmed: true});
        if (!user) {
            return NextResponse.json({ success: false, error: "Fill valid credientialsNot" })
        }
        
        console.log(user.password,  password);
        const isUser = await bycrpt.compare(password, user.password)
        if (!isUser) { 
            return NextResponse.json({ success: false, error: "Fill valid credientials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, process.env.Secrete_Key)
        return NextResponse.json({success: true, token, user})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, error: "INternal Server Error"})
    }
}