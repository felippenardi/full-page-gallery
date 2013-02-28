$('.swiper-n2').css("height",$(window).height());
$(function(){
    /* Nested Swipers. Vertical Swiper inside of horizontal: */
    var swiperN1 = $('.swiper-n1').swiper({
        pagination : '.pagination-n1',
        slidesPerSlide : 1,
    });
    var swiperN2 = $('.swiper-n2').swiper({
        pagination : '.pagination-n2',
        slidesPerSlide : 1,
        mode: 'vertical'
    });
    fitFullPage();
})

window.onresize = function() {
    fitFullPage();
}

function fitFullPage(){
    $('.swiper-n2').css("height",$(window).height());
    $('.swiper-n1').css("height",$(window).height());
    $('.swiper-n1').swiper().resizeFix();
}

$(window).load(function() {

    var theWindow        = $(window),
    $bg              = $(".swiper-slide img"),
    aspectRatio      = $bg.width() / $bg.height();

    function resizeBg() {
        if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
            $bg
            .removeClass()
            .addClass('bgheight');
        } else {
            $bg
            .removeClass()
            .addClass('bgwidth');
        }
    }
    theWindow.resize(resizeBg).trigger("resize");
});
