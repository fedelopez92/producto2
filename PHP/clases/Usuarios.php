<?php
require_once"AccesoDatos.php";
class Usuario
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
  	public $correo;
  	public $clave;
  	public $tipo;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	
	public function GetNombre()
	{
		return $this->nombre;
	}
	
	public function GetCorreo()
	{
		return $this->correo;
	}
	
	
	public function GetClave()
	{
		return $this->clave;
	}

	public function GetTipo()
	{
		return $this->tipo;
	}
	
	
	public function SetId($valor)
	{
		$this->id = $valor;
	}
	
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	
	public function SetCorreo($valor)
	{
		$this->correo = $valor;
	}
	
	public function SetClave($valor)
	{
		$this->clave = $valor;
	}

	public function SetTipo($valor)
	{
		$this->tipo = $valor;
	}
	
	
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = nombre::TraerUnUsuario($id);
			
			$this->nombre = $obj->nombre;
			$this->correo = $correo;
			$this->id = $obj->id;
			$this->clave = $obj->clave;
			$this->tipo = $obj->tipo;

		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->correo."-".$this->nombre."-".$this->tipo;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	
	public static function TraerTodosLosUsuarios()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from misusuarios");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasUsuarios() ");
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
		return $arrUsuarios;
	}

	public static function TraerUnUsuario($nombreUsuario) 
	{	

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from misusuarios where nombre =:nombre");
		$consulta->bindValue(':nombre', $nombreUsuario, PDO::PARAM_STR);
		$consulta->execute();
		$nombreBuscado= $consulta->fetchObject('usuario');
		return $nombreBuscado;	
					
	}

//--------------------------------------------------------------------------------//

	public static function InsertarUsuario($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into misusuarios (nombre,correo,clave,tipo)
															values(:nombre,:correo,:clave,:tipo)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarPersona (:nombre,:apellido,:correo,:foto)");
		$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':correo', $usuario->correo, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $usuario->clave, PDO::PARAM_STR);
		$consulta->bindValue(':tipo', $usuario->tipo, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}

	public static function BorrarUsuario($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from misusuarios WHERE id=:id");	
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL Borrarnombre(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}

	public static function ModificarUsuario($usuario)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update misusuarios 
				set nombre=:nombre,
				correo=:correo,
				clave=:clave,
				tipo=:tipo
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL Modificarnombre(:id,:correo,:fechavotacion,:foto)");
			$consulta->bindValue(':id',$usuario->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':correo', $usuario->correo, PDO::PARAM_STR);
			$consulta->bindValue(':clave', $usuario->clave, PDO::PARAM_STR);
			$consulta->bindValue(':tipo', $usuario->tipo, PDO::PARAM_STR);
			return $consulta->execute();
	}


//--------------------------------------------------------------------------------//


}
