
$(document).ready(function() {

    $('[data-toggle="tooltip"]').tooltip();   

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) $('#goTop').fadeIn();
        else $('#goTop').fadeOut();
    });
    $('#goTop').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 'slow');
        return false;
    });


    $('a.scrollDiv').on('click', function(e){
        e.preventDefault();

        var id = $(this).attr('href');

        if($('.box-nav-top')) {
            $('html,body').animate({
                scrollTop: $(id).offset().top
            });
        }
    });


    $(".show_frmSearch").click(function(e){
        e.preventDefault();
        $("#timke").toggle();
    });
    $(".show_frmSearch2").click(function(e){
        e.preventDefault();
        $("#timke2").toggle();
    });




    var delay = ( function() {
      var timer = 0;
      return function(callback, ms) {
          clearTimeout (timer);
          timer = setTimeout(callback, ms);
      };
    })();

    $('a.parent').on("click", function(e){
        $(this).next('ul').toggle();
        $(this).children('span:first').toggleClass("icon-down-arrow icon-right-arrow");
        e.stopPropagation();
        e.preventDefault();
    });

});


// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//     if (document.body.scrollTop > 36 || document.documentElement.scrollTop > 36) {
//         menu_a.hide();
//         document.getElementById("navbar").style.padding = "30px 10px";
//         document.getElementById("logo").style.fontSize = "25px";
//     } else {
//         menu_a.show();
//         document.getElementById("navbar").style.padding = "80px 10px";
//         document.getElementById("logo").style.fontSize = "35px";
//     }
// }


$(window).on('scroll', function() {
    if($('.header.header-scroll')[0] && $(window).width()>1200){
        var menu_a = $('.menu-top').outerHeight();
        var menu_b = $('.space-header-fixed');
        var menu_c = $('.header.header-scroll');
        var h_menu_c = $('.header.header-scroll').outerHeight();
        var header_fixed = ($(this).scrollTop() >= menu_a);
        var btn_hide = $('#btn_click_hidden');
        if (header_fixed === true) {
            menu_b.height(h_menu_c);
            menu_c.addClass('header-fixed');
            btn_hide.show();
        } else {
            menu_b.height(0);
            menu_c.removeClass('header-fixed');
            btn_hide.hide();
        }
    };


    var total_scroll_height = document.body.scrollHeight;
    var inside_header = ($(this).scrollTop() <= 200);
    var passed_header = ($(this).scrollTop() >= 0);
    var passed_header2 = ($(this).scrollTop() >= 150);
    var footer_reached = ($(this).scrollTop() >= (total_scroll_height - ($(window).height() + 300)));
    if (inside_header === true) {
        $('.store-product-button-fixed').removeClass('show-store-product-button');
        $('.back-to-top-badge').removeClass('back-to-top-badge-visible');
    } else if (passed_header === true) {
        $('.store-product-button-fixed').addClass('show-store-product-button');
        $('.back-to-top-badge').addClass('back-to-top-badge-visible');
    }
    if (footer_reached == true) {
        $('.store-product-button-fixed').removeClass('show-store-product-button');
        $('.back-to-top-badge').removeClass('back-to-top-badge-visible');
    }
});



