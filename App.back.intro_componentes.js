import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Hola from './src/components/Hola';
/*
Platform es una librería de React que te permite  identificar en que plataforma está
corriendo el código fuente y definir algun cambio único para cada plataforma
*/

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
export const Espacios = () => {
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
		<ScrollView>
			<View style={styles.container}>
				{/*
            margin-top marginTop
            margin-left marginLeft
            text-size textSize
            */}
				<Text
					style={{
						paddingTop:
							Platform.OS === 'ios' ? 50 : 20,
						fontSize: 30,
						fontWeight: 'bold',
						/*Azul = Android Blanco = Apple*/
						color:
							Platform.OS === 'ios'
								? '#fff'
								: '#0000FF',
						/*Rojo = Android Negro = Apple*/
						backgroundColor:
							Platform.OS === 'android'
								? '#FF0000'
								: '#000',
						padding: 20,
						width: '100%',
						textAlign: 'center',
						marginBottom: 30,
					}}
				>
					Hola Mundo
				</Text>

				<Text style={styles.subtitulos}>
					Subtítulo
				</Text>
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

				<Espacios />

				<Hola />

				<StatusBar style='auto' />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	subtitulos: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFF',
		backgroundColor: '#000',
		padding: 10,
		width: '100%',
		textAlign: 'center',
	},
});
