import React, { useState, useContext } from "react";
import axios from "axios";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setMe] = useContext(AuthContext);
  const history = useHistory();
  const onSubmitHandler = async e => {
    try {
      e.preventDefault();
      if (username.length < 3 || password.length < 6)
        throw new Error("입력하신 정보가 올바르지 않습니다.");
      const result = await axios.patch("/users/login", { username, password });
      console.log(result);
      setMe({
        usersname: result.data.name,
        sessionId: result.data.sessionId,
        userId: result.data.userId
      });
      toast.success("로그인 성공!");
      history.push("/");
    } catch (err) {
      console.error(err.message);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div
      style={{
        marginTop: 100,
        maxWidth: 350,
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <h3>로그인</h3>
      <form onSubmit={onSubmitHandler}>
        <CustomInput label="회원ID" value={username} setValue={setUsername} />
        <CustomInput
          label="비밀번호"
          value={password}
          setValue={setPassword}
          type="password"
        />
        <button tpye="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