jQuery(function($) {

    $('#btn_click_hidden').on("click", function(z) {
        z.preventDefault();
        $('.header').removeClass('header-scroll');
        $('.header').removeClass('header-fixed');
        $('.space-header-fixed').css('display','none');
        $(this).hide();
    });

    $('.back-to-top-badge').on("click", function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    $('.btn-collapse').on("click", function(e) {
        e.preventDefault();
        $('#box-collapse').toggle(300);
    });

    // hover menu page home
    var bg_menu = $("<div class='overlay-menu'></div>");
    $('#on-hover-nav-cate-home').mouseover(function() {
        $(this).addClass('active');
    });
    $('#nav-cate-home').mouseleave(function() {
        $('#on-hover-nav-cate-home').removeClass('active');
    });
    $('#on-hover-nav-cate-home').mouseleave(function() {
        $('#on-hover-nav-cate-home').removeClass('active');
    });

    $('#nav-cate-home a.link').mouseover(function() {
       var $this = $(this);
       var id = $this.attr('rel');
       var $currentWidget = $('#' + id);
       $currentWidget.show().siblings('.child-box').hide();
    });

    $('#nav-cate-home li').mouseover(function() {
       $(this).addClass('active').siblings('#nav-cate-home li').removeClass('active');
    });

    $('#box-nav-cate-home').mouseleave(function() {
        //bg_menu.stop(true, true).delay(100).fadeOut(200);
        $(this).removeClass('active');
        $('.child-box').hide();
        $('#nav-cate-home li').removeClass('active');
    });
    $('#box-nav-cate-home').mouseover(function() {
        //bg_menu.insertAfter(".header").stop(true, true).delay(100).fadeIn(200);
    });

    $('#nav-cate-home').mouseover(function() {
        $('#on-hover-nav-cate-home').addClass('active');
        $(this).addClass('active');
    });
    // End hover menu page home

    // hover menu not page home
    $('#hover_show_menu_cate').hover(
        function() {
            $('.box-menu-top.not-page-home').stop(true, true).delay(100).fadeIn(200);
            $('#nav-cate-home .item-menu:first-child').addClass('active');
            $('#on-hover-nav-cate-home').addClass('active');
            $('#on-hover-nav-cate-home .list-child-box .child-box:first-child').show();
            bg_menu.insertAfter(".header").stop(true, true).delay(100).fadeIn(200);
        }, function() {
            $('.box-menu-top.not-page-home').stop(true, true).delay(200).fadeOut(600);
            bg_menu.stop(true, true).delay(100).fadeOut(200);
        }
    );
    $('.box-menu-top.not-page-home').hover(
        function() {
            $('.box-menu-top.not-page-home').stop(true, true).delay(100).fadeIn(200);
            bg_menu.insertAfter(".header").stop(true, true).delay(100).fadeIn(200);
        }, function() {
            $('.box-menu-top.not-page-home').stop(true, true).delay(100).fadeOut(200);
            bg_menu.stop(true, true).delay(100).fadeOut(200);
        }
    );
    // End hover menu not page home


    var swiper0 = new Swiper('#slide_home_shopvne', {
        lazy: true,
        centeredSlides: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination-slide-home',
            dynamicBullets: true,
        },
    });

    var swiper2 = new Swiper('#slide_list_cate_folder', {
        slidesPerView: 6,
        slidesPerColumn: 1,
        spaceBetween: 5,
        slidesPerGroup: 2,
        lazy: true,
        //loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination-list-sub-cate',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next-list-sub-cate',
            prevEl: '.swiper-button-prev-list-sub-cate',
        },
        breakpoints: {
            1400: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            580: {
                slidesPerView: 3,
                spaceBetween: 8,
            },
            355: {
                slidesPerView: 2,
                spaceBetween: 5,
            }
        }

    });


    var swiper3 = new Swiper('#slide_list_brand', {
        slidesPerView: 5,
        slidesPerColumn: 1,
        spaceBetween: 10,
        slidesPerGroup: 2,
        lazy: true,
        //loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination-list-brand',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next-list-brand',
            prevEl: '.swiper-button-prev-list-brand',
        },
        breakpoints: {
            1700: {
                slidesPerView: 5,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            580: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            355: {
                slidesPerView: 2,
                spaceBetween: 5,
            }
        }

    });


    var swiper7 = new Swiper('#banner_slide_cate_folder', {
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination-cate-folder',
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-prev-cate-folder',
            prevEl: '.swiper-button-next-cate-folder',
        }
    });



    var swiper8 = new Swiper('#brand_trademark', {
        slidesPerView: 5,
        slidesPerColumn: 1,
        slidesPerGroup: 5,
        spaceBetween: 10,
        speed: 1000,
        lazy: true,
        pagination: {
            el: '.swiper-pagination-slide-trademark',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next-slide-trademark',
            prevEl: '.swiper-button-prev-slide-trademark',
        },
        breakpoints: {
            2500: {
                slidesPerView: 5,
            },
            768: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 6,
            },
            580: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 6,
            },
            355: {
                slidesPerView: 2,
                spaceBetween: 5,
            }
        }
    });

    $(".scroll_horizontal_middle .scroll_horizontal_middle_item").on("click", function(d) {
        d.preventDefault();
        var g = $(this).closest(".scroll_horizontal_middle");
        g.find("a").removeClass("active");
        $(this).addClass("active");
        var f = $(this).position().left;
        var a = g.scrollLeft();
        var c = g.width();
        var b = $(this).width();
        f = (f + a) - (c / 2) + (b / 2);
        g.animate({
            scrollLeft: f
        })
    });

});
