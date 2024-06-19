// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.18;

contract propertyRegistration {
   //estructura para almacenar los contratos
  struct Property {
   uint256 id;
   string description;
   address owner;
  }

   //aca mapeamos el ID y detalles de la propiedad
   mapping (uint256 => Property) public properties;

   //contador de propiedades para asignar ID's unicos
   uint256 public propertyCount;

   //registrar una nueva proopiedad
   event PropertyRegistered(uint256 propertyId, string description, address owner);

   //Transferir una propiedad
   event PropertyTransferred(uint256 propertyId, address oldOwner, address newOwner);

   constructor() {
      //Inicializa el contador de propiedades
      propertyCount = 0;
   }

   //Registrar una nueva propiedad
   function registerProperty(string memory _description) public {
      uint256 propertyId = propertyCount;
      address owner = msg.sender;

      properties[propertyCount] = Property(propertyCount, _description, owner);
      emit PropertyRegistered(propertyId, _description, owner);
      propertyCount++;
   }

   //Transferir la propiedad
   function transferProperty(uint256 propertyId, address _newOwner) public {


      require(propertyId < propertyCount, 'Invalid property ID.');
      require(msg.sender == properties[propertyId].owner, 'Only the owner can transfer this property');

      address oldOwner = properties[propertyId].owner;
      properties[propertyId].owner = _newOwner;
      emit PropertyTransferred(propertyId, oldOwner, _newOwner);
   }

   //Consultar los detalles de una propiedad
   function getProperty(uint256 _propertyId) public view returns (uint256 propertyId, string memory description, address owner) {
      
      require(_propertyId < propertyCount, 'Invalid property ID.' );
      
      Property memory property = properties[_propertyId];
      return(property.id, property.description, property.owner);
   }

}
