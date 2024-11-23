const bluetweet = (Tweet) => {
  const parts = Tweet.split(/(#[a-zA-Z0-9_]+)/g);
  return parts.map((part, index) => {
    if (part.startsWith("#")) {
      return (
        <span key={index} style={{ color: "#3690ED" }}>
          {part}
        </span>
      );
    } else {
      return part;
    }
  });
};

export default bluetweet;
