var app = angular.module('Producto', ['ui.router','satellizer']);

app.config(function($stateProvider, $urlRouterProvider,$authProvider) {

$authProvider.loginUrl = 'producto2/PHP/auth.php';
$authProvider.tokenName = 'miToken';
$authProvider.tokenPrefix = 'practicapp';
$authProvider.authHeader="data";



$stateProvider

      .state('inicio', {
                url : '/inicio',
                templateUrl : 'inicio.html',
                controller : 'controlInicio'
            })
      .state('usuario', {
                url : '/usuario',
                abstract:true,//permite que con diferentes rutas se le pueda agregar contenidos de otros state 
                templateUrl : 'abstractoUsuario.html',
                controller : 'controlAbstractoUser'
            })
      .state('usuario.menu', {
                url: '/menu',
                views: {
                    'contenido': {
                        templateUrl: 'menuUsuario.html'
                    }
                }
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
                url: '/modificar/{id}?:correo:nombre:clave:tipo',
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
                templateUrl : 'abstractoProducto.html',
                controller : 'controlAbstractoProducto'
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

    $scope.IniciarSesion = true;
    $scope.CerrarSesion = false;
    $scope.Admin = false;
    $scope.CompAdmin = false;
    $scope.VendAdmin = false;


    if ($auth.isAuthenticated()) {                   
        
        $scope.IniciarSesion = false;
        $scope.CerrarSesion = true;

        if($auth.getPayload().tipo=="administrador" || $auth.getPayload().tipo=="comprador"){
            $scope.CompAdmin = true; 
        }

        if($auth.getPayload().tipo=="administrador" || $auth.getPayload().tipo=="vendedor"){
            $scope.VendAdmin = true; 
        }

        if($auth.getPayload().tipo=="administrador"){
            $scope.Admin = true; 
        }

        $scope.nombreuser =  $auth.getPayload().nombre;  
    }
})

app.controller('controlUsuarioSalir', function($scope, $state, $http, $auth) {
   $auth.logout();   
   $state.go("inicio");
 });

app.controller('controlLogin', function($scope, $state, $http, $auth) {

    $scope.usuario={};
    

    $scope.DatosAdmin= function(){
      $scope.usuario.correo = "admin@admin.com";
      $scope.usuario.nombre = "admin";
      $scope.usuario.clave = "321";
    }

    $scope.DatosComprador= function(){
      $scope.usuario.correo = "comp@comp.com";
      $scope.usuario.nombre = "comprador";
      $scope.usuario.clave = "123";
    }

    $scope.DatosVendedor= function(){
      $scope.usuario.correo = "vend@vend.com";
      $scope.usuario.nombre = "vend";
      $scope.usuario.clave = "321";
    }

    
    
    $scope.Login= function(){
       $auth.login($scope.usuario)
          .then(function(response) {
            console.info('correcto', response);
            
            if ($auth.isAuthenticated()) {                   
                  
                  $state.go("inicio");
            }     
            else {
                 alert("no se pudo loggear");
            }

            console.info('Payload: ',$auth.getPayload());
            console.info('El token es: ',$auth.getToken()); 

          })

          .catch(function(response) {
            console.info('no volvio bien', response); 
            console.info('Payload: ',$auth.getPayload());
            console.info('El token es: ',$auth.getToken());  
          })
        }

});

app.controller('controlAbstractoUser', function($scope, $auth) {

    if ($auth.isAuthenticated()) {
      $scope.nombreuser =  $auth.getPayload().nombre;
    }

});

app.controller('controlAbstractoProducto', function($scope, $auth) {

    if ($auth.isAuthenticated()) {
      $scope.nombreuser =  $auth.getPayload().nombre;
    }
      
});


app.controller('controlProductoAlta', function($scope, Producto, $state, $auth) {

    if ($auth.isAuthenticated() && $auth.getPayload().tipo !="comprador") {                   

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
    }
    else
    {
        $state.go("usuario.login");
    }
})

app.controller('controlProductoGrilla', function($scope, Producto, $state, $auth) {

    if ($auth.isAuthenticated()) {

      Producto.TraerTodos().then(
        function(respuesta){
          $scope.ListadoProducto = respuesta;
        },
        function(error){
          console.log(error);
        }
      );
    }
    else
    {
        $state.go("usuario.login");
    }
})

app.controller('controlEliminarProducto', function($scope, Producto, $state, $auth) {

    if ($auth.isAuthenticated() && $auth.getPayload().tipo !="comprador") {

      Producto.TraerTodos().then(
        function(respuesta){
          $scope.ListadoProducto = respuesta;
        },
        function(error){
          console.log(error);
        }
      );
    }
    else
    {
        $state.go("usuario.login");
    }

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

app.controller('controlUserAlta', function($scope, factoryUsuario, $state, $auth) {

   if ($auth.isAuthenticated() && $auth.getPayload().tipo == "administrador") {

      $scope.usuario={};

      $scope.Ingresar=function(){
        factoryUsuario.Insertar($scope.usuario).then(
        function(respuesta){
          alert(respuesta);
          $state.go("inicio");
        },
        function(error){
          console.log(error);
        }
      );
      }
    }
    else
    {
        $state.go("usuario.login");
    }

})

app.controller('controlUserGrilla', function($scope, factoryUsuario, $state, $auth) {

    if ($auth.isAuthenticated() && $auth.getPayload().tipo == "administrador") {

      factoryUsuario.TraerTodos().then(
        function(respuesta){
          $scope.ListadoUsuario = respuesta;
        },
        function(error){
          console.log(error);
        }
      );

      $scope.Borrar=function(usuario){
        factoryUsuario.Borrar(usuario).then(
        function(respuesta){
          $state.reload();
        },
        function(error){
          console.log(error);
        }
      );
      }
    }
    else
    {
        $state.go("usuario.login");
    }


})

app.controller('controlUserModificacion', function($scope, factoryUsuario, $state, $stateParams) {

    $scope.usuario={};

    $scope.usuario.id=$stateParams.id;
    $scope.usuario.correo=$stateParams.correo;
    $scope.usuario.nombre=$stateParams.nombre;
    $scope.usuario.clave=$stateParams.clave;
    $scope.usuario.tipo=$stateParams.tipo;


    $scope.Ingresar=function(){
      factoryUsuario.Modificar($scope.usuario).then(
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


