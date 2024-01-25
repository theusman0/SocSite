"use client"

import { FormControl, Input, InputGroup, FormLabel, InputRightElement, VStack, Button, Box, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { Router } from 'react-router-dom';
import Loader from '@/Components/Loader/Loader';

function Signup() {
    // const { setChats } = useContext(Context)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
        username: ""
    })
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const router = useRouter();

    const OnSubmit = async () => {
        setLoading(true);
        console.log(formData);
        
        if (formData.password !== formData.confirmPass) {
            toast({
                title: 'Confirm Password',
                description: "Confirm Password and Entered Password Should be same",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        const data = {
            name: formData.name,
            username: formData.username,
            password: formData.password,
            email: formData.email
        }
        const response = await fetch('/api/user/createuser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json();
        if (responseData.success) {
            router.push('/confirm')
        }
    }


    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return (
        <Box
            width={{ base: "95vw", md: "50vw", xl: "50vw" }}
            margin={{ xl: "20px 28%", base: "10px", md: "20px 23%" }}
        >
            <VStack
            >
                <FormControl id='name' isRequired fontWeight={900}
                    m={'5px 0px 5px 0px'}
                >
                    <FormLabel fontWeight={900}>
                        Enter your Name
                    </FormLabel>
                    <Input
                        type='text'
                        placeholder="Enter your Name"
                        onChange={onChangeHandle}
                        value={formData.name}
                        name='name'
                    />
                </FormControl>
                <FormControl id='email' isRequired fontWeight={900}
                    m={'5px 0px 5px 0px'}
                >
                    <FormLabel fontWeight={900}>
                        Enter your Email
                    </FormLabel>
                    <Input
                        type='email'
                        placeholder="Enter your Email"
                        onChange={onChangeHandle}
                        value={formData.email}
                        name='email'
                    />
                </FormControl>
                <FormControl id='email' isRequired fontWeight={900}
                    m={'5px 0px 5px 0px'}
                >
                    <FormLabel fontWeight={900}>
                        Enter your Username
                    </FormLabel>
                    <Input
                        type='text'
                        placeholder="Enter your Username"
                        onChange={onChangeHandle}
                        value={formData.username}
                        name='username'
                    />
                </FormControl>
                <FormControl isRequired id='password'>
                    <FormLabel fontWeight={900}>
                        Enter your Password
                    </FormLabel>
                    <InputGroup>
                        <Input
                            type={show ? 'text' : 'password'}
                            placeholder="Enter your Password"
                            onChange={onChangeHandle}
                            value={formData.password}
                            name='password'
                        />
                        <InputRightElement>
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontWeight={900}>
                        Confirm Password
                    </FormLabel>
                    <InputGroup>
                        <Input
                            type={show ? 'text' : 'password'}
                            placeholder="Enter your Password"
                            onChange={onChangeHandle}
                            value={formData.confirmPass}
                            name='confirmPass'
                        />
                        <InputRightElement>
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button
                    width={"100%"}
                    colorScheme='blue'
                    style={{ marginTop: 15 }}
                    isLoading={loading}
                    onClick={OnSubmit}
                >
                    {loading ? (<Loader />) : ("Signup")}
                </Button>
            </VStack>
            <Text
                textDecoration={'underline'}
                textAlign={'center'}
                margin={"20px 0px"}
                    onClick={() => {
                        router.push('/login')

                }}
                cursor={'pointer'}
                >
                    Login Account
                </Text>
        </Box>
    )
}

export default Signup
