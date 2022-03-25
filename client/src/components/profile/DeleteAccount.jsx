import React, { useRef, useState } from 'react'
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, useToast } from '@chakra-ui/react'
import { deleteThisUser } from '../../firebase/auth'
import { useNavigate } from 'react-router-dom';


const DeleteAccount = ({ isOpen, onClose, uid }) => {
  const [ isDeleting, setIsDeleting ] = useState(false)
  const cancelRef = useRef()
  let navigate = useNavigate();
  const toast = useToast()

  const clear = async () => {
    setIsDeleting(true)
    await deleteThisUser(uid)
    sessionStorage.removeItem("Auth Token")
    toast({
      title: 'Account deleted.',
      description: "We've deleted your account.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    navigate('/login')
  }

  return (
    <>
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
      >
        <AlertDialogOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
        > 
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete 
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button 
              ref={cancelRef}
              onClick={onClose}
              isLoading={isDeleting}
              >
                Cancel
              </Button>
              <Button 
                colorScheme='red' 
                onClick={clear} 
                ml={3}
                isLoading={isDeleting}
                >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteAccount
