from django.http import HttpRequest, HttpResponse
from django.shortcuts import render


def index(request: HttpRequest) -> HttpResponse:
    context = {
        "tab_title": "Welcome to Star Buzz Coffee | Home page",
    }

    return render(request, 'default/index.html', context)


def about(request: HttpRequest) -> HttpResponse:
    return render(request, 'default/about.html')
