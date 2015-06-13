<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<# if (process.env.NODE_ENV !== 'prod') { #>
    <link href="/css/common.css" rel="stylesheet" type="text/css" />
    <link href="/css/profile.css" rel="stylesheet" type="text/css" />
    <script data-main="/js/Profile" src="/lib/requirejs/require.js"></script>
<# } else { #>
    <link href="/build/profile.css" rel="stylesheet" type="text/css" />
    <script src="/build/profile.js"></script>
<# } #>
    <title>Личный кабинет</title>
</head>
<body>
<#@ /inc/header #>
    <section class="b-section"></section>
<#@ /inc/footer #>
<#@ /inc/counter #>
</body>
</html>