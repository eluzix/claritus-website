#clear value website  

Development:
``hugo -D serve``

run for vm:
``hugo -D server --bind="0.0.0.0" --baseUrl=192.168.85.1``



# Netlify cms admin panel for local

1. Your email must be granted access from the main account.
2. Go to the ``http://localhost:1313/content/#/`` page
3. Set site url: ``https://claritus.io/``
4. Log in with your credits
5. You will be redirected to the main site. And in the query line there will be an ``#access_token...``
6. Need to copy everything after ``https://claritus.io/#``
7. Next, you need to go to the page ``http://localhost:1313/content(**everything you copied**)``. Example: ``http://localhost:1313/content#access_token=ASkjasdkj......``
8. You are logged in locally