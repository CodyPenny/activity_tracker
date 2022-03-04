// Dependencies
import React, { Component } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import ToastFileHelper from './ToastFileHelper.jsx';
import { MdOutlineFileDownload } from 'react-icons/md'
import { getUserUid } from '../../firebase/user.js'
import { getRef, storage } from '../../firebase/index.js'

class UploadFile extends Component {
  imageInput = null;

//   get userRef() {
//     return db.doc(`users/${this.uid}`);
//   }

  get file() {
    return this.imageInput && this.imageInput.files[0];
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const uid = await getUserUid()

    if (this.file) {
      storage
        .ref()
        .child('user-profiles')
        .child(uid)
        .child(this.file.name)
        .put(this.file)
        .then((response) => response.ref.getDownloadURL())
        .then((photoURL) => getRef("users", uid).update({ photoURL }));
    }
  };

  getfile = () => {
    return (
      <Flex direction="column" justify="center">
        <form
          onSubmit={this.handleSubmit}
          style={{ position: 'relative', border: 'black' }}
        >
          <Text mb="5%">
            1.{' '}
            <input
              type="file"
              id="file-import"
              style={{
                position: 'relative',
                textAlign: 'center',
                fontSize: '14px',
                background: 'white',
                width: '80%'
              }}
              ref={(ref) => (this.imageInput = ref)}
            />
          </Text>

          <Text>
            2.{' '}
            <Button
              type="submit"
              rounded="4px"
              w="50%"
              h="30px"
              textAlign="center"
              bg="#F7EEC7"
              _hover={{ bg: '#FFFF29' }}
            >
              <MdOutlineFileDownload mr=".5rem"/> Update Avatar
            </Button>
          </Text>
        </form>{' '}
      </Flex>
    );
  };

  render() {
    return (
      <Box align="center">
        <ToastFileHelper clear={this.clearFileUpload} getform={this.getfile} />
      </Box>
    );
  }
}

export default UploadFile;
