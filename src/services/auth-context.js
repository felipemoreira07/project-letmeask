import React from "react";

const AuthContext = React.createContext({
    user: {},
    signInWithGoogle: () => {}
  });
  
export default AuthContext;