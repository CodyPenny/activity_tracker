import React, { Component, createContext } from 'react';
import { auth, getRef } from '../../firebase/index.js';
import  { onAuthStateChanged } from "firebase/auth";
import { getFriendsCollection } from '../../firebase/friend.js';
import { getUserChallengeCollection, getChallenge,  } from '../../firebase/challenge.js';
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
        onChildAdded( u_c_ref, (data) => {
            console.log('getting challenges from user provider')
            const challenge_keys = []
            data.forEach( doc => {
                challenge_keys.push(doc.key)
            })

            Promise.all( challenge_keys.map( async (cuid) => { 
                return await getChallenge( cuid )
            }))
            .then((new_challenge_data) => {
                console.log('new_challenge_data', new_challenge_data)
                Promise.all( challenge_keys.map( async (id) => {
                    return await getChallengeMemberCount( id )
                }))
                .then(( num => {
                    console.log('the num in the promise', num)
                    for (let i = 0; i < new_challenge_data.length; i++) {
                        new_challenge_data[i].member_count = num[i]
                    }
                    this.setState({
                        challenges: [...this.state.challenges, ...new_challenge_data]
                    })
                    
                }))
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
                this.getChallenges( user.uid )
          
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