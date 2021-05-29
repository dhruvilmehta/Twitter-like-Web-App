import React,{useState} from 'react'
import {ActionBtn} from './buttons'
import {UserDisplay,UserPicture} from '../profiles'

export function ParentTweet(props){
    const {tweet}=props
    return tweet.parent ? <Tweet isRetweet reTweeter={props.reTweeter} hideActions className={' '} tweet={tweet.parent} /> : null
}
export function Tweet(props){
    // console.log(tweet)   returns => {id: 130, content: "dhruvil mehta", likes: 0, is_retweet: false, parent: null}
  const {tweet,didRetweet,hideActions,isRetweet,reTweeter}=props
  const [actionTweet,setActionTweet]=useState(props.tweet ? props.tweet : null)
  let className=props.className ? props.className : 'col-10 mx-auto col-md-6'
  className=isRetweet===true ? `${className} p-2 border rounded` : className

  const path=window.location.pathname
  const match =path.match(/(?<tweetid>\d+)/)  // Checking url for number(tweetid) \d represents finding a digit
  const urlTweetId=match ? match.groups.tweetid : -1

  const isDetail=`${tweet.id}`===`${urlTweetId}`
  const handleLink=(event)=>{
      event.preventDefault()
      event.stopPropagation()
      window.location.href=`/${tweet.id}`
  }
  const handlePerformAction=(newActionTweet,status)=>{
    if(status===200){
      setActionTweet(newActionTweet)
    }
    else if(status===201){
      // let the tweet list know
      if(didRetweet){
        didRetweet(newActionTweet)
      }
    }
  }
  return <div className={className}>            
{/* onClick={handleLink}  up */}
  {isRetweet===true && <div className="mb-2"><span className="small text-muted">Retweet via <UserDisplay user={reTweeter}/></span></div>}
<div className="d-flex">
  <div className="">
    <UserPicture user={tweet.user}  />
  </div>
  <div className="col-11">
<div>
  <p><UserDisplay includeFullName user={tweet.user}/></p>
  <p>{tweet.content}</p>
  <ParentTweet tweet={tweet} reTweeter={tweet.user} />
</div>
<div className='btn btn-group px-0'>
{(actionTweet && hideActions!==true) && <React.Fragment>
<ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:'like',display:'Likes'}}/>
<ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:'unlike',display:'Unlikes'}}/>
<ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:'retweet',display:'retweet'}}/>
</React.Fragment>
}
{isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View</button>}
</div>
</div>
</div>
</div>
}