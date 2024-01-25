export const fetchUser = async () => {
    try {
        const response = await fetch('/api/user/getuser', {
            headers: {
                "token": localStorage.getItem('token'),
            }
        })
        const data = await response.json()

        if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user))
            return data.user
        }
    }
    catch (error) {
        console.log(error)
    }
}
