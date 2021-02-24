import React, { useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	Button,
	Image,
	Text,
	TextInput,
	View,
} from 'react-native';
import firebase from './../database/firebase';
import estilos from '../styles/estilos';
import get_error from '../helpers/errores_es_mx';

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
	const [telefono, setTelefono] = useState(
		'raul.zavaletazea@gmail.com'
	);
	const [pin, setPin] = useState('123456');
	/**
	 * States para mostrar/ociultar spinner
	 */
	const [btnVisible, setBtnVisible] = useState(true);
	const [aiVisible, setAiVisible] = useState(false);

	/**
	 * State para habilitar/deshabilitar textInput's
	 */
	const [tiHab, setTiHab] = useState(true);

	/**
	 * Funcion que valida el formulario
	 */
	const validaLogin = async () => {
		//Validamos telefono (10 dígitos)
		if (telefono.length < 5) {
			Alert.alert(
				'ERROR',
				'Teléfono incorrecto',
				[
					{
						text: 'Corregir',
						onPress: () => {
							setTelefono('');
						},
					},
				],
				{ cancelable: false }
			);

			//Terminamos la fn
			return;
		}

		if (pin.length !== 6) {
			Alert.alert(
				'ERROR',
				'Pin incorrecto',
				[
					{
						text: 'Corregir',
						onPress: () => {
							setPin('');
						},
					},
				],
				{ cancelable: false }
			);

			return;
		}

		/**
		 * Si la validación es correcta llegamos
		 * aqui
		 */
		setAiVisible(true);
		setBtnVisible(false);
		setTiHab(false);

		try {
			const usuarioFirebase = await firebase.auth.signInWithEmailAndPassword(
				telefono,
				pin
			);

			let mensaje = `Bienvenido ${usuarioFirebase.user.email}\n`;
			mensaje += usuarioFirebase.user.emailVerified
				? '***Usuario verificado***'
				: 'xxx Por favor valida tu cuenta xxx';

			Alert.alert('Hola de nuevo', mensaje, [
				{
					text: 'Ingresar',
					onPress: () => {
						setAiVisible(false);
						setBtnVisible(true);
						setTiHab(true);
						props.navigation.navigate('Home');
					},
				},
			]);
		} catch (e) {
			Alert.alert('ERROR', get_error(e.code), [
				{
					text: 'Corregir',
					onPress: () => {
						setAiVisible(false);
						setBtnVisible(true);
						setTiHab(true);
					},
				},
			]);
		}

		//Despues de 1.5 segundos, habilitar todo
		//y direccionamos a home
		// setTimeout(() => {
		// 	setAiVisible(false);
		// 	setBtnVisible(true);
		// 	setTiHab(true);
		// 	props.navigation.navigate('Home');
		// }, 500);
	};

	const ejemploAlert = () => {
		Alert.alert(
			//P1 ==== Título
			'TITULO',
			//P2 ==== Mensaje
			'MENSAJE',
			//P3 ==== Arreglo de botones (Android MAX 3, iOS ILIMITADO)
			[
				//Neutral
				{
					text: 'Neutral',
					onPress: null,
				},
				//Negative BUTTON
				{
					text: 'Negative',
					onPress: null,
					style: 'destructive',
				},
				//NEUTRAL BUTTON
				{
					text: 'Positive',
					onPress: null,
				},
			],
			//P4 ===== CONFIG
			{ cancelable: false }
		);
	};

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
				placeholder='E-mail'
				keyboardType='email-address'
				maxLength={70}
				style={estilos.input}
				onChangeText={(val) => setTelefono(val)}
				value={telefono}
				editable={tiHab}
			/>

			<TextInput
				placeholder='Pin (6 dígitos)'
				keyboardType='number-pad'
				secureTextEntry
				maxLength={6}
				style={estilos.input}
				onChangeText={(val) => setPin(val)}
				value={pin}
				editable={tiHab}
			/>

			<ActivityIndicator
				color='#000'
				size='large'
				style={{
					display: aiVisible ? 'flex' : 'none',
				}}
			/>

			<View
				style={{
					display: btnVisible ? 'flex' : 'none',
				}}
			>
				<Button
					title='Continuar'
					onPress={validaLogin}
				/>
			</View>

			<Button
				title='¿No tienes una cuenta?, registrate aquí'
				onPress={() => {
					props.navigation.navigate('Registro');
				}}
			/>
		</View>
	);
};

export default Login;
