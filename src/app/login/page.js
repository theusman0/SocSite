"use client"

import { FormControl, FormLabel, Input, VStack, Button, Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import Loader from '@/Components/Loader/Loader'
function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
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
        setLoading(true)
        if (!formData.password || !formData.username) {
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }
            const response = await fetch('/api/user/login', config)
            const data = await response.json();
            console.log(data);
            if (data.success) {
                toast({
                    title: 'Login Successfull',
                    description: "Your successfully loged in your account",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                console.log(data)
                localStorage.setItem("user", JSON.stringify(data.user))
                localStorage.setItem("token", data.token)
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
    return (
        <Box
            width={{ base: "95vw", md: "45vw", xl: "45vw" }}
            margin={{ xl: "20px 28%", base: "10px", md: "20px 23%" }}
        >
            <VStack>
                <FormControl id='email' isRequired fontWeight={900}
                    m={'5px 0px 5px 0px'}
                >
                    <FormLabel fontWeight={900}>
                        Enter your Email
                    </FormLabel>
                    <Input
                        type='text'
                        placeholder="Enter your Email"
                        onChange={onChangeHandle}
                        value={formData.username}
                        name='username'
                    />
                </FormControl>
                <FormControl isRequired
                    m={'5px 0px 5px 0px'}>
                    <FormLabel fontWeight={900}>
                        Enter your Password
                    </FormLabel>
                    <Input
                        type='password'
                        placeholder="Enter your Password"
                        onChange={onChangeHandle}
                        value={formData.password}
                        name='password'
                    />
                </FormControl>
                <Button
                    width={"100%"}
                    colorScheme='blue'
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                    isLoading={loading}
                >
                    {loading ? (<Loader />) : ("Login")}
                </Button>
                <Text
                    textDecoration={'underline'}
                    onClick={() => {
                        router.push('/signup')
                    }}
                    cursor={'pointer'}
                >
                    Create Account
                </Text>
            </VStack>
        </Box>
    )
}

export default Login
