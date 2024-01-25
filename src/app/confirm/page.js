"use client";

import { Box, Button, Heading, Text } from '@chakra-ui/react';

export default function Page() {
    

    return (
        <Box
            height={"88vh"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
        >
            <Heading
                padding={"10px 0px"}
                color="#344502"
                textAlign={"center"}
            >
                Welcome to <span>Soc</span><span style={{ color: '#AFAF02' }}>Site</span> Family
            </Heading>
            <Text
                fontSize="23px"
                fontWeight="bold"
                padding={"0px 0px 30px 0px"}
            >
                We Recive a mail from SocSite. You confirm your account
            </Text>
            <Button
                padding={"10px 20px"}
                colorScheme={"teal"}
                onClick={() => {
                    window.location = "https://mail.google.com/mail/u/0/#inbox"
                }}

            >
                Go to Gmail
            </Button>
        </Box>
    );
}
