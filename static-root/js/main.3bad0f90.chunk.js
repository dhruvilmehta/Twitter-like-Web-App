(this["webpackJsonptweetme2-web"]=this["webpackJsonptweetme2-web"]||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),s=n(4),r=n.n(s),o=(n(15),n.p+"static/media/logo.6ce24c58.svg");n(16);function i(e,t,n,c){var a;c&&(a=JSON.stringify(c));var s=new XMLHttpRequest,r="http://localhost:8000/api".concat(t);s.responseType="json";var o=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var a=n[c].trim();if(a.substring(0,e.length+1)===e+"="){t=decodeURIComponent(a.substring(e.length+1));break}}return t}("csrftoken");s.open(e,r),s.setRequestHeader("Content-Type","application/json"),o&&(s.setRequestHeader("X-Requested-With","XMLHttpRequest"),s.setRequestHeader("X-CSRFToken",o)),s.onload=function(){if(403===s.status){var e=s.response.detail;console.log(e),"Authentication credentials were not provided."===e&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true")}n(s.response,s.status)},s.onerror=function(e){console.log("error",e),n({message:"The request was an error"},400)},s.send(a)}function l(e,t){var n="/tweets/feed/";null!==t&&void 0!==t&&(n=t.replace("http://localhost:8000/api","")),i("GET",n,e)}function u(e,t,n){var c="/tweets/";e&&(c="/tweets/?username=".concat(e)),null!==n&&void 0!==n&&(c=n.replace("http://localhost:8000/api","")),i("GET",c,t)}var j=n(0);function d(e){var t=e.tweet,n=e.action,c=e.didPerformAction,a=t.likes?t.likes:0,s=e.className?e.className:"btn btn-primary btn-sm",r=n.display?n.display:"Action",o=function(e,t){console.log("response button.js line 10",e,t),200!==t&&201!==t||!c||c(e,t)},l="like"===n.type?"".concat(a," ").concat(r):r;return Object(j.jsx)("button",{className:s,onClick:function(e){e.preventDefault(),e.stopPropagation(),function(e,t,n){i("POST","/tweets/action/",n,{id:e,action:t})}(t.id,n.type,o)},children:l})}var b=n(10),f=n(2);function O(e){var t=e.username;return Object(j.jsx)("span",{className:"pointer",onClick:function(e){window.location.href="/profiles/".concat(t)},children:e.children})}function m(e){var t=e.user,n=e.includeFullName,c=e.hideLink,s=!0===n?"".concat(t.first_name," ").concat(t.last_name," "):null;return Object(j.jsxs)(a.a.Fragment,{children:[s,!0===c?"@".concat(t.username):Object(j.jsxs)(O,{username:t.username,children:["@",t.username]})]})}function w(e){var t=e.user,n=e.hideLink,c=Object(j.jsx)("span",{className:"mx-1 px-3 py-2 rounded-circle bg-dark text-white",children:t.username[0]});return!0===n?c:Object(j.jsx)(O,{username:t.username})}function p(e,t){i("GET","/profiles/".concat(e,"/"),t)}var h=n(9),x=n.n(h);function v(e){return Object(j.jsxs)("span",{className:e.className,children:[" ",x()(e.children).format("0a")]})}function g(e){var t=e.user,n=e.didFollowToggle,c=e.profileLoading,a=t&&t.is_following?"Unfollow":"Follow";a=c?"Loading...":a;return t?Object(j.jsxs)("div",{children:[Object(j.jsx)(w,{user:t,hideLink:!0}),Object(j.jsx)("p",{children:Object(j.jsx)(m,{user:t,includeFullName:!0,hideLink:!0})}),Object(j.jsxs)("p",{children:[" ",Object(j.jsx)(v,{children:t.follower_count})," ",1===t.follower_count?"Follower":"Followers"]}),Object(j.jsxs)("p",{children:[Object(j.jsx)(v,{children:t.following_count})," Following "]}),Object(j.jsx)("p",{children:t.location}),Object(j.jsx)("p",{children:t.bio}),Object(j.jsx)("button",{className:"btn btn-primary",onClick:function(e){e.preventDefault(),n&&!c&&n(a)},children:a})]}):null}function N(e){var t=e.username,n=Object(c.useState)(!1),a=Object(f.a)(n,2),s=a[0],r=a[1],o=Object(c.useState)(null),l=Object(f.a)(o,2),u=l[0],d=l[1],b=Object(c.useState)(!1),O=Object(f.a)(b,2),m=O[0],w=O[1],h=function(e,t){console.log(e,t),200===t&&d(e)};Object(c.useEffect)((function(){!1===s&&(p(t,h),r(!0))}),[s,r,t]);return!1===s?"Loading...":u?Object(j.jsx)(g,{user:u,didFollowToggle:function(e){console.log(e),function(e,t,n){var c={action:"".concat(t&&t).toLowerCase()};console.log(c),i("POST","/profiles/".concat(e,"/follow"),n,c)}(t,e,(function(e,n){console.log(e,n),200===n&&p(t,h),w(!1)})),w(!0)},profileLoading:m}):null}function T(e){var t=e.tweet;return t.parent?Object(j.jsx)(y,{isRetweet:!0,reTweeter:e.reTweeter,hideActions:!0,className:" ",tweet:t.parent}):null}function y(e){var t=e.tweet,n=e.didRetweet,s=e.hideActions,r=e.isRetweet,o=e.reTweeter,i=Object(c.useState)(e.tweet?e.tweet:null),l=Object(f.a)(i,2),u=l[0],O=l[1],p=e.className?e.className:"col-10 mx-auto col-md-6";p=!0===r?"".concat(p," p-2 border rounded"):p;var h=window.location.pathname.match(Object(b.a)(/([0-9]+)/,{tweetid:1})),x=h?h.groups.tweetid:-1,v="".concat(t.id)==="".concat(x),g=function(e,t){200===t?O(e):201===t&&n&&n(e)};return Object(j.jsxs)("div",{className:p,children:[!0===r&&Object(j.jsx)("div",{className:"mb-2",children:Object(j.jsxs)("span",{className:"small text-muted",children:["Retweet via ",Object(j.jsx)(m,{user:o})]})}),Object(j.jsxs)("div",{className:"d-flex",children:[Object(j.jsx)("div",{className:"",children:Object(j.jsx)(w,{user:t.user})}),Object(j.jsxs)("div",{className:"col-11",children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{children:Object(j.jsx)(m,{includeFullName:!0,user:t.user})}),Object(j.jsx)("p",{children:t.content}),Object(j.jsx)(T,{tweet:t,reTweeter:t.user})]}),Object(j.jsxs)("div",{className:"btn btn-group px-0",children:[u&&!0!==s&&Object(j.jsxs)(a.a.Fragment,{children:[Object(j.jsx)(d,{tweet:u,didPerformAction:g,action:{type:"like",display:"Likes"}}),Object(j.jsx)(d,{tweet:u,didPerformAction:g,action:{type:"unlike",display:"Unlikes"}}),Object(j.jsx)(d,{tweet:u,didPerformAction:g,action:{type:"retweet",display:"retweet"}})]}),!0===v?null:Object(j.jsx)("button",{className:"btn btn-outline-primary btn-sm",onClick:function(e){e.preventDefault(),e.stopPropagation(),window.location.href="/".concat(t.id)},children:"View"})]})]})]})]})}var k=n(3);function S(e){var t=Object(c.useState)(e.newTweets?e.newTweets:[]),n=Object(f.a)(t,2),s=n[0],r=n[1],o=Object(c.useState)([]),i=Object(f.a)(o,2),l=i[0],d=i[1],b=Object(c.useState)(null),O=Object(f.a)(b,2),m=O[0],w=O[1],p=Object(c.useState)(!1),h=Object(f.a)(p,2),x=h[0],v=h[1];Object(c.useEffect)((function(){var t=Object(k.a)(e.newTweets).concat(s);t.length!==l.length&&d(t)}),[e.newTweets,l,s]),Object(c.useEffect)((function(){if(!1===x){u(e.username,(function(e,t){w(e.next),200===t?(r(e.results),v(!0)):alert("List.js There was an error")}))}}),[s,x,v,e.username]);var g=function(e){var t=Object(k.a)(s);t.unshift(e),r(t);var n=Object(k.a)(l);n.unshift(l),d(n)};return Object(j.jsxs)(a.a.Fragment,{children:[l.map((function(e,t){return Object(j.jsx)(y,{tweet:e,didRetweet:g,className:"my-5 py-5 border bg-white text-dark"},"".concat(t,"-{item.id}"))})),null!==m&&Object(j.jsx)("button",{onClick:function(t){if(t.preventDefault(),null!==m){u(e.username,(function(e,t){if(console.log(e,t),200===t){w(e.next);var n=Object(k.a)(l.concat(e.results));r(n),d(n)}else alert("List.js There was an error")}),m)}},className:"btn btn-outline-primary",children:"Load Next"})]})}function L(e){var t=a.a.createRef(),n=e.didTweet,c=function(e,t){201===t?n(e):alert("An Error Occured please try again")};return Object(j.jsx)("div",{className:"col-12",children:Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=t.current.value;i("POST","/tweets/create/",c,{content:n}),t.current.value=""},children:[Object(j.jsx)("textarea",{ref:t,required:!0,className:"form-control",name:"tweet"}),Object(j.jsx)("button",{type:"submit",className:"btn btn-primary my-3",children:"Tweet"})]})})}var E=n(8);function F(e){var t=Object(c.useState)(e.newTweets?e.newTweets:[]),n=Object(f.a)(t,2),s=n[0],r=n[1],o=Object(c.useState)([]),i=Object(f.a)(o,2),u=i[0],d=i[1],b=Object(c.useState)(null),O=Object(f.a)(b,2),m=O[0],w=O[1],p=Object(c.useState)(!1),h=Object(f.a)(p,2),x=h[0],v=h[1];Object(c.useEffect)((function(){var t=Object(k.a)(e.newTweets).concat(s);t.length!==u.length&&d(t)}),[e.newTweets,u,s]),Object(c.useEffect)((function(){if(!1===x){l((function(e,t){w(e.next),200===t&&(r(e.results),v(!0))}))}}),[s,x,v,e.username]);var g=function(e){var t=Object(k.a)(s);t.unshift(e),r(t);var n=Object(k.a)(u);n.unshift(u),d(n)};return Object(j.jsxs)(a.a.Fragment,{children:[u.map((function(e,t){return Object(j.jsx)(y,{tweet:e,didRetweet:g,className:"my-5 py-5 border bg-white text-dark"},"".concat(t,"-{item.id}"))})),null!==m&&Object(j.jsx)("button",{onClick:function(e){if(e.preventDefault(),null!==m){l((function(e,t){if(console.log(e,t),200===t){w(e.next);var n=Object(k.a)(u.concat(e.results));r(n),d(n)}}),m)}},className:"btn btn-outline-primary",children:"Load Next"})]})}function R(e){var t=Object(c.useState)([]),n=Object(f.a)(t,2),a=n[0],s=n[1],r="false"!==e.canTweet;return Object(j.jsxs)("div",{className:e.className,children:[!0===r&&Object(j.jsx)(L,{didTweet:function(e){var t=Object(k.a)(a);t.unshift(e),s(t)},className:"col-12 mb-3"}),Object(j.jsx)(S,Object(E.a)({newTweets:a},e))]})}function A(e){var t=e.tweetId,n=Object(c.useState)(!1),a=Object(f.a)(n,2),s=a[0],r=a[1],o=Object(c.useState)(null),l=Object(f.a)(o,2),u=l[0],d=l[1],b=function(e,t){200===t?d(e):alert("There was an error finding your tweet. ")};return Object(c.useEffect)((function(){!1===s&&(!function(e,t){i("GET","/tweets/".concat(e),t)}(t,b),r(!0))}),[s,r,t]),null===u?null:Object(j.jsx)(y,{tweet:u,className:e.className})}var C=function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)("header",{className:"App-header",children:[Object(j.jsx)("img",{src:o,className:"App-logo",alt:"logo"}),Object(j.jsxs)("p",{children:["Edit ",Object(j.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(j.jsx)("div",{children:Object(j.jsx)(R,{})}),Object(j.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})},q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),s(e),r(e)}))},P=document.getElementById("root");P&&r.a.render(Object(j.jsx)(C,{}),P);var D=a.a.createElement,_=document.getElementById("tweetme-2");_&&r.a.render(D(R,_.dataset),_),document.querySelectorAll(".tweetme-2-detail").forEach((function(e){r.a.render(D(A,e.dataset),e)}));var I=document.getElementById("tweetme-2-feed");I&&r.a.render(D((function(e){var t=Object(c.useState)([]),n=Object(f.a)(t,2),a=n[0],s=n[1],r="false"!==e.canTweet;return Object(j.jsxs)("div",{className:e.className,children:[!0===r&&Object(j.jsx)(L,{didTweet:function(e){var t=Object(k.a)(a);t.unshift(e),s(t)},className:"col-12 mb-3"}),Object(j.jsx)(F,Object(E.a)({newTweets:a},e))]})}),I.dataset),I),document.querySelectorAll(".tweetme-2-detail-profile-badge").forEach((function(e){r.a.render(D(N,e.dataset),e)})),q()}},[[18,1,2]]]);
//# sourceMappingURL=main.3bad0f90.chunk.js.map