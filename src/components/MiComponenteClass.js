import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import estilos from '../styles/estilos';

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
				<Text style={estilos.subtitulos}>
					Desde otra clase
				</Text>
			</View>
		);
	}
}
