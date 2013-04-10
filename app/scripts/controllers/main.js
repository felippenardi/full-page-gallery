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
      //"images": ["http://placebear.com/2001/2000", "http://placebear.com/2000/2000", "http://placebear.com/2001/2001", "http://placebear.com/2001/2010"]
      "images": ["images/exemplo.png", "images/exemplo.png"]
    },
    {
      "name": "Kittens",
      //"images": ["http://placekitten.com/2001/2000", "http://placekitten.com/1001/1000", "http://placekitten.com/1001/1005", "http://placekitten.com/1011/1005", "http://placekitten.com/1150/1055", "http://placekitten.com/1150/1080"]
      "images": ["images/exemplo.png", "images/exemplo.png"]
    },
    {
      "name": "Apes",
      //"images": ["http://placeape.com/1201/1100", "http://placeape.com/1001/1000", "http://placeape.com/1001/1005", "http://placeape.com/1011/1005", "http://placeape.com/1150/1055", "http://placeape.com/1050/1200"]
      "images": ["images/exemplo.png", "images/exemplo.png"]
    }
  ];

  $scope.fitFullPage = function _fitFullPage(){
    $('[class*=swiper-n]').css("height",$(window).height());
    $('.swiper-container').css("height",$(window).height());
    $('.swiper-slide').css("height",$(window).height());
  };
  window.onresize = function() { $scope.fitFullPage(); }

  $scope.toggle = function() {
    $scope.isVisible = ! $scope.isVisible;
    if ($scope.isVisible === true) {
      $scope.isActive = "active";
    } else { $scope.isActive = ""; }
  }

  $scope.createNewSlide = function(theSwiper, theHtml) {
    var newSlide = theSwiper.createSlide(theHtml);
    newSlide.append();
  };

  $scope.swipers = {
    horizontalSwiper: {
      prevSlide:($routeParams.projeto) ? $routeParams.projeto : 0,
      swiper:
        $('.swiper-horizontal').swiper({
          pagination : '.pagination-horizontal',
          slidesPerSlide : 1,
          initialSlide : 0,
          grabCursor: true,
          keyboardControl : true,
          onSlideChangeStart : function() {
            var x = $scope.swipers.horizontalSwiper.swiper.activeSlide;
            var y = $scope.swipers.verticalSwipers.swipers[x].activeSlide;
            $scope.$apply($location.search({'projeto': x, 'foto' : y}));

            if ($scope.swipers.horizontalSwiper.prevSlide > $scope.swipers.horizontalSwiper.swiper.activeSlide) {
              console.log("<<< ... "+$scope.swipers.horizontalSwiper.swiper.activeSlide+'<'+$scope.swipers.horizontalSwiper.prevSlide);
            } else {
              console.log(">>> ... "+$scope.swipers.horizontalSwiper.swiper.activeSlide+'>'+$scope.swipers.horizontalSwiper.prevSlide);
            }
            $scope.swipers.horizontalSwiper.prevSlide = $scope.swipers.horizontalSwiper.swiper.activeSlide;
          },
          onSlideChangeEnd : function() {
          }
        })
    },
    verticalSwipers: {
      swipers: [],
      generate: function() {
        var i = 0;
        for (i=0; i<$scope.gallery.length; i++) {
          var html = "<div class='swiper-container swiper-nested2 swiper-n"+i+"'> <div class='pagination-nested2 pagination-n"+i+"'></div> <div class='swiper-wrapper'> </div> </div>"
          $scope.createNewSlide($scope.swipers.horizontalSwiper.swiper, html);
          $scope.fitFullPage();

          $scope.swipers.verticalSwipers.swipers[i] = $('.swiper-n'+i).swiper({
            pagination : '.pagination-n'+i,
            slidesPerSlide : 1,
            mode: 'vertical',
            keyboardControl : false,
            mousewheelControl : true,
            onSlideChangeStart: function(i) {
              $scope.$apply($location.search('foto',i.activeSlide));
            },
            onSlideChangeEnd : function(i) {
            }
          });
          for (var k=0; k<$scope.gallery[i].images.length; k++) {
            var html = $scope.gallery[i].images[k];
            html = '<img src="'+$scope.gallery[i].images[k]+'">'
            $scope.createNewSlide($scope.swipers.verticalSwipers.swipers[i], html);
          }
        }
      }
    }
  }
  $scope.swipers.verticalSwipers.generate();
  console.log($scope.swipers.verticalSwipers.swipers[0].currentSlide());

  $(document).keydown(function (e) {
    if(!e) {
      e = window.event;
    }
    var x = $scope.swipers.horizontalSwiper.swiper.activeSlide;
    var y = $scope.swipers.verticalSwipers.swipers[x];
    switch(e.keyCode) {
      case 38:
        console.log('up');
        y.swipePrev();
        break;
      case 40:
        console.log('down');
        y.swipeNext();
        break;
    }
  });

  (function setimgwidth() {
    var $bg              = $(".swiper-slide img");
    var theWindow        = $(window);
    var aspectRatio      = $bg.width() / $bg.height();
    if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
      $bg
      .removeClass()
      .addClass('bgheight');
    } else {
      $bg
      .removeClass()
      .addClass('bgwidth');
    }
  })();
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
    var timer;
    function delayResize(){
        clearTimeout(timer)
        timer = setTimeout(function() {
            console.log("teste");
            resizeBg();
        },400);
    }
    theWindow.resize(delayResize).trigger("resize");
  });

  $scope.fitFullPage();

  $scope.$on('$routeUpdate', function (scope, next, current) {
    var projeto = ($routeParams.projeto) ? $routeParams.projeto : 0;
    var foto = ($routeParams.foto) ? $routeParams.foto : 0;
    $scope.swipers.horizontalSwiper.swiper.swipeTo(projeto,300, false);
    $scope.swipers.verticalSwipers.swipers[projeto].swipeTo(foto, 300, false);
  });

  // TODO REMOVE GLOBAL VARIABLE
  var projeto = ($routeParams.projeto) ? $routeParams.projeto : 0;
  var foto = ($routeParams.foto) ? $routeParams.foto : 0;
  $scope.swipers.horizontalSwiper.swiper.swipeTo(projeto,0, false);
  $scope.swipers.verticalSwipers.swipers[projeto].swipeTo(foto, 0, false);
});
