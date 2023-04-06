<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/css/app.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
        <script src="/js/heatmap.js"></script>
        <script src="/js/app.js"></script>
        
        <title>@yield('title')</title>

    </head>
    <body>
        @include('inc.header')
        <div class="content mt-5">
            @if(Request::is('/'))
            @endif
            <h1>@yield('pageTitle')</h1>
            <div class="container">
                <div class="row">
                    <div >
                        @yield('content')
                    </div>
                    <!-- <div class="col-4">
                        @include('inc.aside')
                    </div> -->
                </div>
            </div>
        </div>
        @include('inc.footer')
        <script src="/js/script.js"></script>
        <script src="/js/clicker.js"></script>
    </body>
</html>
