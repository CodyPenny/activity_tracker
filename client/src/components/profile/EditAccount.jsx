import React, { useState, useRef } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, ModalCloseButton, Flex, Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { MdDone } from 'react-icons/md'
import { saveImageToStorage } from '../../firebase/user'

const EditAccount = ({isOpen, onOpen, onClose, uid}) => {
  const [ imageInput, setImageInput ] = useState(null)
  const [ isAvatarError, setIsAvatarError ] = useState(false)
  const [ showLoading, setShowLoading ] = useState(false)
  const [ submittedFile, setSubmittedFile ] = useState(false)
  const inputFileRef = useRef()

  const handleFileSubmit = async ( e ) => {
    e.preventDefault();
    if (!imageInput) {
        setIsAvatarError(true)
        return
    }
    setShowLoading(true)
    await saveImageToStorage( imageInput, uid )
    setShowLoading(false)
    setSubmittedFile(true)
  }

  const handleOnFileChange = (e) => {
      console.log('onChenge', e.target.files[0])
      if(submittedFile){
        setSubmittedFile(false)
    }
      setImageInput(e.target.files[0])
      if (isAvatarError) {
        setIsAvatarError(false)
    }
  }

  /**
   * Clear any errors and original settings before closing the modal
   */
  const handleReset = () => {
    if(isAvatarError){
        setIsAvatarError(false)
    }
    if(submittedFile){
        setSubmittedFile(false)
    }
    onClose()
  }

  return (
    <>
        <Modal isOpen={isOpen} onClose={handleReset}>
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
                            mt=".8rem"
                            textAlign={["left","center"]}
                            isInvalid={isAvatarError}
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
                                w={["100%", "60%"]}
                                border="none"
                                p="0"
                                borderRadius="0"
                                mr={["1rem"]}
                                ref={inputFileRef}
                                onChange={handleOnFileChange}
                            />
                            <Button
                                fontSize='14px'
                                h="1.7rem"
                                type='submit'
                                float="right"
                                width="20%"
                                isLoading={showLoading}
                                _hover={{
                                  bg: "brand.500"
                                }}
                                onClick={handleFileSubmit}
                            >
                                { submittedFile ? <MdDone color='green'/> : "Submit" }
                            </Button>
                            {isAvatarError && (
                                <FormErrorMessage>
                                    Upload an image file you'd like your avatar to show.
                                </FormErrorMessage>
                            )}
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