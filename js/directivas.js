  app.directive('utnProductos', function(){

  	return {
  		replace: true,
  		restrict: 'E',
  		templateUrl: 'templateProductos.html'
  	};
  })

  app.directive('utnUsuarios', function(){

  	return {
  		replace: true,
  		restrict: 'E',
  		templateUrl: 'templateUsuarios.html'
  	};
  })