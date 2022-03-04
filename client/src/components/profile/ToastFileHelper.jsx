import React, { useState, useRef } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, Avatar } from '@chakra-ui/react';

function ToastFileHelper(props) {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
       <Avatar
            ml="auto"
            mr="auto"
            //src={user.photoURL}
            size="2xl"
            position="relative"
            mb="-8%"
            cursor="pointer"
            onClick={() => setIsOpen(true)}
        />

        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
         >
        <AlertDialogOverlay />
        <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Upload Photo
            </AlertDialogHeader>

            <AlertDialogBody>{props.getform()}</AlertDialogBody>

            <AlertDialogFooter>
                <Button bg="#FFB6BA" onClick={onClose} ml={3}>
                Close
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ToastFileHelper;
