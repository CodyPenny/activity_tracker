import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, deleteUser } from "firebase/auth";

import { auth, provider } from ".";
import { deleteUserFromCollections } from "./user";

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
 export const signInWithEmail = async (email, password) =>
 await signInWithEmailAndPassword(auth, email, password);

 /**
 * Authenticates with Firebase and creates a new user in FireBase
 * Stores the token in session storage
 * @param {*} email 
 * @param {*} password 
 * @returns user's token and authentication to UsersProvider
 */
export const registerWithEmailAndPassword = async ( email, password ) =>{
    let user =  await createUserWithEmailAndPassword(auth, email, password)
    sessionStorage.setItem('Auth Token', user._tokenResponse.refreshToken)
    return user.user
  }

/**
 * Send a password reset email to the user's email
 * @param {*} email 
 * @returns promise password reset email has been sent
 */
export const resetPasswordWithEmail = async (email) => {
    await sendPasswordResetEmail(auth, email);
  }

/**
 * Authenticate with Google's OAuth
 * @returns 
 */
 export const signInWithGoogle = async () => await signInWithPopup(auth, provider);

 /**
 * 
 * @returns 
 */
export const signOutOfApp = () => signOut(auth)

/**
 * Delete user account from auth
 */
export const deleteThisUser = async ( u_uid ) => {
  const user = auth.currentUser;
  //deletes user from auth provider
  await deleteUser(user)
  console.log('user from delete user', user)
  // removes user from db
  await deleteUserFromCollections( u_uid )
}