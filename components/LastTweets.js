import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Tweet from '../components/Tweet'
import { useSelector } from 'react-redux';

function LastTweets(){
const [tweets, setTweets] = useState([])
const [refresh, setRefresh] = useState(false)
const user = useSelector((state) => state.user.value);

    useEffect(() => {
        fetch('http://localhost:3000/tweet/wall')
        .then(res =>res.json())
        .then(data => setTweets(data.tweet))
      }, [refresh]);
     
      
      const afficherTempsEcoule = (dateCreation) => {
        let datePost = new Date(dateCreation).getTime() // Calculer la différence en millisecondes
        let diffMs = Date.now() - datePost;
   
        // Convertir cette différence en secondes, minutes, heures, jours
        let seconds = Math.floor(diffMs / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
    
        // Formater en chaîne lisible
        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`; // Si plus d'un jour
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`; // Si plus d'une heure
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`; // Si plus d'une minute
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`; // Moins d'une minute
        }
    };

    function refreshLastTweet(){
      setRefresh(!refresh)
    }

      const allTweets = tweets.map((data, i) => {
        let timeAgo = afficherTempsEcoule(data.creationDate);
        let isLiked = false
        if(data.like.some(e => e.token === user.token)){
          isLiked = true
        }
          return <Tweet key={i} name={data.user.name} username={data.user.username} token={data.user.token} tweet={data.tweet} date={timeAgo} counter={data.like.length} id={data._id} isLiked={isLiked} refreshLastTweet={refreshLastTweet}/>;
      });


   

  return <>{allTweets}</>;
}

export default LastTweets;
