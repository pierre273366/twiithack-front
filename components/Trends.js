import styles from '../styles/Trends.module.css';
import React, { useState, useEffect } from 'react';




function Trends(){

    const [hashtags, setHashtags] =useState([])
    const [hashtagsCount, setHashtagsCount] = useState({});




    const getAllHashtag = () => {
        fetch('http://localhost:3000/tweet/hashtag')
            .then(response => response.json())
            .then(data => {
                const hashtagsList = data.hashtag;

              
                const count = hashtagsList.reduce((acc, hashtag) => {

                    acc[hashtag] = acc[hashtag] ? acc[hashtag] + 1 : 1;
                    return acc;
                }, {});

                setHashtags(hashtagsList); 
                setHashtagsCount(count);   
            })

        }


      useEffect(() => {
        getAllHashtag();
    }, []);


    const trending = Object.keys(hashtagsCount).map((hashtag, i) => {
        return (
            <div key={i} className={styles.hashtagItem}>
                <p className={styles.hashtag}>{hashtag}</p>
                <span className={styles.span}>{hashtagsCount[hashtag]} tweets </span>
            </div>
          )})
    ;
    


return(
     <div className={styles.hashtagContainer}>
        
        {trending}
            
     </div>
)
}

export default Trends;
