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
      "name": "Bears",
      "images": ["http://placebear.com/2001/2000", "http://placebear.com/2000/2000", "http://placebear.com/2001/2001", "http://placebear.com/2001/2010"]
    },
    {
      "name": "Kittens",
      "images": ["http://placekitten.com/2001/2000", "http://placekitten.com/1001/1000", "http://placekitten.com/1001/1005", "http://placekitten.com/1011/1005", "http://placekitten.com/1150/1055", "http://placekitten.com/1150/1080"]
    },
    {
      "name": "Doggies",
      "images": ["http://placedog.com/2001/2000", "http://placedog.com/1001/1000", "http://placedog.com/1001/1005", "http://placedog.com/1011/1005", "http://placedog.com/1150/1055", "http://placedog.com/1150/1080"]
    }
  ];

  var fitFullPage = function _fitFullPage(){
    $('[class*=swiper-n]').css("height",$(window).height());
    $('.swiper-container').css("height",$(window).height());
    $('.swiper-slide').css("height",$(window).height());
  };
  fitFullPage();
  window.onresize = function() { fitFullPage(); }

  $(function(){
    //-var mySwiper = new Swiper('.swiper-n1',options);
    var mySwiper = $('.swiper-horizontal').swiper({
      pagination : '.pagination-horizontal',
      slidesPerSlide : 1,
      initialSlide : 0,
      grabCursor: true,
      keyboardControl : true,
      onSlideChangeEnd : function() {
        console.log("hamburge");
      }
    });


    var createNewSlide = function(theSwiper, content) {
      var html = '<p>'+content+'</p>';
      var newSlide = theSwiper.createSlide(html);
      newSlide.append();
    };

    (function() {
      for (var i=0; i<$scope.gallery[0].images.length; i++) {
        createNewSlide(mySwiper, $scope.gallery[0].images[i]);
      }
    })();

    $('.swiper-n1').swiper({
      pagination : '.pagination-n1',
      slidesPerSlide : 1,
      mode: 'vertical',
      keyboardControl : true,
      mousewheelControl : true
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

  (function konamiActivate() {
    var easter_egg = new Konami();
    easter_egg.code = function() { alert('Konami code!'); }
    easter_egg.load();
  })();
});
