from django.shortcuts import redirect
from django.http import  JsonResponse
from ..forms import TweetForm
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from tweetme2.settings import ALLOWED_HOSTS
from django.conf import settings
from ..serializers import TweetActionSerializer, TweetCreateSerializer, TweetSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import SessionAuthentication,BasicAuthentication, TokenAuthentication
from tweets.models import *


ALLOWED_HOSTS=settings.ALLOWED_HOSTS

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_create_view(request,*args,**kwrags):
    # print(request.data)
    serializer=TweetCreateSerializer(data=request.data)
    # print(request.POST)       returns => <QueryDict: {'content': ['This is my test Tweet']}>
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        # print("Create Serializer ",serializer.data)  returns => {'id': 83, 'content': "asfdsdf", 'likes': 0}
        return Response(serializer.data,status=201)
    return Response({},status=400)

@api_view(['GET'])
def tweet_list_view(request,*args,**kwargs):
    qs=Tweet.objects.all()
    username=request.GET.get('username')
    if username != None:
        qs=Tweet.objects.by_username(username)
    return get_paginated_queryset_response(qs,request)

@api_view(['GET'])
def tweet_detail_view(request,tweet_id,*args,**kwargs):
    qs=Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({},status=404)
    obj=qs.first()
    serializer=TweetSerializer(obj)
    return Response(serializer.data,status=200)

@api_view(['DELETE','POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request,tweet_id,*args,**kwargs):
    # print(request.user)
    qs=Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({},status=404)
    qs=qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message":"You cannot delete this tweet"},status=401)
    obj=qs.first()
    obj.delete()
    return Response({"message":"Tweet Removed"},status=200)

@api_view(['POST'])
# @authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def tweet_action_view(request,*args,**kwargs):
    '''
    id is required,
    Action options are like,unlike,retweet
    '''
    # print(request.data)
    # action options are like,unlike,retweet    ID is required
    serializer=TweetActionSerializer(data=request.data)
    # print(request.data)     returns => {'id': 79, 'action': 'like'}
    # print(request.user)      #returns => dhruvil
    if serializer.is_valid(raise_exception=True):
        data=serializer.validated_data
        # print(data)         OrderedDict([('id', 87), ('action', 'like')])
        tweet_id=data.get("id")
        action=data.get("action")
        content=data.get("content")
        # print(content)        returns => None
    
    qs=Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({},status=404)
    obj=qs.first()
    if action=="like":
        obj.likes.add(request.user)
        serializer=TweetSerializer(obj)
        # print(serializer.data)   return => {'id': 87, 'content': 'adfkasdjlakfds', 'likes': 1, 'is_retweet': False, 'parent': None}
        return Response(serializer.data,status=200)
    elif action=="unlike":
        obj.likes.remove(request.user)
        serializer=TweetSerializer(obj)
        return Response(serializer.data,status=200)
    elif action=="retweet":
        new_tweet=Tweet.objects.create(user=request.user,parent=obj,content=content)
        serializer=TweetSerializer(new_tweet)
        return Response(serializer.data,status=201)
    return Response({},status=200)

def get_paginated_queryset_response(qs,request):
    paginator=PageNumberPagination()
    paginator.page_size=20
    paginated_qs=paginator.paginate_queryset(qs,request)
    serializer=TweetSerializer(paginated_qs,many=True,context={"request":request})
    return paginator.get_paginated_response(serializer.data) 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
def tweet_feed_view(request,*args,**kwargs):
    user=request.user
    qs=Tweet.objects.feed(user)
    return get_paginated_queryset_response(qs,request)  #Response(serializer.data,status=200)







def tweet_list_view_pure_django(request,*args,**kwargs):
    qs=Tweet.objects.all()
    tweets_list=[x.serialize() for x in qs]
    data={
        "isUser":False,
        "response":tweets_list
    }
    print(tweets_list)
    return JsonResponse(data)

def tweet_create_view_pure_django(request,*args,**kwargs):
    user=request.user
    print("user",request.user)
    if not request.user.is_authenticated:
        user=None
        if request.is_ajax():
            print("isAjax")
            return JsonResponse({},status=401)
        return redirect(settings.LOGIN_URL)
    print("ajax ",request.is_ajax())
    form=TweetForm(request.POST or None)
    # print(request.POST)
    next_url=request.POST.get("next") or None
    # print("Next Url ",next_url)
    if form.is_valid():
        obj=form.save(commit=False)
        obj.user=user  
        obj.save()
        # data={
        #     "username1":request.user,
        #     "serializeddata":obj.serialize()
        # }
        # print(data["username1"])
        if request.is_ajax():
            return JsonResponse(obj.serialize(),status=201) #201 for Created Items
        if next_url != None and is_safe_url(next_url,ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()
    if form.errors:
        print("error")
        if request.is_ajax():
            return JsonResponse(form.errors,status=400)
    return render(request,"components/form.html",context={"form":form})

def tweet_detail_view_pure_django(request,tweet_id,*args,**kwargs):
    data={
        "id":tweet_id,
    }
    status=200
    try:
        obj=Tweet.objects.get(id=tweet_id)
        data['content']=obj.content
    except:
        data['message']="Not Found"
        status=404
    return JsonResponse(data,status=status)