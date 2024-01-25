import jwt from "jsonwebtoken";

const IsLogin = async (request) => {
    const token = request.headers.get("token");
    if (!token) {
        return false
    }
    try {
        const data = jwt.verify(token, process.env.Secrete_Key);
        if (!data) {
            return false
        }
        request.user = data.user;
        return true;
    } catch (error) {
        return false;
    }


}

export default IsLogin;