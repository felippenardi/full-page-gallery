'use strict';

app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(ev,data) {
        if (data.$route && data.$route.controller)
            $rootScope.controller = data.$route.controller;
            var route = data.$route.templateUrl;
            route === "partials/main" ?      $rootScope.onMain     = true : $rootScope.onMain     = false;
            route === "partials/perfil" ?    $rootScope.onPerfil   = true : $rootScope.onPerfil   = false;
            route === "partials/projetos" ?  $rootScope.onProjetos = true : $rootScope.onProjetos = false;
            route === "partials/contato" ?   $rootScope.onContato  = true : $rootScope.onContato  = false;
    })
});
app.controller('MainCtrl', function ($location, $routeParams, $scope, $rootScope, $http, $compile) {
    $scope.populate = function() {
        var url = 'data.json';
        $http.get(url).success(function(response){
            $scope.content = response.cadas;
            $scope.initialize();
        })
        .error(function(data, status, headers, config){
            console.log("JSON may not exist or is not responding. "+url);
        })
    };
    $scope.populate();

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
                prevSlide: ($routeParams.projeto) ? $routeParams.projeto : 0,
                swiper:
                $('.swiper-horizontal').swiper({
                    pagination : '.pagination-horizontal',
                    slidesPerSlide : 1,
                    initialSlide : 0,
                    grabCursor: true,
                    keyboardControl : true,
                    onSlideChangeStart : function() {
                        var xSlider = $scope.swipers.horizontalSwiper.swiper;
                        var ySliders = $scope.swipers.verticalSwipers.swipers;
                        var x = xSlider.activeSlide;
                        var y = ySliders[x].activeSlide;

                        //$scope.swipers.verticalSwipers.swipers[x].swipeTo(0,0, true);
                        //for (var i=0; i< xSlider.slides.length; i++) {
                            //ySliders[i].swipeTo(0,0,0,false);
                        //}

                        $scope.$apply($location.search({'projeto': x, 'foto' : 0}));

                        // Bypass swiper bug that hides pagination
                        $('.swiper-n'+x+' .page').removeClass("pagination-nested2");

                        //if ($scope.swipers.horizontalSwiper.prevSlide > $scope.swipers.horizontalSwiper.swiper.activeSlide) {
                            //console.log("<<< ... "+$scope.swipers.horizontalSwiper.swiper.activeSlide+'<'+$scope.swipers.horizontalSwiper.prevSlide);
                        //} else {
                            //console.log(">>> ... "+$scope.swipers.horizontalSwiper.swiper.activeSlide+'>'+$scope.swipers.horizontalSwiper.prevSlide);
                        //}
                        $scope.swipers.horizontalSwiper.prevSlide = $scope.swipers.horizontalSwiper.swiper.activeSlide;


                        //TODO
                        //console.log(2);
                        //(function showBg() {
                            //var slide = $('.swiper-n'+x+' .swiper-wrapper .swiper-slide div');
                            //var dataStyle = slide.attr('data-style');
                            //slide.attr('style', dataStyle);
                        //})();

                    },
                    onSlideChangeEnd : function() {
                        //var x = $scope.swipers.horizontalSwiper.swiper.activeSlide;
                        //var y = $scope.swipers.verticalSwipers.swipers[x];
                        //y.swipeTo(0,0, false);
                        var xSlider = $scope.swipers.horizontalSwiper.swiper;
                        var x = xSlider.activeSlide;

                        // Bypass swiper bug that hides pagination
                        $('.swiper-n'+x+' .page').addClass("pagination-nested2");
                    }
                })
            },
            verticalSwipers: {
                swipers: [],
                generate: function() {
                    var i = 0;
                    var projetos = $scope.content;
                    console.log(projetos.length);
                    for (i=0; i<projetos.length; i++) {
                        var html = "<div class='swiper-container swiper-nested2 swiper-n"+i+"'>"+
                                        "<div class='page pagination-nested2 pagination-n"+i+"'></div>"+
                                        "<div class='swiper-wrapper'>"+
                                   "</div> </div>";
                        $scope.createNewSlide($scope.swipers.horizontalSwiper.swiper, html);
                        $scope.fitFullPage();

                        $scope.swipers.verticalSwipers.swipers[i] = $('.swiper-n'+i).swiper({
                            pagination : '.pagination-n'+i,
                            slidesPerSlide : 1,
                            mode: 'vertical',
                            mousewheelControl : true,
                            onSlideChangeStart: function(slide) {
                                var xSlider = $scope.swipers.horizontalSwiper.swiper;
                                var ySliders = $scope.swipers.verticalSwipers.swipers;
                                var x = xSlider.activeSlide;
                                var y = ySliders[x].activeSlide;

                                (function showBg() {
                                    var slide = function(innerX, innerY) {
                                        return $('.swiper-n'+innerX+' .swiper-wrapper .swiper-slide div:eq('+innerY+')');
                                    };

                                    var lowRes = function(innerX, innerY) {
                                        make('low-res', innerX, innerY);
                                    };
                                    var highRes = function(innerX, innerY) {
                                        make('low-res', innerX, innerY);
                                    };
                                    var hide = function(innerX, innerY) {
                                        slide(innerX,innerY).css('display', 'none');
                                    };
                                    var make = function(prop, innerX, innerY) {
                                        var currentAttr = slide(innerX, innerY).attr('style');
                                        var attr = slide(innerX, innerY).attr(prop);
                                        if (attr !== currentAttr) {
                                            slide(innerX,innerY).attr('style', attr);
                                            //slide(innerX,innerY).css('display', 'block');
                                        }
                                    };

                                    highRes(x, y);
                                    highRes(x, (y+1) );
                                    highRes(x, (y-1) );
                                    lowRes(x, (y+2) );
                                    lowRes(x, (y-2) );
                                    hide(x, (y-4) );
                                    hide(x, (y+4) );

                                    //console.log(slide.container);
                                    //console.log("vertical onSldieChangeStart");
                                    //$('.swiper-n'+x+' .swiper-wrapper .swiper-slide div:eq('+y+')').each(function() {
                                        //var dataStyle = $(this).attr('data-style');
                                        //$(this).attr('style', dataStyle);
                                    //});
                                    //var dataStyle = $(this).attr('data-style');
                                    //$('.swiper-n'+x+' .swiper-wrapper .swiper-slide div:eq('+y+')').attr('style', dataStyle);
                                    //$('.swiper-n'+x+' .swiper-wrapper .swiper-slide div:eq('+y+')').each(function() {
                                        //var dataStyle = $(this).attr('data-style');
                                        //$(this).attr('style', dataStyle);
                                    //});
                                    //console.log($('.swiper-n'+x+' .swiper-wrapper .swiper-slide div:eq('+(y-1)+')'));
                                    //console.log($('.swiper-n'+x+' .swiper-wrapper .swiper-slide div:eq('+(y+1)+')'));
                                    //var currentSlide = $('.swiper-n'+x+' .swiper-wrapper .swiper-slide div:eq('+y+')');
                                    //var lowRes = currentSlide.attr('low-res');
                                    //currentSlide.attr('style', lowRes);
                                })();
                            },
                            onSlideChangeEnd : function(i) {
                                $scope.$apply(function() {
                                    $location.search('foto',i.activeSlide)
                                    $scope.fitFullPage();
                                });
                            }
                        });
                        for (var k=0; k < projetos[i].galeria.length; k++) {
                            var html;
                            var lowRes = projetos[i].galeria[k].low_res;
                            var highRes = projetos[i].galeria[k].high_res;
                            var formato = projetos[i].galeria[k].formato;
                            html = '<div class="background '+formato+'" high-res="background-image: url('+highRes+')" low-res="background-image: url('+lowRes+')" style="display:none;"></div>';
                            $scope.createNewSlide($scope.swipers.verticalSwipers.swipers[i], html);
                        }
                    }
                }
            }
        }
        $scope.swipers.verticalSwipers.generate();
        //console.log($scope.swipers.verticalSwipers.swipers[0].currentSlide());

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
                    if (y.activeSlide === y.slides.length - 1) {
                        console.log('subindo');
                        y.swipeTo(0, 1000, true);
                    }  else {
                        y.swipeNext();
                    }
                    break;
            }
        });


        $scope.fitFullPage();

        $scope.$on('$routeUpdate', function (scope, next, current) {
            var projeto = ($routeParams.projeto) ? $routeParams.projeto : 0;
            var foto = ($routeParams.foto) ? $routeParams.foto : 0;
            //$scope.swipers.horizontalSwiper.swiper.swipeTo(projeto,300, false);
            //$scope.swipers.verticalSwipers.swipers[projeto].swipeTo(foto, 300, false);
            $scope.activeProject = $routeParams.projeto;
        });

        // TODO REMOVE GLOBAL VARIABLE
        var projeto = ($routeParams.projeto) ? $routeParams.projeto : 0;
        var foto = ($routeParams.foto) ? $routeParams.foto : 0;
        //$scope.swipers.horizontalSwiper.swiper.swipeTo(projeto,0, false);
        //$scope.swipers.verticalSwipers.swipers[projeto].swipeTo(foto, 0, false);
        $scope.activeProject = 0;

    }
    $scope.goLeft = function() {
        $scope.swipers.horizontalSwiper.swiper.swipePrev();
    }
    $scope.goRight = function() {
        $scope.swipers.horizontalSwiper.swiper.swipeNext();
    }
    $scope.goDown = function() {
        var x = $scope.swipers.horizontalSwiper.swiper.activeSlide;
        var y = $scope.swipers.verticalSwipers.swipers[x];
        if (y.activeSlide === y.slides.length - 1) {
            y.swipeTo(0, 3000, true);
        }  else {
            y.swipeNext();
        }
    }


    function preloader(){
        document.body.className = "loaded";
        //document.getElementById("content").style.display = "block";
    }//preloader
    window.onload = preloader;
});


app.controller('ProjetosCtrl', function ($location, $routeParams, $scope, $rootScope, $http, $window) {
    $scope.onPerfil = $rootScope.onPerfil;
    console.log(2);
    $scope.populate = function() {
        var url = 'data_projetos.json';
        $http.get(url).success(function(response){
            $scope.content = response.cadas;
        })
        .error(function(data, status, headers, config){
            console.log("JSON may not exist or is not responding. "+url);
        })
    };
    $scope.populate();
});


