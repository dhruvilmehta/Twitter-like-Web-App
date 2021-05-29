import React,{useState,useEffect} from 'react'

import {apiProfileDetail,apiProfileFollowToggle} from './lookup'
import {UserDisplay,UserPicture} from './components'
import {DisplayCount} from './utils'

function ProfileBadge(props){
    const {user,didFollowToggle,profileLoading}=props
    let currentVerb=(user && user.is_following) ? "Unfollow" : "Follow" 
    currentVerb=profileLoading ? "Loading..." : currentVerb
    const handleFollowToggle=(event)=>{
        event.preventDefault()
        if (didFollowToggle && !profileLoading){
            didFollowToggle(currentVerb)
        }
    }
    return user ? <div>
        <UserPicture user={user} hideLink />
        <p><UserDisplay user={user} includeFullName hideLink /></p>
        {/* {user.first_name} {user.last_name} */}
        <p> <DisplayCount>{user.follower_count}</DisplayCount> {user.follower_count===1 ? "Follower" : "Followers"}</p>
        <p><DisplayCount>{user.following_count}</DisplayCount> Following </p>
        <p>{user.location}</p>
        <p>{user.bio}</p>
        <button className='btn btn-primary' onClick={handleFollowToggle}>{currentVerb}</button>
        </div>:null
}

export function ProfileBadgeComponent(props){
    const {username}=props
    // lookup
    const [didLookup,setDidLookup]=useState(false)
    const [profile,setProfile]=useState(null)
    const [profileLoading,setProfileLoading]=useState(false)
    const handleBackendLookup=(response,status)=>{
        console.log("profile log",response,status)
        if(status===200){
            setProfile(response)
        }
    }
    useEffect(()=>{
        if(didLookup===false){
            apiProfileDetail(username,handleBackendLookup)
            setDidLookup(true)
        }
    },[didLookup,setDidLookup,username])

    const handleNewFollow=(actionVerb)=>{
        console.log(actionVerb)
        apiProfileFollowToggle(username,actionVerb,(response,status)=>{ // represents callback function
            console.log(response,status)
            if(status===200){
                apiProfileDetail(username,handleBackendLookup)
            }
            setProfileLoading(false)
        })
        setProfileLoading(true)
    }
    return didLookup===false ? "Loading..." : profile ? <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading} />:null
}