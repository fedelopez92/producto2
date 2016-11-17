  
  app.service('Usuario', function ($http) {


    this.Insertar =function(usuario){
      return $http.post('http://localhost/producto/ws1/usuario/' + JSON.stringify(usuario)).then(
        function (respuesta){
          return "Se agrego el usuario !";
        },
        function (error){
          return error;
        }
        );
    }

    this.Modificar =function(usuario){
      return $http.put('http://localhost/producto/ws1/usuario/' + JSON.stringify(usuario)).then(
        function (respuesta){
          return "Se modifico el usuario !";
        },
        function (error){
          return error;
        }
        );
    }

    this.Borrar =function(usuario){
      return $http.delete('http://localhost/producto/ws1/usuario/' + JSON.stringify(usuario)).then(
        function (respuesta){
          return respuesta;
        },
        function (error){
          return error;
        }
        );
    }

    this.TraerTodos =function(){
      return $http.get('http://localhost/producto/ws1/usuarios').then(
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