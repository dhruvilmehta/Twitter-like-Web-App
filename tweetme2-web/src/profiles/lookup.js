import {backEndlookup} from '../lookup'

export function apiProfileDetail(username,callback){
    backEndlookup("GET",`/profiles/${username}/`,callback)
}

export function apiProfileFollowToggle(username,action,callback){
    const data={action:`${action && action}`.toLowerCase()}
    console.log(data)
    backEndlookup("POST",`/profiles/${username}/follow`,callback,data)
}