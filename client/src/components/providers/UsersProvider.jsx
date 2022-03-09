import React, { Component, createContext } from 'react';
import { auth } from '../../firebase/index.js';
import  { onAuthStateChanged } from "firebase/auth";
import { getFriendsCollection } from '../../firebase/friend.js';
import { onValue } from "firebase/database";
import { getUser } from '../../firebase/user.js';

export const UserContext = createContext({});

/**
 * Runs on website load - gets friends and user profile from db once user is authenticated
 * Uses an observer that gets called whenever the user's sign-in state changes
 */
class UsersProvider extends Component {
    state = { 
        user: null,
       friends: [] 
    };
    unsubscribeFromAuth = null;

    getFriends = async () => {
        const db_Ref = getFriendsCollection( this.state.user.uid  )
        const friendsToFetch = []

        onValue( db_Ref, (snapshot) => {
            snapshot.forEach( doc => {
                friendsToFetch.push(doc.key)
            })

            Promise.all( friendsToFetch.map( async (id) => {
                return await getUser( id )
            }))
            .then((val) => {
                this.setState({
                    friends:[...this.state.friends, ...val]
                })
            })
            
        })
    }


    componentDidMount = () => {

        this.unsubscribeFromAuth = onAuthStateChanged( auth, async (user ) => {
            if (user) {
            
                console.log('user in user provider ', user)

                // get user info from db
                let profile = await getUser( user.uid )
                this.setState({
                    user: profile
                })
                sessionStorage.setItem('Auth Token', user.accessToken)

            this.getFriends()
          
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
    
        return <UserContext.Provider value={this.state}>{children}</UserContext.Provider>;
    }
}

export default UsersProvider;