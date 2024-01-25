"use client"

import { FormControl, FormLabel, Input, VStack, Button, Box, Textarea, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import Loader from '@/Components/Loader/Loader'
function page() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        caption: "",
        content: ""
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
    const submitHandler = async () => {
        setLoading(true);
        console.log('submitHandler', formData)
        if (!formData.caption || !formData.content) {
            toast({
                title: 'Fill all Field',
                description: "Data of some flied is missing",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false)
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
                    title: 'Error To login Account',
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
                <FormControl isRequired
                    m={'5px 0px 5px 0px'}>
                    <FormLabel fontWeight={900}>
                        Enter your Content
                    </FormLabel>
                    <Textarea
                        value={formData.content}
                        onChange={onChangeHandle}
                        placeholder='Enter the Content of post'
                        size='sm'
                        rows={10}
                        name={"content"}
                    />
                </FormControl>
                <Button
                    width={"100%"}
                    colorScheme='green'
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                >
                    {loading ? (<Loader />) : ("Craete Post")}
                </Button>

            </VStack>
        </Box>
    )
}

export default page

