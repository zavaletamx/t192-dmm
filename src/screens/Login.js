import React, { useState } from 'react';
import {
	Button,
	Image,
	Text,
	TextInput,
	View,
} from 'react-native';
import estilos from '../styles/estilos';
import Inicio from './Inicio';

/** Todos los componentes de React reciben como parámetro de inicio
 * las porpiedades indicadas por la instancia anterior
 */
const Login = (props) => {
	/* Las variables comunes (let,const,obj,etc) no son modificables dentro del render */
	/* Si necesitas modificar algun valor de la UI es necesario que utilices ESTADOS */

	/* 
    Los estados son variable enganchadas al VDOM que permiten su modificación por medio
    de una función (ya que los estados son de solo lectura).

    Para usar un estado utilizamo la libreria useState de React
    const [valor, setValor] = useState(_VALOR_INCIAL_);
    */

	let contador = 0;
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Image
				source={require('./../../assets/images/login.png')}
				style={estilos.imgLogin}
			/>

			<Text style={estilos.titulo}>
				Iniciar sesión
			</Text>

			<TextInput
				placeholder='Teléfono'
				keyboardType='phone-pad'
				maxLength={10}
				style={estilos.input}
			/>

			<TextInput
				placeholder='Pin (6 dígitos)'
				keyboardType='number-pad'
				secureTextEntry
				maxLength={6}
				style={estilos.input}
			/>

			<Button title='Continuar' />
			<Button
				title='¿No tienes una cuenta?, registrate aquí'
				onPress={() => {
					props.navigation.navigate('Registro');
				}}
			/>

			<Image
				source={require('./../../assets/images/login.png')}
				style={{
					...estilos.imgLogin,
					backgroundColor: 'orange',
				}}
			/>
		</View>
	);
};

export default Login;
