from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.template.loader import render_to_string


@ensure_csrf_cookie
def spa(request, path=""):
    rendered = render_to_string("spa_index.html")
    return HttpResponse(rendered)
