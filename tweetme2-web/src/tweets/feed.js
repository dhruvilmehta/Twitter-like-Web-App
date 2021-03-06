import React,{useEffect,useState} from 'react'
import {apiTweetFeed} from './lookup'
import {Tweet} from './detail'

export function FeedList(props){
    const [tweetsInit,setTweetsInit]=useState(props.newTweets ? props.newTweets : [])
    const [tweets,setTweets]=useState([])
    const [nextUrl,setNextUrl]=useState(null)
    const [tweetsDidSet,setTweetsDidSet]=useState(false)
    // console.log(props.newTweets)           Both returns same
    // console.log([...props.newTweets])      Both returns same
    console.log("username",props.username)
    // setTweetsInit([...props.newTweets].concat(tweetsInit)) Goes into infinite loop if used here
    useEffect(()=>{
      const final = [...props.newTweets].concat(tweetsInit)
      if(final.length !== tweets.length){
        setTweets(final)
      }
    },[props.newTweets,tweets,tweetsInit])
    useEffect(()=>{
      if(tweetsDidSet===false){
        const handleTweetListLookup=(response,status)=>{
          // console.log(response,status)
          setNextUrl(response.next)
          // console.log(props.username)
        if (status===200){
          setTweetsInit(response.results)
          setTweetsDidSet(true)
        }
      }
      apiTweetFeed(handleTweetListLookup)
      }
    
    },[tweetsInit,tweetsDidSet,setTweetsDidSet,props.username])
  
    const handleDidRetweet=(newTweet)=>{
      const updatedTweetsInit=[...tweetsInit]
      updatedTweetsInit.unshift(newTweet)
      setTweetsInit(updatedTweetsInit)
  
      const updatedFinalTweets=[...tweets]
      updatedFinalTweets.unshift(tweets)
      setTweets(updatedFinalTweets)
    }
    const handleLoadNext=(event)=>{
      event.preventDefault()
      if(nextUrl!==null){
        const handleLoadNextResponse=(response,status)=>{
          console.log(response,status)
          // console.log(props.username)
          if (status===200){
            setNextUrl(response.next)
            const newTweets=[...tweets.concat(response.results)]
            setTweetsInit(newTweets)
            setTweets(newTweets)
          }
        }
        apiTweetFeed(handleLoadNextResponse,nextUrl)
      }
    }
    // console.log("next Url ",nextUrl)

      return <React.Fragment>{tweets.map((item,index)=>{
        return <Tweet tweet={item} didRetweet={handleDidRetweet} className='my-5 py-5 border bg-white text-dark' key={`${index}-{item.id}`}/>
    })}
    {nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>Load Next</button>}
    </React.Fragment>
  }