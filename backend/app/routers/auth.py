# Author: apreterno (John Gitahi)
# Contact: gitahi109@gmail.com
# Description: Entrypoint to the API


# from fastapi import APIRouter
#
# router = APIRouter(
# prefix="/auth"
# )

""" Conflict: Should I host my own OAuth impl or use 3rd party Auth0

I thought I understood authentication and authorization till I finally
had to write code for it. I am realizing I knew nothing but I have spent
the better part of today learning it. I haven't read the whole OAuth 
specification; I haven't even read 10 lines from it but I have perused
multiple sites explaining its implementation in .py

So here's where I am stuck. I have made a decision alright, but I am still stuck.
Handling OAuth via a 3rd party like Auth0 makes them have the user data and it gives
me the extra work of querying their management API to get my user's data.

However implementing the OAuth myself gives me the benefit of whenever a user is being
created i persist the user to the database at that time. One con for this tho is that I have
to have a good server(gpt recommends 2vCPUs and at least 7.5GiB memory) while in comparison
using a 3rd party won't require such a good server(i can use 2vCPUs and 4GiB memory with a 
K8s cluster to handle all the load) 

I have chosen to go with using Auth0 and I will commit to querying the user data after a TBD
duration(i am thinking 24 hour intervals now)

As I have chosen this route, I don't see the need for this file other than journaling this stuff
as it will be handled by the React frontend.

I am however creating a auth submodule to have utility functions to protect the private API endpoints
"""
