from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def spa(request, path = ""):
    mount_point = 'app'
    html = f"""
		<!doctype html>
		<html>
		<head>
			<title>Tourneykit!</title>
		</head>
		<body>
			<div id="{mount_point}"></div>
			<script src="/static/app.js"></script>
            <script>window.startApp({{ mountPoint: "{mount_point}" }})</script>
		</body>
		</html>
	"""
    return HttpResponse(html)
