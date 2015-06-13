<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<# if (process.env.NODE_ENV !== 'prod') { #>
	<link href="/css/common.css" rel="stylesheet" type="text/css" />
    <script data-main="/js/Secure" src="/lib/requirejs/require.js"></script>
<# } else { #>
	<link href="/build/secure.css" rel="stylesheet" type="text/css" />
    <script src="/build/secure.js"></script>
<# } #>
    <title>Вход</title>
</head>
<body>
<#@ /inc/header #>
    <section class="b-section"></section>
<#@ /inc/footer #>
<#@ /inc/counter #>
</body>
</html>