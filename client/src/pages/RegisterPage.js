import React, { useState, useContext } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [me, setMe] = useContext(AuthContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const onSubmitHandler = async e => {
    try {
      e.preventDefault();
      if (username.length < 3) throw new Error("닉네임이 너무 짧습니다.");
      if (password.length < 6)
        throw new Error("비밀번호를 6자 이상으로 해주세요.");
      if (passwordCheck !== password)
        throw new Error("비밀번호를 확인해 주세요.");

      const result = await axios.post("/users/register", {
        name,
        username,
        password
      });

      const {
        data: { userId, usersname, sessionId }
      } = result;

      setMe({ userId, sessionId, usersname });
      toast.success("회원가입 성공!");
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }
  };
  return (
    <div
      style={{
        maxWidth: 350,
        marginTop: 100,
        marginRight: "auto",
        marginLeft: "auto"
      }}
    >
      <h3>회원가입</h3>
      <form onSubmit={onSubmitHandler}>
        <CustomInput label={"이름"} value={name} setValue={setName} />
        <CustomInput label={"닉네임"} value={username} setValue={setUsername} />
        <CustomInput
          label={"비밀번호"}
          value={password}
          setValue={setPassword}
          type={"password"}
        />
        <CustomInput
          label={"비밀번호 확인"}
          value={passwordCheck}
          setValue={setPasswordCheck}
          type={"password"}
        />
        <button type="submit">확인</button>
      </form>
    </div>
  );
};

export default LoginPage;
