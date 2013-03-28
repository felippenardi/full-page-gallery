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



  //var prevSlide = ($routeParams.projeto) ? $routeParams.projeto : 0; // TODO move this variable to an specifc scope
  //var mySwiper;
  //console.log(mySwiper);


  //$(function(){
    ////-var mySwiper = new Swiper('.swiper-n1',options);
    //mySwiper = $('.swiper-horizontal').swiper({
      //pagination : '.pagination-horizontal',
      //slidesPerSlide : 1,
      //initialSlide : 0,
      //grabCursor: true,
      //keyboardControl : true,
      //onSlideChangeEnd : function() {
        ////console.log(mySwiper.activeSlide);
        ////console.log(prevSlide);
        ////$scope.$apply($location.search('projeto',mySwiper.activeSlide));
        //if (prevSlide > mySwiper.activeSlide) {
          //console.log("<<< ... "+mySwiper.activeSlide+'<'+prevSlide);
        //} else {
          //console.log(">>> ... "+mySwiper.activeSlide+'>'+prevSlide);
        //}
        //prevSlide = mySwiper.activeSlide;
      //}
    //});

    //$scope.verticalSwipers = {
      //swipers: [],
      //generate: function() {
        //for (var i=0; i<$scope.gallery.length; i++) {
          //var html = "<div class='swiper-container swiper-nested2 swiper-n"+i+"'> <div class='pagination-nested2 pagination-n"+i+"'></div> <div class='swiper-wrapper'> </div> </div>"
          //$scope.createNewSlide(mySwiper, html);
          //$scope.fitFullPage();

          //$scope.verticalSwipers.swipers[i] = $('.swiper-n'+i).swiper({
            //pagination : '.pagination-n'+i,
            //slidesPerSlide : 1,
            //mode: 'vertical',
            //keyboardControl : true,
            //mousewheelControl : true,
            //onSlideChangeEnd : function() {
             //console.log('oi');
             //console.log($scope.verticalSwipers.swipers[i]);
            //}
          //});
          //for (var k=0; k<$scope.gallery[i].images.length; k++) {
            //$scope.createNewSlide($scope.verticalSwipers.swipers[i], $scope.gallery[i].images[k]);
            ////console.log($scope.gallery[i].images[k]);
            //console.log($scope.verticalSwipers.swipers[i]);
          //}
        //}
      //}
    //};
    //$scope.verticalSwipers.generate();

    //$scope.fitFullPage();
  //});

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
          onSlideChangeEnd : function() {
            $scope.$apply($location.search('projeto',$scope.swipers.horizontalSwiper.swiper.activeSlide));
            if ($scope.swipers.horizontalSwiper.prevSlide > $scope.swipers.horizontalSwiper.swiper.activeSlide) {
              console.log("<<< ... "+$scope.swipers.horizontalSwiper.swiper.activeSlide+'<'+$scope.swipers.horizontalSwiper.prevSlide);
            } else {
              console.log(">>> ... "+$scope.swipers.horizontalSwiper.swiper.activeSlide+'>'+$scope.swipers.horizontalSwiper.prevSlide);
            }
            $scope.swipers.horizontalSwiper.prevSlide = $scope.swipers.horizontalSwiper.swiper.activeSlide;
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
              $scope.$apply($location.search('foto',i.activeSlide));
            }
          });
          for (var k=0; k<$scope.gallery[i].images.length; k++) {
            $scope.createNewSlide($scope.swipers.verticalSwipers.swipers[i], $scope.gallery[i].images[k]);
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

  $scope.fitFullPage();


  //$(window).load(function() {
    //var theWindow        = $(window),
    //$bg              = $(".swiper-slide img"),
    //aspectRatio      = $bg.width() / $bg.height();
    //function resizeBg() {
      //if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
        //$bg
        //.removeClass()
        //.addClass('bgheight');
      //} else {
        //$bg
        //.removeClass()
        //.addClass('bgwidth');
      //}
    //}
    //theWindow.resize(resizeBg).trigger("resize");
  //});

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
