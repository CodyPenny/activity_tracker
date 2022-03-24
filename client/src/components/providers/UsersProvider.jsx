import React, { Component, createContext } from 'react';
import { auth, getRef } from '../../firebase/index.js';
import  { onAuthStateChanged } from "firebase/auth";
import { getFriendsCollection } from '../../firebase/friend.js';
import { getUserChallengeCollection, getChallenge, getChallengeMemberCount } from '../../firebase/challenge.js';
import { onValue, onChildAdded } from "firebase/database";
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
       challenges: [] 
    };
    unsubscribeFromAuth = null;

    getChallenges = async ( uid ) => {
        const u_c_ref = getUserChallengeCollection( uid )
        onChildAdded( u_c_ref, async (challenge_id) => {
            console.log('the child data', challenge_id.key)
            const challenge_data = await getChallenge( challenge_id.key )
            console.log('new_challenge_data', challenge_data)
            const members = await getChallengeMemberCount( challenge_id.key )
            console.log("members", members)
            challenge_data.member_count = members
            this.setState({
                challenges: [...this.state.challenges, challenge_data]
            })

        })
    }

    getFriends = ( uid ) => {
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

    getUserData = ( user_uid ) => {
        const u_ref = getRef("users", user_uid)
        onValue( u_ref, (snapshot) => {
            this.setState({
                user: snapshot.val()
            })
        })
    }


    componentDidMount = () => {

        this.unsubscribeFromAuth = onAuthStateChanged( auth, async (user ) => {
            if (user) {
            
                console.log('user in user provider ', user)
                sessionStorage.setItem('Auth Token', user.accessToken)
                this.getUserData( user.uid )
                this.getFriends( user.uid )
                //this.getChallenges( user.uid )
          
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