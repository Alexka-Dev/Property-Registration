# Property Registration Smart Contract.


The goal of this Solidity smart contract is to facilitate the registration and transfer of ownership of digital assets. Users can register new properties on the blockchain and transfer them from one owner to another in a secure and transparent manner.

### Contract Structure.

The contract is designed with the following main functionalities:

- Register a New Property**: Allows users to register details of a new property, assigning it a unique identifier.
  
- Transfer Property**: Facilitates the transfer of ownership of a digital asset from the current owner to another user.
  
- Query Property Information**: Enables any user to retrieve specific details of a registered property, including its description and current owner.

### Additional Features:

- Access Restrictions**: Access controls are implemented to ensure that only the current owner can transfer a property, ensuring transaction integrity and security.

## Using the Contract.

1- Registering a New Property.

To register a new property, use the `registerProperty` function, which requires the property description as a parameter.

2- Transferring Property Ownership.

The `transferProperty` function allows for the transfer of ownership of an existing property to another user, provided that the sender is the current owner.

3- Querying Property Details.

By using the `getProperty` function, any user can query the details of a specific property by providing its unique identifier.

## License

This project is licensed under the GPL-3.0 License.

## Creator

This smart contract was created by Alexk-Dev.


