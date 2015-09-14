        <header class="b-header" <# if(this.data.user){#> auth="<#= this.data.user.email #>"<# } #>>
            <nav class="b-nav">
                <a href="/" class="b-nav__logo">
                    ism<span class="b-nav__logo__ismax icon-ismax"></span>x
                </a>
                <# if(this.data.user){#>
                <div class="b-menu">
                    <ul class="b-menu__sub">
                        <li class="b-menu__sub__item"><a href="/profile#profile" class="b-menu__sub__item__link icon-profile">Профиль</a></li>
                        <li class="b-menu__sub__item"><a href="/user/signout" class="b-menu__sub__item__link icon-exit">Выход</a></li>
                    </ul>
                    <span class="b-menu__label"><#= this.data.user.email #></span>
                </div>
<# if(this.data.user._active){#>
                <a href="/categories" class="b-nav__item b-nav__item_right">Каталог</a>
<# } #>
                <# } else { #>
                <a href="/user" class="b-nav__item b-nav__item_right">Вход</a>
                <# } #>
<#
                /*<div class="b-menu">
                    <ul class="b-menu__sub">
                        <li class="b-menu__sub__item"><a href="/about" class="b-menu__sub__item__link icon-page">Описание</a></li>
                        <li class="b-menu__sub__item"><a href="/destiny" class="b-menu__sub__item__link icon-page">Возможности</a></li>
                        <li class="b-menu__sub__item"><a href="/terms" class="b-menu__sub__item__link icon-page">Условия</a></li>
                    </ul>
                    <span class="b-menu__label">О сервисе</span>
                </div>*/
#>
                <a href="#about" class="b-nav__flow b-nav__flow_first">О сервисе</a>
                <a href="#destiny" class="b-nav__flow">Преимущество</a>
                <a href="#description" class="b-nav__flow">Описание</a>
                <a href="#terms" class="b-nav__flow">Условия</a>
            </nav>
        </header>