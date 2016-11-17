var app = angular.module('Producto', ['ui.router','satellizer']);

app.config(function($stateProvider, $urlRouterProvider,$authProvider) {

$authProvider.loginUrl = 'producto/PHP/auth.php';
$authProvider.tokenName='MiTokenGeneradoEnPHP';
$authProvider.tokenPrefix='Producto';
$authProvider.authHeader='data';

$authProvider.oauth2({
      name: 'Producto',
      url: 'http://localhost',
      clientId: '6f75fe7eef2e44b657dd',
      redirectUri: 'http://localhost/producto/#/usuario/login',
      authorizationEndpoint:  'http://localhost/producto/#/usuario/login',
    });

$stateProvider

      .state('inicio', {
                url : '/inicio',
                templateUrl : 'inicio.html',
                controller : 'controlInicio'
            })
      .state('usuario', {
                url : '/usuario',
                abstract:true,//permite que con diferentes rutas se le pueda agregar contenidos de otros state 
                templateUrl : 'abstractoUsuario.html'
            })
      .state('usuario.login', {
                url: '/login',
                views: {
                    'contenido': {
                        templateUrl: 'login.html',
                        controller : 'controlLogin'
                    }
                }
            })
      .state('usuario.cerrarsesion', {
                url: '/cerrarsesion',
                views: {
                    'contenido': {
                        controller : 'controlUsuarioSalir'
                    }
                }
            })
      .state('usuario.alta', {
                url: '/alta',
                views: {
                    'contenido': {
                        templateUrl: 'altaUsuario.html',
                        controller : 'controlUserAlta'
                    }
                }
            })
      .state('usuario.grilla', {
                url: '/grilla',
                views: {
                    'contenido': {
                        templateUrl: 'grillaUsuario.html',
                        controller : 'controlUserGrilla'
                    }
                }
            })
      .state('usuario.modificar', {
                url: '/modificar/{id}?:email:nombreuser:password:tipo',
                views: {
                    'contenido': {
                        templateUrl: 'altaUsuario.html',
                        controller : 'controlUserModificacion'
                    }
                }
            })
      .state('producto', {
                url : '/producto',
                abstract:true,//permite que con diferentes rutas se le pueda agregar contenidos de otros state 
                templateUrl : 'abstractoProducto.html'
            })
      .state('producto.alta', {
                url: '/alta',
                views: {
                    'contenido': {
                        templateUrl: 'altaProducto.html',
                        controller : 'controlProductoAlta'
                    }
                }
            })
      .state('producto.grilla', {
                url: '/grillaproducto',
                views: {
                    'contenido': {
                        templateUrl: 'grillaProducto.html',
                        controller : 'controlProductoGrilla'
                    }
                }
            })
      .state('producto.borrar', {
                url: '/borrarproducto',
                views: {
                    'contenido': {
                        templateUrl: 'borrarProducto.html',
                        controller : 'controlEliminarProducto'
                    }
                }
            })


      $urlRouterProvider.otherwise('/inicio');

 });


app.controller('controlInicio', function($scope, $state, $auth) {

    //console.info('Payload: ',$auth.getPayload());
    $scope.menuState = {}
    $scope.menuState.show = false;
    if ($auth.isAuthenticated()) {                   
        $scope.menuState.show = !$scope.menuState.show; 
    }
})

app.controller('controlUsuarioSalir', function($scope, $state, $http, $auth) {
   $auth.logout();   
   $state.go("inicio");
 });

app.controller('controlLogin', function($scope, $scope, $state, $http, $auth) {

    $scope.usuario={};
   

    $scope.Login= function(){
       $auth.login($scope.usuario)
          .then(function(response) {
            console.info('correcto', response);
            
            if ($auth.isAuthenticated()) {                   
                  alert("loggeado exitosamente");
                  $state.go("inicio"); 
            }     
            else {
                 alert("no se pudo loggear");
            }

            //console.info('Payload: ',$auth.getPayload());
            console.info('El token es: ',$auth.getToken()); 

          })

          .catch(function(response) {
            console.info('no volvio bien', response); 
            //console.info('Payload: ',$auth.getPayload());
            console.info('El token es: ',$auth.getToken());  
          })
        }

});

app.controller('controlProductoAlta', function($scope, Producto, $state) {

    $scope.producto={};

    $scope.Alta=function(){
      Producto.Insertar($scope.producto).then(
      function(respuesta){
        alert(respuesta);
        $state.go("inicio");
      },
      function(error){
        console.log(error);
      }
    );
    }
})

app.controller('controlProductoGrilla', function($scope, Producto) {

    Producto.TraerTodos().then(
      function(respuesta){
        $scope.ListadoProducto = respuesta;
      },
      function(error){
        console.log(error);
      }
    );
})

app.controller('controlEliminarProducto', function($scope, Producto, $state) {

    Producto.TraerTodos().then(
      function(respuesta){
        $scope.ListadoProducto = respuesta;
      },
      function(error){
        console.log(error);
      }
    );

    $scope.Borrar=function(producto){
      Producto.Borrar(producto).then(
      function(respuesta){
        $state.reload();
      },
      function(error){
        console.log(error);
      }
    );
    }

})

app.controller('controlUserAlta', function($scope, Usuario, $state) {

    $scope.usuario={};

    $scope.Ingresar=function(){
      Usuario.Insertar($scope.usuario).then(
      function(respuesta){
        alert(respuesta);
        $state.go("inicio");
      },
      function(error){
        console.log(error);
      }
    );
    }
})

app.controller('controlUserGrilla', function($scope, Usuario, $state) {

    Usuario.TraerTodos().then(
      function(respuesta){
        $scope.ListadoUsuario = respuesta;
      },
      function(error){
        console.log(error);
      }
    );

    $scope.Borrar=function(usuario){
      Usuario.Borrar(usuario).then(
      function(respuesta){
        $state.reload();
      },
      function(error){
        console.log(error);
      }
    );
    }

})

app.controller('controlUserModificacion', function($scope, Usuario, $state, $stateParams) {

    $scope.usuario={};

    $scope.usuario.id=$stateParams.id;
    $scope.usuario.email=$stateParams.email;
    $scope.usuario.nombreuser=$stateParams.nombreuser;
    $scope.usuario.password=$stateParams.password;
    $scope.usuario.tipo=$stateParams.tipo;


    $scope.Ingresar=function(){
      Usuario.Modificar($scope.usuario).then(
      function(respuesta){
        alert(respuesta);
        $state.go("usuario.grilla");
      },
      function(error){
        console.log(error);
      }
    );
    }
})

