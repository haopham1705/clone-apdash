// SideNav
function navFunc() {
    let navbar = document.getElementById('mySidenav');
    let header = document.getElementById('header');
    let navItem = document.getElementById('sidenav-list');

    if (navbar.style.display === 'block') {
        navbar.style.display = 'none';
        navbar.style.height = "0";
        navItem.style.display = "none";
        // header.style.boxShadow = '$gradient-primary-bg'
    } else {
        navbar.style.display = 'block';
        navbar.style.height = "auto";
        navItem.style.display = "block";
        // header.style.boxShadow = 'none';
    }
}

// Start Count Up
function infoNumbers() {
    var counters = document.querySelectorAll(".number-count-up");

    function animeNumbers() {
        //observer to check if counters are on viewport
        if ("IntersectionObserver" in window) {
            let observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        setTimeout(function () {
                            updateCount(entry.target);
                        }, 1200);
                    }
                });
            });

            counters.forEach((el) => observer.observe(el));
        } else {
            // IE Fallback
            counters.forEach(function (el) {
                el.innerText = el.getAttribute("data-target");
            });
        }
    }

    function updateCount(el) {
        var speed = 100;
        //target number
        var target = +el.getAttribute("data-target");
        //initial number
        var count = +el.innerText;
        //increment numbers
        var inc = target / speed;
        var inc2 = target + 1;

        if (count < target) {
            el.innerText = Math.floor(count + inc);
            setTimeout(function () {
                updateCount(el);
            }, 3);

            if (target < 40) {
                el.innerText = Math.floor(count + 1);
                setTimeout(function () {
                    updateCount(el);
                }, 1400);
            }
        } else {
            el.innerText = target;
        }
    }
    animeNumbers();
};
infoNumbers();
// End Count Up

// client - carousel
var swiperClient = new Swiper(".mySwiperCarousel", {
    slidesPerView: 6,
    spaceBetween: 8,
    loop: true,
    autoplay: {
        delay: 200,
        disableOnInteraction: false
    }
});

// Screenshot carousel 
    $('#screenshot-carousel').owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 6500,
        smartSpeed: 250,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1170: {
                items: 3
            }
        }
    }); 

// client feedback 
    var feedbackSlider = $("#feedback-slider");
    feedbackSlider.owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        autoplay: true,
        loop: true,
        mouseDrag: true,
        touchDrag: true
    }); 