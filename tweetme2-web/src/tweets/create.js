import React,{useState} from 'react'
import {apiTweetCreate} from './lookup'

export function TweetCreate(props){
    const textAreaRef=React.createRef()
    const {didTweet}=props
    const handleBackendUpdate=(response,status)=>{
        // console.log(response,status)
        if(status===201){
          didTweet(response)
        }else{
          // console.log(response)
          alert("An Error Occured please try again")
        }
        
      }
    const handleSubmit=(event)=>{
      event.preventDefault()
      const newVal=textAreaRef.current.value
      // backend api request handler
      // console.log("new Value",newVal)
      apiTweetCreate(newVal,handleBackendUpdate)
      // console.log(tempNewTweets)   returns =>  0: {content: "jshad lfhs", likes: 0, id: 12313}
      textAreaRef.current.value=''
    }
    return <div className='col-12'>
            <form onSubmit={handleSubmit}>
              <textarea ref={textAreaRef} required={true} className='form-control' name='tweet'></textarea>
              <button type='submit' className='btn btn-primary my-3'>Tweet</button>
            </form>
          </div>
  
}