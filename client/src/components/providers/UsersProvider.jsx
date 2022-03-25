import React, { Component, createContext } from 'react';
import { auth, getRef } from '../../firebase/index.js';
import  { onAuthStateChanged } from "firebase/auth";
import { getFriendsCollection } from '../../firebase/friend.js';
import { onValue } from "firebase/database";
import { getUser } from '../../firebase/user.js';


export const UserContext = createContext({});

/**
 * Runs on website load - gets friends and user profile from db once user is authenticated
 * Uses an observer that gets called whenever the user's sign-in state changes
 * Add a listener to the friends and user database reference
 */
class UsersProvider extends Component {
    state = { 
        user: null,
       friends: [],
    };
    unsubscribeFromAuth = null;

    // fetches friends also listens for new friends and updates state
    getFriends = ( uid ) => {
        //console.log('getting friend data')
        const db_Ref = getFriendsCollection( uid  )
        
        onValue( db_Ref, (snapshot) => {
            const friendsToFetch = []
            snapshot.forEach( doc => {
                if(doc.key && doc.key !== "undefined"){
                    friendsToFetch.push(doc.key)
                }
            })

            Promise.all( friendsToFetch.map( async (id) => {
                return await getUser( id )
            }))
            .then((val) => {
                this.setState({
                    friends:[...val]
                })
            })
            
        })
    }

    /**
     * Listens for any changes from the db and updates the state
     * @param {*} user_uid user's uid
     */
    getUserData = ( user_uid ) => {
        //console.log('getting user data')
        const u_ref = getRef("users", user_uid)
        // this method here is the observer
        onValue( u_ref, (snapshot) => {
            //console.log('getting another snapshot of user')
            this.setState({
                user: snapshot.val()
            })
        })
    }


    componentDidMount = () => {

        this.unsubscribeFromAuth = onAuthStateChanged( auth, async (user ) => {
            if (user) {
               // console.log('user in user provider-setting auth token ', user)
                sessionStorage.setItem('Auth Token', user.accessToken)
                this.getUserData( user.uid )
                this.getFriends( user.uid )
          
            } else {
            // user is signed out, user is null
            //console.log('user is signing out', user)
            this.setState({ user: user });
            sessionStorage.removeItem("Auth Token")
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