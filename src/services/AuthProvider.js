import AuthContext from "./auth-context";
import { useState, useEffect } from "react";
import { firebase, auth } from './firebase'

const AuthProvider = (props) => {
  const [user, setUser] = useState(undefined || {});  

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            const {displayName, photoURL, uid} = user
              
            if (!displayName || !photoURL) {
              throw new Error('Missing information from Google Account.')
            }
            
            setUser({
              id: uid,
              name: displayName,  
              avatar: photoURL
            })
          }  
      })

      return () => {
        unsubscribe();
      }
    }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const {displayName, photoURL, uid} = result.user
        
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }
      
      setUser({
        id: uid,
        name: displayName,  
        avatar: photoURL
      })
    }
  }

  const authContext = {
      user: user,
      signInWithGoogle: signInWithGoogle
    };
  
  return (
      <AuthContext.Provider value={authContext}>
        {props.children}
      </AuthContext.Provider>
    );
};
  
export default AuthProvider;