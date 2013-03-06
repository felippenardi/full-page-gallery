'use strict';

angular.module('herokuApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Testacular'
    ];
    $scope.gallery = [
        {
            "name": "Felix",
            "images": ["http://skreened.com/render-product/c/u/i/cuiccqawsyevvvcgqeoo/you-ve-cat-to-be-kitten-me-right-meow-v-neck.american-apparel-unisex-v-neck-tee.athletic-grey.w760h760.jpg"]
        },
        {
            "name": "Sortudo",
            "images": ["http://placekitten.com/2001/2000"]
        },
        {
            "name": "Soft Kitty",
            "images": [
                "http://placekitten.com/2001/2000",
                "http://placekitten.com/1001/1000",
                "http://placekitten.com/1001/1005",
                "http://placekitten.com/1011/1005",
                "http://placekitten.com/1150/1055",
                "http://placekitten.com/1150/1080"
            ]
        }
    ];

    function fitFullPage(){
        $('[class*=swiper-n]').css("height",$(window).height());
        $('.swiper-container').css("height",$(window).height());
        $('.swiper-slide').css("height",$(window).height());
    }

    fitFullPage();

    window.onresize = function() {
        fitFullPage();
    }

    $(function(){
        //-var mySwiper = new Swiper('.swiper-n1',options);

        var mySwiper = $('.swiper-n1').swiper({
            pagination : '.pagination-n1',
            slidesPerSlide : 1,
            initialSlide : 0,
            grabCursor: true,
            keyboardControl : true,
            onSlideChangeEnd : function() {
                console.log("hamburge");
                var newSlide = mySwiper.createSlide('<p>Here is my new slide</p>');
                newSlide.append();
            }
        });

        $('.swiper-n2').swiper({
            pagination : '.pagination-n2',
            slidesPerSlide : 1,
            mode: 'vertical',
            keyboardControl : true,
            mousewheelControl : true
        });
        $('.swiper-n3').swiper({
            pagination : '.pagination-n3',
            slidesPerSlide : 1,
            mode: 'vertical',
            keyboardControl : true,
            mousewheelControl : true

        });
        fitFullPage();
    })

    /////

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
  });
