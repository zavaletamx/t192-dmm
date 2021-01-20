import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MiComponenteAF, {
	OtraAF,
} from './src/components/MiComponenteAF';
import MiComponenteClass, {
	OtraClase,
} from './src/components/MiComponenteClass';

/*
Componentes  en React
Simple Components 
Es una sección de código (UI) (Fragment, item)

Screen Components 
UI completa, presentación de la aplicación

Functional Components
Sección de código que se conectan a una librería 
o generan alguna funcionalidad

Los componentes pueden crearse de 3 formas dsitintas
    + Constantes (Arrow Function)
    + Funciones
    + Clases
*/

//Importamos nuestro componente
//import MODULO* from './RUTA_RELATIVA'
//* Los modulo puedne tener export default o no
//Si se trata del expor default, solo nombramos al componente
//Si no es export default, indicamos entre llaves
import MiComponenteFn, {
	OtroComponente,
} from './src/components/MiComponenteFn';

/**
 * Componente que genera espacios
 * por medio de vistas
 */
const Espacios = () => {
	return (
		<>
			<View>
				{/** Espacio en blanco */}
				<Text>{'    '}</Text>
			</View>
			<View>
				{/** Espacio en blanco */}
				<Text>{'    '}</Text>
			</View>
			<View>
				{/** Espacio en blanco */}
				<Text>{'    '}</Text>
			</View>
		</>
	);
};

export default function App() {
	return (
		<View style={styles.container}>
			<Text>Hola Mundo</Text>
			{/*Agregamos nuestro componente*/}

			<Espacios />

			<MiComponenteFn />
			<OtroComponente />

			<Espacios />

			<MiComponenteClass />
			<OtraClase />

			<Espacios />

			<MiComponenteAF />
			<OtraAF />

			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
