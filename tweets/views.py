from tweets.models import Tweet             # for pure django stuff
from tweets.forms import TweetForm          # for pure django stuff
from tweetme2.settings import ALLOWED_HOSTS
from django.conf import settings
from django.http.response import Http404
from django.shortcuts import redirect, render
from django.http import HttpResponse,JsonResponse
from django.utils.http import is_safe_url

ALLOWED_HOSTS=settings.ALLOWED_HOSTS


def home_view(request,*args,**kwargs):
    return render(request,"pages/feed.html")

def tweets_list_view(request,*args,**kwargs):
    return render(request,"tweets/list.html")

def tweets_detail_view(request,tweet_id,*args,**kwargs):
    return render(request,"tweets/detail.html",context={"tweet_id":tweet_id})

 
