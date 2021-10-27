import React, { useState } from "react";
import CustomInput from "../components/CustomInput";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
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
      <form>
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
      </form>
    </div>
  );
};

export default LoginPage;
