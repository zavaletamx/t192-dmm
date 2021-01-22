import React from 'react';
import { Button, Text } from 'react-native';
import estilos from '../styles/estilos';

const MiComponenteAF = () => {
	/** Creamos una funcion flecha con
	 * el comportamiento del clic
	 */
	const accionClick = () => {
		console.log('Me dieron click desde una AF');
	};

	return (
		<>
			<Button title='Boton 4' />
			<Button title='Boton 5' onPress={accionClick} />
		</>
	);
};

export const OtraAF = () => {
	return (
		<>
			<Text style={estilos.subtitulos}>
				Hola dese Otra AF
			</Text>
		</>
	);
};

export default MiComponenteAF;
