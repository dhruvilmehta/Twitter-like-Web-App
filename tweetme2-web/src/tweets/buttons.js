import React from 'react'
import {apiTweetAction} from './lookup'

export function ActionBtn(props){
    const {tweet,action,didPerformAction}=props
    const likes=tweet.likes? tweet.likes : 0
    const className=props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay=action.display ? action.display : 'Action'
    const handleActionBackendEvent=(response,status)=>{
      console.log("response button.js line 10",response,status)
      if((status===200 || status===201) && didPerformAction){
        didPerformAction(response,status)
        // setUserlike(true)
        // setLikes(response.likes)
      }
      // if (action.type==='like'){
      //   if(userlike===true){
      //       setLikes(likes-1)
      //       setUserlike(false)
      //   }else{
      //       setLikes(likes+1)
      //       setUserlike(true)
      //   }
      // } 
    }
    const handleClick=(event)=>{
      event.preventDefault()
      event.stopPropagation()
      apiTweetAction(tweet.id,action.type,handleActionBackendEvent)
    }
    const display=action.type==='like' ? `${likes} ${actionDisplay}` : actionDisplay
    return <button className={className} onClick={handleClick}>{display}</button> 
  }