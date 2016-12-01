  
  app.service('Producto', function ($http) {


    this.Insertar =function(producto){
      return $http.post('http://localhost/producto2/ws1/producto/' + JSON.stringify(producto)).then(
        function (respuesta){
          return "Se agrego el producto !";
        },
        function (error){
          return error;
        }
        );
    
    }

    this.Borrar =function(producto){
      return $http.delete('http://localhost/producto2/ws1/producto/' + JSON.stringify(producto)).then(
        function (respuesta){
          return respuesta;
        },
        function (error){
          return error;
        }
        );
    }

    this.TraerTodos =function(){
      return $http.get('http://localhost/producto2/ws1/productos').then(
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