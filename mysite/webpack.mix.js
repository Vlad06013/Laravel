const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

mix.js('resources/js/script.js', 'public/js/script.js');
mix.js('resources/js/clicker.js', 'public/js/clicker.js');
mix.js('resources/js/heatmap.js', 'public/js/heatmap.js');
mix.js('resources/js/test.js', 'public/js/test.js');