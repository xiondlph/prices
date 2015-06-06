<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="цены, следить, мониторинг, яндекс маркет, аналитика, конкуренты, парсер цен" />
    <meta name="description" content="Сервис отслеживания и мониторинга цен" />
<# if (process.env.NODE_ENV !== 'prod') { #>
    <link href="/css/common.css" rel="stylesheet" type="text/css" />
    <link href="/css/index.css" rel="stylesheet" type="text/css" />
    <script data-main="/js/Index" src="/lib/requirejs/require.js"></script>
<# } else { #>
    <link href="/build/index.css" rel="stylesheet" type="text/css" />
    <script src="/build/index.js"></script>
<# } #>
    <title>Сервис мониторинга цен</title>
</head>
<body>
<#@ /inc/header #>
    <section class="b-section">
        <h1>Сервис мониторинга цен</h1>
        <a href="/categories" class="f-btn f-btn_red f-btn_redirect">Начать использовать</a>
    </section>
<#@ /inc/footer #>
</body>
</html>