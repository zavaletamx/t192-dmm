import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
//Import DEvice para saber sii es tablet
import * as Device from 'expo-device';
import Inicio from './Inicio';
import Perfil from './Perfil';
import Catalogo from './Catalogo';
import Rentas from './Rentas';
import CerrarSesion from './CerrarSesion';

/*
Para crear un Drawer necesitamos una constante 
donde guardaremos las referencias a cada item del 
contenido de Screens
*/
const Drawer = createDrawerNavigator();

const Home = (props) => {
	return (
		/** Creamos un contenedor de los items del Drawer */
		<Drawer.Navigator
			initialRouteName='Inicio'
			drawerType='front'
		>
			{/** Por cada item que necesite en el Drawer
			 * agrego un Screen
			 */}
			<Drawer.Screen
				name='Inicio'
				component={Inicio}
			/>

			<Drawer.Screen
				name='Perfil'
				component={Perfil}
			/>

			<Drawer.Screen
				name='Catalogo'
				component={Catalogo}
			/>

			<Drawer.Screen
				name='Rentas'
				component={Rentas}
			/>

			<Drawer.Screen
				name='CerrarSesion'
				component={CerrarSesion}
			/>
		</Drawer.Navigator>
	);
};

export default Home;
