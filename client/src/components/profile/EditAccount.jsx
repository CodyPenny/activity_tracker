import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, ModalCloseButton, Flex, Text, Heading, Box, Input, FormControl, FormLabel } from '@chakra-ui/react'

const EditAccount = ({isOpen, onOpen, onClose}) => {
  const [ imageInput, setImageInput ] = useState(null)

  const handleFileSubmit = async ( e ) => {
    e.preventDefault();
    console.log('handling file submit', imageInput, imageInput.files)
    // verify there is a file
    if(imageInput.files.length < 1){
        //throw error
        return
    }

    // save to db
  }

  return (
    <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader
                textAlign="center"
                >
                    Edit Profile
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                      flexDir="column"
                    >
                        <FormControl
                            bg="brand.300"
                            p="1.5rem"
                            rounded="5px"
                            onSubmit={handleFileSubmit}
                            mt=".8rem"
                            textAlign={["left","center"]}
                        >
                            <FormLabel
                              color="brand.800"
                              fontSize={["sm", "md"]}
                            >
                                Avatar
                            </FormLabel>
                            <Input
                                type="file"
                                id="file-import"
                                accept=".png, .jpeg, .jpg"
                                textAlign="center"
                                fontSize="14px"
                                // bg="brand.200"
                                w={["100%", "60%"]}
                                border="none"
                                p="0"
                                borderRadius="0"

                                mr={["1rem"]}
                                ref={(ref) => (setImageInput(ref))}
                            />
                            <Button
                                fontSize='14px'
                                h="1.7rem"
                                type="submit"
                                float="right"
                                _hover={{
                                  bg: "brand.500"
                                }}
                            >
                                Submit
                            </Button>
                        </FormControl>
     
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
                </ModalContent>
        </Modal>
    </>
  )
}

export default EditAccount