import { Button, Modal } from "antd";
import styles from "../styles/Signin.module.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import { useRouter } from "next/router";

function Signin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const SignInBtn = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data);
          dispatch(
            login({
              username: signInUsername,
              token: data.token,
              name: data.name,
            })
          );
          setSignInUsername("");
          setSignInPassword("");
        }
      });
  };

  console.log(user);
  if (user.token) {
    router.push("/twitter");
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Signin
      </Button>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className={styles.signinContainer}>
          <h1>Connect to Hackatweet</h1>
          <input
            className={styles.username}
            type="text"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
            placeholder="Username"
          ></input>
          <input
            type="password"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
            placeholder="Password"
          ></input>
          <button onClick={() => SignInBtn()}>Signin</button>
        </div>
      </Modal>
    </>
  );
}

export default Signin;
