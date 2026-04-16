from django.http import HttpRequest, HttpResponse
from django.shortcuts import render


def index(request: HttpRequest) -> HttpResponse:
    context = {
        'title': 'Pets-R-Us! | Welcome to the Home page'
    }

    return render(request, 'core/index.html', context)
