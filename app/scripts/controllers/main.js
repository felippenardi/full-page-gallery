'use strict';

var app = angular.module('herokuApp');
app.controller('MainCtrl', function ($location, $routeParams, $scope, $http) {
    $scope.populate = function() {
        var url = 'http://cadas.dev.ultraleve.me/projetos/';
        // Esse URL abaixo funciona jsonp
        //var url = 'http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK';
        var url = 'data.json';
        $http.get(url).success(function(response){
            $scope.content = response;
            console.log(response);
            $scope.initialize();
        })
        .error(function(data, status, headers, config){
            console.log("JSON may not exist or is not responding. "+url);
        })
    };
    $scope.populate();

    //(function setimgwidth() {
        //var $bg              = $(".swiper-slide img");
        //var theWindow        = $(window);
        //var aspectRatio      = $bg.width() / $bg.height();
        //if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
            //$bg
            //.removeClass()
            //.addClass('bgheight');
        //} else {
            //$bg
            //.removeClass()
            //.addClass('bgwidth');
        //}
    //})();
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
        //var timer;
        //function delayResize(){
            //clearTimeout(timer)
            //timer = setTimeout(function() {
                //console.log("teste");
                //resizeBg();
            //},400);
        //}
        //theWindow.resize(delayResize).trigger("resize");
    //});

    $scope.initialize = function() {
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
                    console.log(42);
                    console.log($scope.content[0].projetos[0].galeria[0].low_res);
                    for (i=0; i<$scope.content[0].projetos.length; i++) {
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
                        for (var k=0; k<$scope.content[0].projetos[i].galeria.length; k++) {
                            var html = $scope.content[0].projetos[i].galeria[k].low_res;
                            html = '<div style="position:absolute;top:0;left:0;bottom:0;top:0;background: url('+html+') no-repeat center center fixed;-webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;width:100%;height:100%;"></div>';
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

    }
    $scope.goLeft = function() {
        $scope.swipers.horizontalSwiper.swiper.swipePrev();
    }
    $scope.goRight = function() {
        $scope.swipers.horizontalSwiper.swiper.swipePrev();
    }
});
