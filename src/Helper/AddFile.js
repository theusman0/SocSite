const postDetail = async (pic) => {

    if (pic === undefined) {
        toast({
            title: 'Error to upload image',
            description: "Image not found",
            status: 'warning',
            duration: 5000,
            isClosable: true,
        })
        return;
    }
    if (pic.type === 'image/jpg' || pic.type === 'image/jpeg' || pic.type === 'image/png') {
        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "socsiteimage");
        data.append("cloud_name", "djgnjbsug");

        const respone = await fetch("https://api.cloudinary.com/v1_1/djgnjbsug/image/upload", {
            method: 'post',
            body: data
        })
        const data1 = await respone.json();
        return data1.url.toString()

    } else {
        toast({
            title: 'Error to upload image',
            description: "Please use an image in jpg or png format",
            status: 'warning',
            duration: 5000,
            isClosable: true,
        });
    }
}
export default postDetail;