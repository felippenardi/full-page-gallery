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

    $scope.loadImageBackground = function() {
      var xSlider = $scope.swipers.horizontalSwiper.swiper;
      var ySliders = $scope.swipers.verticalSwipers.swipers;
      var x = xSlider.activeSlide;
      var y = ySliders[x].activeSlide;
      var yOf = function(x) {
        return ySliders[x].activeSlide;
      };

      function loadImage() {
        var returnSlide = {
          div : function(x, y) {
            return $('.swiper-n'+x+' .swiper-wrapper .swiper-slide div:eq('+y+')');
          },
          current  : function(x,y) { return this.div(x,y); },
          previous : function(x,y) { return this.div(x,y); }
        }

        function changeBackground(currentSlide) {
          currentSlide.show();
          if ( currentSlide.attr("low-res") && currentSlide.attr("loaded") !== "true" ) {
            $("#image_loader").attr( "src", currentSlide.attr("low-res") );
            currentSlide.attr("loaded","true");
            var lowRes = currentSlide.attr("low-res");
            currentSlide.removeAttr("low-res");
            $("#image_loader").imagesLoaded(function() {
              currentSlide.attr("style", "background-image:url("+lowRes+");");
              currentSlide.hide().fadeTo(500,1, function(){
                currentSlide.append("<span class='high-res'></span>");
                if (currentSlide.attr("high-res")) {
                  $("#image_loader").attr( "src", currentSlide.attr("high-res") );
                  var highRes = currentSlide.attr("high-res");
                  currentSlide.removeAttr("high-res");
                  $("#image_loader").imagesLoaded(function() {
                    currentSlide.find("span.high-res").hide().fadeTo(1000,1)
                    .attr("class", currentSlide.attr("class"))
                    .attr("style", currentSlide.attr("style"))
                    .css("background-image", "url("+highRes+")");
                  });
                }
              });
            });
          }
        }

        changeBackground( returnSlide.current(x,y) );
        changeBackground( returnSlide.current(x,y-1) );
        changeBackground( returnSlide.current(x,y+1) );
        changeBackground( returnSlide.current( x-1, yOf(x-1) ) );
        changeBackground( returnSlide.current( x+1, yOf(x+1) ) );
        returnSlide.current( x-2, yOf(x-2) ).hide();
        returnSlide.current( x+2, yOf(x+2) ).hide();
        returnSlide.current(x,y-2).hide();
        returnSlide.current(x,y+2).hide();

      }
      loadImage();
    };
    $scope.initialize = function() {
        //$scope.showBg(($routeParams.projeto) ? $routeParams.projeto : 0, ($routeParams.foto) ? $routeParams.foto : 0);
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
                    createPagination : false,
                    //pagination : '.pagination-horizontal',
                    slidesPerSlide : 1,
                    initialSlide : 0,
                    grabCursor: true,
                    keyboardControl : true,
                    SlideChangeStart : function() {
                        var xSlider = $scope.swipers.horizontalSwiper.swiper;
                        var ySliders = $scope.swipers.verticalSwipers.swipers;
                        var x = xSlider.activeSlide;
                        var y = ySliders[x].activeSlide;


                        // Bypass swiper bug that hides pagination
                        $('.swiper-n'+x+' .page').removeClass("pagination-nested2");

                        //if ($scope.swipers.horizontalSwiper.prevSlide > $scope.swipers.horizontalSwiper.swiper.activeSlide) {
                            //console.log("<<< ... "+$scope.swipers.horizontalSwiper.swiper.activeSlide+'<'+$scope.swipers.horizontalSwiper.prevSlide);
                        //} else {
                            //console.log(">>> ... "+$scope.swipers.horizontalSwiper.swiper.activeSlide+'>'+$scope.swipers.horizontalSwiper.prevSlide);
                        //}
                        $scope.swipers.horizontalSwiper.prevSlide = $scope.swipers.horizontalSwiper.swiper.activeSlide;


                    },
                    onSlideChangeEnd : function() {
                        var xSlider = $scope.swipers.horizontalSwiper.swiper;
                        var ySliders = $scope.swipers.verticalSwipers.swipers;
                        var x = xSlider.activeSlide;
                        var y = ySliders[x].activeSlide;

                        //$scope.loadImageBackground();
                        ySliders[x].swipeTo(y, 0, true);

                        // Bypass swiper bug that hides pagination
                        $('.swiper-n'+x+' .page').addClass("pagination-nested2");


                        $scope.$apply($location.search({'projeto': x, 'foto' : 0}));
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
                            },
                            onSlideChangeEnd : function(i) {
                              $scope.$apply(function() {
                                $location.search('foto',i.activeSlide)
                                $scope.fitFullPage();
                              });
                            }
                        });
                        for (var k=0; k < projetos[i].galeria.length; k++) {
                            console.log(style);
                            var html;
                            var lowRes = projetos[i].galeria[k].low_res;
                            var highRes = projetos[i].galeria[k].high_res;
                            var formato = projetos[i].galeria[k].formato;
                            var style = k===0 ? 'style="background-image: url('+highRes+')"' : 'style="display: block;"';
                            html = '<div class="background '+formato+'" high-res="'+highRes+'" low-res="'+lowRes+'" style="display:none;"></div>';
                            $scope.createNewSlide($scope.swipers.verticalSwipers.swipers[i], html);
                        }
                    }
                }
            }
        }
        $scope.swipers.verticalSwipers.generate();

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
            var projeto = parseInt(( ($routeParams.projeto) ? $routeParams.projeto : 0 ), 10);
            var foto = parseInt(( ($routeParams.foto) ? $routeParams.foto : 0 ), 10);
            $scope.swipers.horizontalSwiper.swiper.swipeTo(projeto,300, false);
            $scope.swipers.verticalSwipers.swipers[projeto].swipeTo(foto, 300, false);
            $scope.activeProject = $routeParams.projeto;

            $scope.loadImageBackground();


        });

        var projeto = parseInt(( ($routeParams.projeto) ? $routeParams.projeto : Math.floor(Math.random()*($scope.swipers.horizontalSwiper.swiper.slides.length)) ), 10);
        var foto = parseInt(( ($routeParams.foto) ? $routeParams.foto : 0 ), 10);
        $location.search('projeto',projeto)
        $location.search('foto',foto)

        $scope.swipers.horizontalSwiper.swiper.swipeTo(projeto,0, false);
        $scope.swipers.verticalSwipers.swipers[projeto].swipeTo(foto, 0, false);

        $scope.swipers.horizontalSwiper.swiper.swipeTo(projeto,0, false);
        $scope.swipers.verticalSwipers.swipers[projeto].swipeTo(foto, 300, false);

        $scope.activeProject = projeto;
        $scope.loadImageBackground();
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


