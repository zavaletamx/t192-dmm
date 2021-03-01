import React, { useEffect } from 'react';

import Login from './src/screens/Login';
import Inicio from './src/screens/Inicio';
import Registro from './src/screens/Registro';

/**
 * Para crear un esquema de navegación en React, necesitamos:
 * 1.- NavigationContainer (uno por App)
 * 2.- Selecciona un tipo de navegación como contenedor de los
 *      componente visuales (Screens)
 * 3.- Agregar cada Screen al tipo de navegación con un sobrenombre
 * 4.- Disfrutar de su navegación
 */

//1.-
import { NavigationContainer } from '@react-navigation/native';

//2.-
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/private/Home';
import { LogBox } from 'react-native';

//2.1.-
const Stack = createStackNavigator();

export default function App() {
	/**
	 * Hook al inicio que indique para toda la app
	 * aue no se muestre mas el m ensaje de warning para 'NativeDriver'
	 */
	useEffect(() => {
		/**
		 * Inidicamos los tipos de arning que queremos  dejar de visualizar
		 */
		//TODOS
		//LogBox.ignoreAllLogs();
		//Solo algunos warning (Arreglo de los warnings a dejar de mostrar)
		LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
	}, []);

	/**
	 * Creamos en App.js un enrutador de las pantallas navegables
	 * de la app por medio d eun Screen
	 *
	 */
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Inicio'
				headerMode='float'
			>
				{/** 3.- Indicamos todas las Screens relacionadas */}

				<Stack.Screen
					name='Login'
					component={Login}
				/>

				<Stack.Screen
					name='Inicio'
					component={Inicio}
				/>

				<Stack.Screen
					name='Registro'
					component={Registro}
				/>

				<Stack.Screen
					name='Home'
					component={Home}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
