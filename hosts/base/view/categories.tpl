<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="цены, следить, мониторинг, яндекс маркет, аналитика, конкуренты, парсер цен" />
    <meta name="description" content="Сервис отслеживания и мониторинга цен" />
<# if (process.env.NODE_ENV !== 'prod') { #>
    <link href="/css/common.css" rel="stylesheet" type="text/css" />
    <link href="/css/categories.css" rel="stylesheet" type="text/css" />
    <script data-main="/js/Categories" src="/lib/requirejs/require.js"></script>
<# } else { #>
    <link href="/build/categories.css" rel="stylesheet" type="text/css" />
    <script src="/build/categories.js"></script>
<# } #>
    <title>Список категорий</title>
</head>
<body>
<#@ /inc/header #>
    <section class="b-section"></section>
<#@ /inc/footer #>
</body>
</html>