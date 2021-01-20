import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

//Heredar de la clase Componet
export default class MiComponenteClass extends Component {
	/*
    Las clases de componente de  React retornan el contenido
    por mediop dle metodo render
    */
	render() {
		return (
			<>
				<Button title='Boton 2 (Clase)' />
				<Button title='Boton 3 (Clase)' />
			</>
		);
	}
}

export class OtraClase extends Component {
	render() {
		return (
			<View>
				<Text>Desde otra clase</Text>
			</View>
		);
	}
}
