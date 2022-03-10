import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, ModalCloseButton, Flex, Text } from '@chakra-ui/react'

const EditAccount = ({isOpen, onOpen, onClose}) => {
  const [ imageInput, setImageInput ] = useState(null)

  const handleFileSubmit = async ( e ) => {
    e.preventDefault();
    console.log('handling file submit')
  }

  return (
    <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex>
                    <Text>Avatar</Text>
                    <form onSubmit={handleFileSubmit}>
                        <input
                          type="file"
                          id="file-import"
                          accept=".png, .jpeg, .jpg"
                          style={{
                            position: 'relative',
                            textAlign: 'center',
                            fontSize: '14px',
                            background: 'white',
                            width: '80%'
                          }}
                          ref={(ref) => (setImageInput(ref))}
                        />
                        <Button
                          type="submit"
                        >
                            Upload Photo
                        </Button>
                    </form>
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