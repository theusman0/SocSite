"use client";

import React, { useEffect } from 'react';
import styles from "./page.module.css";
import { Box, Button, Heading, useToast } from '@chakra-ui/react';

export default function Page({ params }) {
    const { token } = params;
    const toast = useToast();

    const requestData = async () => {
        const data = {
            token
        };
        
        try {
            console.log(data);
            const response = await fetch('/api/user/confirm', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)  
            });

            const responseData = await response.json();

            if (!responseData.success) {
                toast({
                    title: 'Account creation failed',
                    description: "There is some issue with your token",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Account Confirmed',
                    description: "Your account confirmed successfully",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                localStorage.setItem("token", responseData.token);
            }


            
        } catch (error) {
            console.error(error);
            toast({
                title: 'Account confirmation failed',
                description: "There is an issue confirming your account",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            height={"88vh"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
        >
            <Heading
                padding={"30px 0px"}
                color="#344502"
                textAlign={"center"}
            >
                Welcome to <span>Soc</span><span style={{ color: '#AFAF02' }}>Site</span> Family
            </Heading>
            <Button
                padding={"10px 20px"}
                colorScheme={"teal"}
                onClick={requestData}
            >
                Push to Profile
            </Button>
        </Box>
    );
}
