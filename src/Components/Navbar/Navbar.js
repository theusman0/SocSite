"use client"
import { Search2Icon } from '@chakra-ui/icons'
import { Box, Heading, Avatar, Text, Button } from '@chakra-ui/react'
import { Wrap } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import Link from 'next/link'
import { fetchUser } from '@/Helper/config'

const Navbar = () => {
    const [user, setUser] = useState();
    useEffect(() => {
        return async () => {
            const u = await fetchUser();
            setUser(u);
        }
    }, [])
    return (
        <div className='Navbar'>
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                padding={'15px 20px'}
                alignItems='center'

            >
                {/* <Button
                    padding={'3px 20px'}
                    alignItems={'center'}
                    marginRight='30px'
                    borderRadius='5px'
                    colorScheme='gray'
                    display={{ base: "none", xl: 'flex', md: 'flex' }}
                >
                    <Search2Icon />
                    &nbsp; Search User
                </Button> */}

                <Box
                    display='flex'
                    alignItems={'center'}
                >

                    <Heading
                        fontSize={'28px'}
                        color={'#344502'}
                        fontWeight={600}
                    >
                        <span>Soc</span><span style={{ color: '#AFAF02' }}>Site</span>
                    </Heading>
                </Box>
                <Box
                    display={'flex'}
                    alignItems='center'
                >
                    <Box
                        padding={'0px 5px'}
                        cursor='pointer'
                        width={{ base: 35, md: 47, xl: 47 }}
                    >
                        <Menu>
                            <MenuButton  >
                                <Image src={'/add.png'} width={37} height={37} />
                            </MenuButton>
                            <MenuList>
                                <Link href={'/addpost'}>
                                    <MenuItem>Write Post</MenuItem> </Link>
                                <Link href={'/addpost/addimagepost'}><MenuItem>Add Image</MenuItem> </Link>


                            </MenuList>
                        </Menu>
                    </Box>
                    <Wrap
                        padding={'0px 5px'}
                        cursor='pointer'
                        display={{ base: "none", xl: 'block', md: 'block' }}
                    >
                        <Avatar name='Usman Javed' size='md' />
                    </Wrap>
                    <Box
                        padding={'0px'}
                        cursor='pointer'
                    >
                        <Menu>
                            <MenuButton  >
                                <Image src={'/dots.png'} width={32} height={32} />
                            </MenuButton>
                            <MenuList>
                                <Link href={'/addpost'}>
                                    <MenuItem>Write Post</MenuItem> </Link>
                                <MenuItem onClick={() => {
                                    localStorage.removeItem('token')
                                    localStorage.removeItem('user')
                                    window.location.reload()
                                }}>Logout</MenuItem>

                            </MenuList>
                        </Menu>

                    </Box>
                </Box>
            </Box>
            <hr />
        </div>
    )
}

export default Navbar
