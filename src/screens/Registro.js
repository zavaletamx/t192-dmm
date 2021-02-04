import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

export default class Registro extends Component {
	/* Para generar estados en una clase, debemos incializar el objeto global state 
    dentro del constructor al igual que las propiedades */
	constructor(props) {
		super(props);
		/*Para llamar a las props utilizamos 
        this.props*/

		/*
        Las clases tiene un atributo tipo objeto reservado que se llama state
        y aqui debmos guardar todas las variables de estado que sean necesarias
        */
	} // /Constructor

	render() {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text>En Registro.js</Text>
			</View>
		);
	}
}
