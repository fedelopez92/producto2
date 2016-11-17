<?php
require_once"AccesoDatos.php";
class Producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $codbarra;
 	public $nombre;

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
	public function GetCodBarra()
	{
		return $this->codbarra;
	}

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetCodBarra($valor)
	{
		$this->codbarra = $valor;
	}

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Producto::TraerUnProducto($id);
			
			$this->nombre = $obj->nombre;
			$this->codbarra = $obj->codbarra;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->nombre."-".$this->codbarra;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnProducto($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from productos where id =:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaproducto(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscada= $consulta->fetchObject('producto');
		return $productoBuscada;	
					
	}
	
	public static function TraerTodosLosProductos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from productos");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasproductos() ");
		$consulta->execute();			
		$arrproductos= $consulta->fetchAll(PDO::FETCH_CLASS, "producto");	
		return $arrproductos;
	}
	
	public static function BorrarProducto($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from productos WHERE id=:id");	
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL Borrarproducto(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarProducto($producto)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update productos 
				set codbarra=:codbarra,
				nombre=:nombre
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL Modificarproducto(:id,:codbarra,:nombre,:foto)");
			$consulta->bindValue(':id',$producto->id, PDO::PARAM_INT);
			$consulta->bindValue(':codbarra',$producto->codbarra, PDO::PARAM_INT);
			$consulta->bindValue(':nombre', $producto->nombre, PDO::PARAM_STR);	
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarProducto($producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into productos (codbarra,nombre)values(:codbarra,:nombre)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL Insertarproducto (:codbarra,:nombre,:dni,:foto)");
		$consulta->bindValue(':codbarra',$producto->codbarra, PDO::PARAM_INT);
		$consulta->bindValue(':nombre', $producto->nombre, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}
