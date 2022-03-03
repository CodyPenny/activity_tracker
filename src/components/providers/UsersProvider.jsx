import React, { Component, createContext } from 'react';
import { auth } from '../firebase.js';
import  { onAuthStateChanged } from "firebase/auth";


export const UserContext = createContext({});

/**
 * Runs on website load for user state
 * On register, a new user document is created once the users new username and pw is authenticated
 * Uses an observer that gets called whenever the user's sign-in state changes
 */
class UsersProvider extends Component {
    state = { user: null };
    unsubscribeFromAuth = null;

    componentDidMount = () => {

        this.unsubscribeFromAuth = onAuthStateChanged( auth, (user ) => {
            if (user) {
            
                console.log('user in user provider ', user)
                this.setState({ 
                    user: { uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                        } 
                    })
            

            } else {
            // user is signed out
            //this.setState({ user: userAuth });
            }
        })
    };

    componentWillUnmount = () => {
        this.unsubscribeFromAuth();
    };
    
    render() {
        const { children } = this.props;
    
        return <UserContext.Provider value={this.state.user}>{children}</UserContext.Provider>;
    }
}

export default UsersProvider;