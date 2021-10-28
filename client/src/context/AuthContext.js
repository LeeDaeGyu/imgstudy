import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = props => {
  const [me, setMe] = useState();
  return (
    <AuthContext.Provider value={[me, setMe]}>
      {props.children}
    </AuthContext.Provider>
  );
};
