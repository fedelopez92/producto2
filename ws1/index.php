<?php
include "../PHP/clases/Productos.php";
include "../PHP/clases/Usuarios.php";
/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require 'vendor/autoload.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
/**
* GET: Para consultar y leer recursos
* POST: Para crear recursos
* PUT: Para editar recursos
* DELETE: Para eliminar recursos
*
*  GET: Para consultar y leer recursos */

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

//PERSONAS

$app->get('/productos[/]', function ($request, $response, $args) {
    $respuesta= array();    
    $respuesta['listado']=Producto::TraerTodosLosProductos();
    $arrayJson = json_encode($respuesta);     
    echo  $arrayJson;
    
});

$app->get('/producto[/{id}[/{name}]]', function ($request, $response, $args) {
    $response->write("Datos producto ");
    var_dump($args);
    echo json_encode(Producto::TraerUnProducto($args['id']));

});
/* POST: Para crear recursos */
$app->post('/producto/{unProducto}', function ($request, $response, $args) {
    $respuesta = json_decode($args['unProducto']);// decodifica un string de JSON
    Producto::InsertarProducto($respuesta); 
});

// /* PUT: Para editar recursos */
$app->put('/producto/{unProducto}', function ($request, $response, $args) {
    $respuesta = json_decode($args['unProducto']);
    Producto::ModificarProducto($respuesta);
    

});

// /* DELETE: Para eliminar recursos */
$app->delete('/producto/{unProducto}', function ($request, $response, $args) {
    $respuesta = json_decode($args['unProducto']);
    Producto::BorrarProducto($respuesta->id);
});

//USUARIOS

$app->get('/usuarios[/]', function ($request, $response, $args) {
    $respuesta= array();    
    $respuesta['listado']=Usuario::TraerTodosLosUsuarios();
    //var_dump($respuesta);
    $arrayJson = json_encode($respuesta);     
    echo  $arrayJson;
    
});


$app->post('/usuario/{unUsuario}', function ($request, $response, $args) {
    $respuesta = json_decode($args['unUsuario']);// decodifica un string de JSON
    Usuario::InsertarUsuario($respuesta); 
});


$app->put('/usuario/{unUsuario}', function ($request, $response, $args) {
    $respuesta = json_decode($args['unUsuario']);
    Usuario::ModificarUsuario($respuesta);
    

});


$app->delete('/usuario/{unUsuario}', function ($request, $response, $args) {
    $respuesta = json_decode($args['unUsuario']);
    Usuario::BorrarUsuario($respuesta->id);
});









/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
