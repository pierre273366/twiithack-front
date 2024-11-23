import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import bluetweet from "../modules/bluetweet";

function Tweet(props) {
  const user = useSelector((state) => state.user.value);
  // Like tweet
  const handleLikeTweet = () => {
    fetch("http://localhost:3000/tweet/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, id: props.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          props.refreshLastTweet();
        }
      });
  };
  //Dislike tweet
  const handleDislikeTweet = () => {
    fetch("http://localhost:3000/tweet/dislike", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, id: props.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          props.refreshLastTweet();
        }
      });
  };

  function deleteTweet() {
    fetch("http://localhost:3000/tweet/deleteTweet", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          props.refreshLastTweet();
        }
      });
  }

  let heartIconStyle = { cursor: "pointer" };
  if (props.isLiked) {
    heartIconStyle = { color: "#e74c3c", cursor: "pointer" };
  }

  const newBlueTweet = bluetweet(props.tweet);

  return (
    <div className={styles.postContainer}>
      <div className={styles.user}>
        <img className={styles.avatar} src="avatar.png" />
        <p>{props.name}</p>
        <p className={styles.grey}>@{props.username} </p>
        <span className={styles.grey}>{props.date}</span>
      </div>
      <div className={styles.tweet}>
        <p>{newBlueTweet}</p>
      </div>
      <div className={styles.like}>
        <span>
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => {
              !props.isLiked ? handleLikeTweet() : handleDislikeTweet();
            }}
            style={heartIconStyle}
            className="like"
          />
        </span>
        <span>{props.counter}</span>
        <span>
          {props.token === user.token && (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => deleteTweet()}
              className="delete"
            />
          )}
        </span>
      </div>
    </div>
  );
}

export default Tweet;
