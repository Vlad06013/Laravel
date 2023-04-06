@extends('layouts.app')

@section('pageTitle')
    Статистика
@endsection

@section('content')

    <select id = "sitesSelect" class="form-select" aria-label="Default select example">

        @if(@arSites)

            @foreach ($arSites as $key => $site)

                <option vlaue = "{{$site->url}}">{{ $site->url }}</option>

            @endforeach

        @endif

    </select>

    <p>График кликов по часам</p>
    <div id="chartdiv"></div>
    <p>Карта кликов</p>

    <div id="heatmapContainerWrapper">
        <div id="heatmapContainer"></div>
    </div>

    <script>
        const token = "{{ csrf_token() }}";
    </script>
    <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
    <script src="js/test.js"></script>
 
@endsection