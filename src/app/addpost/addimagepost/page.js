"use client"
import Loader from '@/Components/Loader/Loader';
import { Box, Button, FormControl, FormLabel, Heading, Input, VStack, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
// import styles from ""

export default function page() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        caption: "",
        image: ""
    })
    const toast = useToast();
    const [loading, setLoading] = useState(false)
    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const OnFileChange = (e) => {
        postDetail(e.target.files[0])
    }

    const postDetail = (pic) => {
        setLoading(true);
        setLoading(true);
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

            fetch("https://api.cloudinary.com/v1_1/djgnjbsug/image/upload", {
                method: 'post',
                body: data
            }).then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data)
                setFormData({
                    ...formData,

                    image: data.url.toString()
                });
                console.log(data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            });
        } else {
            toast({
                title: 'Error to upload image',
                description: "Please use an image in jpg or png format",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false)
        }
    }
    const OnSubmit = async () => {
        setLoading(true);
        console.log(formData)
        if (!formData.image || !formData.caption) {
            toast({
                title: 'Input Error',
                description: "Please fill all credients",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }
        try {
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify(formData)
            }
            const response = await fetch('/api/post/addpost', config)
            const data = await response.json();
            console.log(data);
            if (data.success) {
                toast({
                    title: 'Post added Successfull',
                    description: "Your successfully added post in your account",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                console.log(data)
                router.push('/')
            }
            else {
                toast({
                    title: 'Error To Create Post',
                    description: data.error,
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login')
        }
    }, [])
    return (
        <Box
            width={{ base: "95vw", md: "45vw", xl: "45vw" }}
            margin={{ xl: "20px 28%", base: "10px", md: "20px 23%" }}
        >
            <VStack>
                <Heading color={"#343402"}>
                    Create Post
                </Heading>
                <FormControl id='email' isRequired fontWeight={900}
                    m={'5px 0px 5px 0px'}
                >
                    <FormLabel fontWeight={900}>
                        Enter Caption
                    </FormLabel>
                    <Input
                        type='text'
                        placeholder="Enter caption"
                        onChange={onChangeHandle}
                        value={formData.caption}
                        name='caption'
                    />
                </FormControl>
                <FormControl id='email' isRequired fontWeight={900}
                    m={'5px 0px 5px 0px'}
                >
                    <FormLabel fontWeight={900}>
                        Enter Image
                    </FormLabel>
                    <Input
                        type='file'
                        placeholder="Enter File"
                        onChange={OnFileChange}
                        name='file'
                        border={"none"}
                    />
                </FormControl>
                <Button
                    width={"100%"}
                    colorScheme='green'
                    style={{ marginTop: 15 }}
                    onClick={OnSubmit}
                >
                    {loading ? (<Loader />) : ("Create Post")}
                </Button>
            </VStack>

        </Box>
    )
}
