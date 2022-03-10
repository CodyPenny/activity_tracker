import React from 'react'
import { Modal,ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, } from '@chakra-ui/react'

const ActiveChallengeModal = ({isOpen, onClose, onOpen}) => {
  return (
      <>
        <Modal 
          isOpen={isOpen} 
          onClose={onClose} 
          isCentered
          motionPreset='slideInBottom'
          size="sm"
        >
          <ModalOverlay />
            <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {/* <Lorem count={2} /> */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil optio ipsa voluptatum repellendus doloribus corporis laboriosam laudantium perferendis cum aspernatur consequuntur vel illo est molestias iure sapiente, sit cumque. Reprehenderit.
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

export default ActiveChallengeModal