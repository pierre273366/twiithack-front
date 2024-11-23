import styles from "../styles/Twitter.module.css";
import Tweet from "./Tweet";
import Trends from "./Trends";
import LastTweets from "./LastTweets";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../reducers/user";
import { useRouter } from "next/router";

function Twitter() {
  const [rerender, setRerender] = useState(false);
  const [textTweet, setTextTweet] = useState("");
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();
  const maxLength = 280;

  const sendingPost = () => {
    fetch("http://localhost:3000/tweet/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, tweet: textTweet }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setRerender(!rerender);
        }
      });
  };

  const handleChange = (event) => {
    const newTextTweet = event.target.value;
    if (newTextTweet.length <= maxLength) {
      setTextTweet(newTextTweet);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <img className={styles.logo} src="logo_twitter.png" />
        <div>
          <div className={styles.profil}>
            <img className={styles.avatar} src="avatar.png" />

            <div>
              <p>{user.name}</p>
              <p className={styles.username}>@{user.username}</p>
            </div>
          </div>
          <button onClick={() => handleLogout()} className={styles.logout}>
            Logout
          </button>
        </div>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.tweetContainer}>
          <div className={styles.titleHome}>
            <h1>Home</h1>
          </div>
          <input
            onChange={(e) => setTextTweet(e.target.value)}
            className={styles.tweetInput}
            value={textTweet}
            placeholder="What's up ?"
            maxLength={280}
          ></input>
          <div className={styles.btnContainer}>
            <div className={styles.counter}>
              {textTweet.length}/{maxLength}
            </div>
            <button onClick={() => sendingPost()} className={styles.tweetBtn}>
              Tweet
            </button>
          </div>
        </div>
        <div className={styles.postContainer}>
          <LastTweets />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <h1 className={styles.trendsTitle}>Trends</h1>
        <div className={styles.trendsContainer}>
          <Trends />
          <div className={styles.trendsContent}></div>
        </div>
      </div>
    </div>
  );
}

export default Twitter;
