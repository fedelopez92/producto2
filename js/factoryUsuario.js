  
  app.factory('factoryUsuario', function ($http) {

    var objeto = {};

    objeto.Insertar = Insertar;
    objeto.Modificar = Modificar;
    objeto.Borrar = Borrar;
    objeto.TraerTodos = TraerTodos;

    return objeto;

    function Insertar(usuario){
      return $http.post('http://localhost/producto2/ws1/usuario/' + JSON.stringify(usuario)).then(
        function (respuesta){
          return "Se agrego el usuario !";
        },
        function (error){
          return error;
        }
        );
    }

    function Modificar(usuario){
      return $http.put('http://localhost/producto2/ws1/usuario/' + JSON.stringify(usuario)).then(
        function (respuesta){
          return "Se modifico el usuario !";
        },
        function (error){
          return error;
        }
        );
    }

    function Borrar(usuario){
      return $http.delete('http://localhost/producto2/ws1/usuario/' + JSON.stringify(usuario)).then(
        function (respuesta){
          return respuesta;
        },
        function (error){
          return error;
        }
        );
    }

    function TraerTodos(){
      return $http.get('http://localhost/producto2/ws1/usuarios').then(
        function (respuesta){
          return respuesta.data.listado;
        },
        function (error){
          return error;
        }
        );
    }


    /*function TraerUnPais(pais){
      return $http.get(TraerUrl(pais)).then(
        function (respuesta){
          return respuesta.data;
        },
        function (error){
          return error;
        }
        );
    }*/

    

  })