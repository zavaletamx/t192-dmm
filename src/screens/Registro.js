import React, { Component } from 'react';
import {
	ActivityIndicator,
	Alert,
	Button,
	Image,
	Text,
	View,
} from 'react-native';
import {
	RotationGestureHandler,
	TextInput,
} from 'react-native-gesture-handler';
import estilos from '../styles/estilos';

export default class Registro extends Component {
	/* Para generar estados en una clase, debemos incializar el objeto global state 
    dentro del constructor al igual que las propiedades */
	constructor(props) {
		super(props);
		/*Para llamar a las props utilizamos 
        this.props*/

		/*
        Las clases tiene un atributo tipo objeto reservado que se llama state
        y aqui debmos guardar todas las variables de estado que sean necesarias
        */
		this.state = {
			nombre: '',
			apellido1: '',
			apellido2: '',
			fechaNAcimiento: '',
			telefono: '',
			email: '',
			pin: '',
			terminos: false,
			aiVisible: false,
			btnVisible: true,
		};
	} // /Constructor

	/**
	 * Para crear un metodo en una clase, solo agregas el nombre seguido de los parámetros
	 * (Como crear una función sin la palabra function)
	 */
	metodoValidaRegistro(state) {
		if (this.state.nombre.length < 3) {
			Alert.alert('ERROR', 'Nombre incorrecto', [
				{
					text: 'Corregir',
					onPress: () =>
						this.setState({ nombre: '' }),
				},
			]);

			return;
		}
	}

	/**
	 * RENDER
	 */
	render() {
		const validaRegistro = () => {
			if (this.state.nombre.length < 3) {
				Alert.alert('ERROR', 'Nombre incorrecto', [
					{
						text: 'Corregir',
						onPress: () =>
							this.setState({ nombre: '' }),
					},
				]);

				return;
			}

			if (this.state.apellido1.length < 3) {
				Alert.alert(
					'ERROR',
					'Apellido 1 incorrecto',
					[
						{
							text: 'Corregir',
							onPress: () =>
								this.setState({
									apellido1: '',
								}),
						},
					]
				);

				return;
			}

			//Apellido 2 no es obligatorio, pero si se escribe debe tener mas de 3 caracteres
			if (
				this.state.apellido2.length > 0 &&
				this.state.apellido2.length < 3
			) {
				Alert.alert(
					'ERROR',
					'Apellido 2 incorrecto',
					[
						{
							text: 'Corregir',
							onPress: () =>
								this.setState({
									apellido2: '',
								}),
						},
					]
				);

				return;
			}

			//Si las validaciones son coreectas
			// this.setState({ aiVisible: true });
			// this.setState({ btnVisible: false });
			this.setState({
				aiVisible: true,
				btnVisible: false,
			});
		};

		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<View style={estilos.contenedorImgCircular}>
					<Image
						source={require('./../../assets/images/registro.png')}
						style={{
							...estilos.imgLogin,
							backgroundColor: '#000',
							borderRadius: 0,
						}}
					/>
				</View>

				<Text style={estilos.titulo}>Registro</Text>

				<TextInput
					style={estilos.input}
					placeholder='Nombre'
					keyboardType='default'
					value={this.state.nombre}
					onChangeText={(val) => {
						this.setState({ nombre: val });
					}}
				/>

				<View style={estilos.row}>
					<View style={estilos.col}>
						<TextInput
							style={{
								...estilos.input,
							}}
							placeholder='Apellido 1'
							keyboardType='default'
							value={this.state.apellido1}
							onChangeText={(val) => {
								this.setState({
									apellido1: val,
								});
							}}
						/>
					</View>

					<View style={estilos.col}>
						<TextInput
							style={{
								...estilos.input,
								alignSelf: 'flex-end',
							}}
							placeholder='Apellido 2'
							keyboardType='default'
							value={this.state.apellido2}
							onChangeText={(val) => {
								this.setState({
									apellido2: val,
								});
							}}
						/>
					</View>
				</View>

				<ActivityIndicator
					size='large'
					color='#000'
					style={{
						marginVertical: 10,
						display: this.state.aiVisible
							? 'flex'
							: 'none',
					}}
				/>

				<View
					style={{
						display: this.state.btnVisible
							? 'flex'
							: 'none',
					}}
				>
					<Button
						title='Registrarse'
						onPress={validaRegistro}
					/>
				</View>

				<Button
					title='¿Ya tienes una cuenta?, inicia sesión aquí'
					onPress={() => {
						this.props.navigation.navigate(
							'Login'
						);
					}}
				/>

				<Text> {'\n\n\n'}</Text>

				<Text>* Nombre</Text>
				<Text>* Apellido 1</Text>
				<Text>Apellido 2</Text>
				<Text>* Fecha de nacimiento</Text>
				<Text>* Teléfono</Text>
				<Text>* Email</Text>
				<Text>*Pin (6 dígitos)</Text>
				<Text>*Aceptar términos (Switch)</Text>
				<Text>Registrarse (Btn)</Text>
				<Text>Ir al Login (Btn)</Text>
			</View>
		);
	}
}
