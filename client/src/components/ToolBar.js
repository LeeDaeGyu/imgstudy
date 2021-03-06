import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const ToolBar = () => {
  const [me, setMe] = useContext(AuthContext);

  const logoutHandler = async e => {
    try {
      await axios.patch(
        "/users/logout",
        {}
        // {
        //   headers: { sessionid: me.sessionId }
        // }
      );
      setMe();
      localStorage.removeItem("sessionId");
      toast.success("로그아웃");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Link to="/">
        <span>홈</span>
      </Link>

      {me ? (
        <span
          style={{ float: "right", cursor: "pointer" }}
          onClick={logoutHandler}
        >
          로그아웃 {me.userId}
        </span>
      ) : (
        <>
          <Link to="/auth/login">
            <span style={{ float: "right" }}>로그인</span>
          </Link>
          <Link to="/auth/register">
            <span style={{ float: "right", marginRight: 15 }}>회원가입</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default ToolBar;
