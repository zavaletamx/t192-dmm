import React from 'react';
import {
	Image,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Zocial } from '@expo/vector-icons';

const App = () => {
	return (
		<View style={estilos.contendor}>
			<View
				style={[
					estilos.contendor,
					{
						backgroundColor: '#424499',
						alignItems: 'center',
						justifyContent: 'center',
					},
				]}
			>
				{/**
				 * Ejemplo d eimagen con recurso local
				 * source={require('./assets/favicon.png')}
				 * */}
				<Image
					source={{
						uri:
							'https://i.pinimg.com/originals/87/06/af/8706af8cd8bc876fe3d5da0d3fc15cd3.png',
					}}
					style={{
						width: 150,
						height: 150,
						resizeMode: 'center',
						borderRadius: 150,
					}}
				/>

				<Text
					style={{
						fontSize: 24,
						marginVertical: 20,
						color: '#FDF0FF',
						textDecorationLine: 'underline',
					}}
				>
					Profe y Desarrollador
				</Text>

				<View style={estilos.contenedorContacto}>
					<Text
						style={[
							estilos.contendor,
							estilos.textoContacto,
						]}
					>
						<Zocial name='email' size={16} />
						{'  '}
						raul@zavaletazea.dev
					</Text>
					<Text
						style={[
							estilos.contendor,
							estilos.textoContacto,
							{ textAlign: 'right' },
						]}
					>
						<Zocial name='call' size='16' />
						{'  '}
						204 8329
					</Text>
				</View>
			</View>

			{/**SECCION INFERIOR */}
			<View
				style={[
					estilos.contendor,
					estilos.contendorInf,
				]}
			></View>
		</View>
	);
};

const estilos = StyleSheet.create({
	contendor: {
		flex: 1,
	},
	contendorInf: {
		backgroundColor: '#FDF0FF',
	},
	contenedorContacto: {
		flexDirection: 'row',
		width: '90%',
	},
	textoContacto: {
		color: '#FDF0FF',
		fontSize: 16,
	},
});

export default App;
