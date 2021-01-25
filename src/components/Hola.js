import React from 'react';
import {
	Button,
	Platform,
	Text,
	TextInput,
} from 'react-native';
import estilos from '../styles/estilos';
import { Espacios } from '../../App.back.intro_componentes';

const Hola = () => {
	return (
		<>
			<Text style={estilos.subtitulos}>Nombre:</Text>
			<TextInput
				placeholder='Nombre'
				style={estilos.input}
				keyboardType='default'
			/>

			{/** React utiliza funciones anónimas en su
			 * forma de Aroow Function para trabajar con
			 * los eventos
			 */}
			<Button
				title='Hola'
				onPress={() => {
					console.log('Me dieron click');
				}}
			/>

			{/** Agregamos un espacio adicional al final, SOLO
			 * para Android
			 */}
			{Platform.OS === 'android' ? (
				<Espacios />
			) : null}
		</>
	);
};

export default Hola;
