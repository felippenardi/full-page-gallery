'use strict';

angular.module('herokuApp')
.controller('MainCtrl', function ($scope, $location, $routeParams) {
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

  $scope.fitFullPage = function _fitFullPage(){
    $('[class*=swiper-n]').css("height",$(window).height());
    $('.swiper-container').css("height",$(window).height());
    $('.swiper-slide').css("height",$(window).height());
  };
  window.onresize = function() { $scope.fitFullPage(); }

  $scope.createNewSlide = function(theSwiper, theHtml) {
    var newSlide = theSwiper.createSlide(theHtml);
    newSlide.append();
  };

  $scope.loc = $location;
  $scope.$watch("(loc.search()).produto", function (val, old) {
    //mySwiper.swipeTo(($routeParams.projeto) ? $routeParams.projeto : 0,0, false);
    console.log('oi');
  });

  //console.log($routeParams.id);

  var prevSlide = ($routeParams.id) ? $routeParams.id : 0; // TODO move this variable to an specifc scope
  var mySwiper;
  console.log(mySwiper);
  $(function(){
    //-var mySwiper = new Swiper('.swiper-n1',options);
    mySwiper = $('.swiper-horizontal').swiper({
      pagination : '.pagination-horizontal',
      slidesPerSlide : 1,
      initialSlide : 0,
      grabCursor: true,
      keyboardControl : true,
      onSlideChangeEnd : function() {
        //console.log(mySwiper.activeSlide);
        //console.log(prevSlide);
        $scope.$apply($location.search('projeto',mySwiper.activeSlide));
        if (prevSlide > mySwiper.activeSlide) {
          console.log("<<< ... "+mySwiper.activeSlide+'<'+prevSlide);
        } else {
          console.log(">>> ... "+mySwiper.activeSlide+'>'+prevSlide);
        }
        prevSlide = mySwiper.activeSlide;
      }
    });

  console.log(mySwiper);
    (function() {
      for (var i=0; i<$scope.gallery.length; i++) {
        var html = "<div class='swiper-container swiper-nested2 swiper-n"+i+"'> <div class='pagination-nested2 pagination-n"+i+"'></div> <div class='swiper-wrapper'> </div> </div>"
        $scope.createNewSlide(mySwiper, html);
        $scope.fitFullPage();
        var thisSwiper = $('.swiper-n'+i).swiper({
          pagination : '.pagination-n'+i,
          slidesPerSlide : 1,
          mode: 'vertical',
          keyboardControl : true,
          mousewheelControl : true
        });
        for (var k=0; k<$scope.gallery[i].images.length; k++) {
          $scope.createNewSlide(thisSwiper, $scope.gallery[i].images[k]);
          //console.log($scope.gallery[i].images[k]);
        }
      }
    })();
    $scope.fitFullPage();
    (function() { new Swiper(".swiper-nx",{
      pagination : '.pagination-nx',
      slidesPerSlide : 1,
      mode: 'vertical',
      keyboardControl : true,
      mousewheelControl : true
    })})();
    mySwiper.swipeTo(($routeParams.projeto) ? $routeParams.projeto : 0,0, false);
  });

  console.log(mySwiper);
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
