import React, { Component, createContext } from 'react';
import { auth } from '../../firebase/index.js';
import  { onAuthStateChanged } from "firebase/auth";

export const FriendsContext = createContext({});


class FriendProvider extends Component {
    state = { friends: [] }
    unsubscribeFromAuth = null;

    componentDidMount = () => {

        //TODO: add listener
        // this.unsubscribeFromAuth = onAuthStateChanged( auth, (newFriends ) => {
        //     if (newFriends) {
            
        //         console.log('user in friend provider ', newFriends)
        //         this.setState({ 
        //             friends: [...friends, newFriends]
        //             })
            

        //     } 
        // })
    };

    componentWillUnmount = () => {
       // this.unsubscribeFromAuth();
    }

    render() {
        const { children } = this.props;

        return <FriendsContext.Provider value={this.state.friends}>{children}</FriendsContext.Provider>

    }
}

export default FriendProvider;