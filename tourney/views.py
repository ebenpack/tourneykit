from django.shortcuts import render
from django.http import HttpResponse


def spa(request):
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
