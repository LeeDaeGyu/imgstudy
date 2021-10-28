import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = props => {
  const [me, setMe] = useState();

  useEffect(() => {
    const localSession = localStorage.getItem("sessionId");

    if (me) {
      axios.defaults.headers.common.sessionid = me.sessionId;
      console.log(me);
      localStorage.setItem("sessionId", me.sessionId);
    } else if (localSession) {
      axios
        .get("/users/me", { headers: { sessionId: localSession } })
        .then(result => {
          setMe({
            username: result.data.name,
            userId: result.data.userId,
            sessionId: result.data.sessionId
          });
        })
        .catch(() => {
          localStorage.removeItem("sessionId");
          delete axios.defaults.headers.common.sessionid;
        });
    } else {
      delete axios.defaults.headers.common.sessionid;
    }
  }, [me]);
  return (
    <AuthContext.Provider value={[me, setMe]}>
      {props.children}
    </AuthContext.Provider>
  );
};
