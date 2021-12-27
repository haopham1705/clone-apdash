// SideNav action
function navFunc(){
    let navbar = document.getElementById('mySidenav');
    let navItem = document.getElementById('sidenav-list');

    if(navbar.style.display === 'block'){
        navbar.style.display = 'none' ;
        navbar.style.height = "0";
        navItem.style.display = "none";
    }else {
        navbar.style.display = 'block' ;
        navbar.style.height = "auto";
        navItem.style.display = "block";
    }
}

// carousel img
jQuery(document).ready(function ($) {
    var feedbackSlider = $(".feedback-slider");
    feedbackSlider.owlCarousel({
        items: 1,
        nav: true,
        dots: true,
        autoplay: true,
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        // responsive: {
        // 767: {
        // nav: true,
        // dots: false
        // }
        // }
    });
});

// client - carousel
var swiperClient = new Swiper(".mySwiperCarousel", {
    slidesPerView: 6,
    spaceBetween: 8,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    }
});