from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def spa(request, path = ""):
	html = """
		<!doctype html>
		<html>
		<head>
			<title>Tourneykit!</title>
		</head>
		<body>
			<div id="app"></div>
			<script src="/static/app.js"></script>
		</body>
		</html>
	"""
	return HttpResponse(html)
