import React, { useEffect, useState } from 'react';
import {
	ImageBackground,
	SafeAreaView,
	ScrollView,
	Text,
	View,
	TextInput,
	Button,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from './../../../database/firebase';
import estilos from './../../../styles/estilos';
import ProgressDialog from '../../../components/ProgressDialog';
import Snack from 'react-native-snackbar-component';

const MisDatos = (props) => {
	const [usuarioFirebase, setUsuarioFirebase] = useState(
		{}
	);
	const [docUsuario, setDocUsuario] = useState({});
	const [loading, setLoading] = useState(true);
	const [snackUpdate, setSnackUpdate] = useState(false);
	const [snackError, setSnackError] = useState(false);

	/**
	 * Creamos un hook que nos permita conectar al cargarse el screen
	 * con los datos de dicho usuario desde la colección usuaio
	 *
	 * No se debe convertir un efectoen una fn asincrona, si es necesario
	 * usar un hook y una promesa, se debe crear una función dentro del hook
	 * o bien crear una funcion flecha e invocarla en el hook
	 */
	useEffect(() => {
		/* tomamos los datos del usuario que ha iniciado sesión */
		setUsuarioFirebase(firebase.auth.currentUser);

		/* invocamos la consulta */
		getDocUsuario(firebase.auth.currentUser.uid);
	}, []);

	/**
	 * Función flecha que ejecuta una consulta sobre la colección
	 * usuarios
	 */
	const getDocUsuario = async (uid) => {
		try {
			const query = await firebase.db
				.collection('usuarios')
				/**
				 * Where usa 3 parámetros
				 * 1.- Clave a comparar (campo en la tabla)
				 * 2.- Tipo de condición (leer documentación)
				 * 3.- Valor de la condición
				 */
				.where('authId', '==', uid)
				.get();

			/**
			 * Si la consulta no esta vacía
			 */
			if (!query.empty) {
				/**
				 * query contiene un snapshot llamado docs
				 * y es una arreglo con todos los documentos
				 * de la consulta
				 */
				/* cuando esperamos varios registros en una consulta recorremos a doc */
				// query.docs.forEach((doc) => {
				// 	console.log(doc.data());
				// });

				/* cuando esperamos solo un registro */
				const snapshot = query.docs[0];

				setDocUsuario({
					...snapshot.data(),
					id: snapshot.id,
				});

				setLoading(false);
			}
		} catch (e) {
			console.warn(e.toString());
		}
	};

	return (
		/**
		 * SafeAreaView calcula el espacio donde el texto
		 * no se visualiza y lo recorre
		 */
		<SafeAreaView style={{ flex: 1 }}>
			<Snack
				textMessage='Datos actualizados'
				messageColor='#fff'
				backgroundColor='#376e37'
				actionText='Entendido'
				accentColor='#5cb85c'
				actionHandler={() => setSnackUpdate(false)}
				visible={snackUpdate}
			/>

			<Snack
				textMessage='Ocurrió un error'
				messageColor='#fff'
				backgroundColor='red'
				actionText='Entendido'
				accentColor='#fff'
				actionHandler={() => setSnackError(false)}
				visible={snackError}
			/>

			{/**
			 * Si loading es verdadero, mostramos la modal
			 */}

			{loading ? <ProgressDialog /> : null}

			<ScrollView>
				<TouchableOpacity>
					<ImageBackground
						source={require('./../../../../assets/images/image_placeholder.png')}
						style={{
							width: 200,
							height: 200,
							alignSelf: 'center',
							marginVertical: 15,
							borderRadius: 25,
							overflow: 'hidden',
						}}
					>
						<Text
							style={{
								backgroundColor: '#000',
								color: '#fff',
								width: '100%',
								paddingBottom: 20,
								paddingTop: 10,
								textAlign: 'center',
								opacity: 0.6,
								position: 'absolute',
								bottom: 0,
							}}
						>
							<FontAwesome5
								name='camera'
								color='#fff'
							/>{' '}
							Cambiar imagen
						</Text>
					</ImageBackground>
				</TouchableOpacity>

				<View style={{ margin: 10, flex: 1 }}>
					<TextInput
						style={estilos.input}
						placeholder='Nombre'
						keyboardType='default'
						value={docUsuario.nombre}
						onChangeText={(val) =>
							setDocUsuario({
								...docUsuario,
								['nombre']: val,
							})
						}
					/>

					<TextInput
						style={estilos.input}
						placeholder='Apellido 1'
						keyboardType='default'
						value={docUsuario.apellido1}
						onChangeText={(val) =>
							setDocUsuario({
								...docUsuario,
								['apellido1']: val,
							})
						}
					/>

					<TextInput
						style={estilos.input}
						placeholder='Apellido 2'
						keyboardType='default'
						value={docUsuario.apellido2}
						onChangeText={(val) =>
							setDocUsuario({
								...docUsuario,
								['apellido2']: val,
							})
						}
					/>

					<TextInput
						style={estilos.input}
						placeholder='Correo electrónico'
						keyboardType='email-address'
						value={usuarioFirebase.email}
						editable={false}
					/>

					<Button
						title='Guardar cambios'
						onPress={async () => {
							setLoading(true);

							/**
							 * Existen dos tipos de edicion de datos en
							 * FireStore
							 *
							 * 1.- update (constructivo)
							 *      Solo se editan los campos indicados
							 *      y los demás se respetan
							 * 2.- set (destructivo)
							 *      Solo se editan los campos indicados
							 *      y los demás se eliminan
							 */
							try {
								//Seleccionamos de toda la coleccion
								//solo el elemento del id de ese
								//documento
								await firebase.db
									.collection('usuarios')
									.doc(docUsuario.id)
									.update({
										nombre:
											docUsuario.nombre,
										apellido1:
											docUsuario.apellido1,
										apellido2:
											docUsuario.apellido2,
									});
								setLoading(false);
								setSnackUpdate(true);
							} catch (e) {
								setLoading(false);
								setSnackError(true);
							}
						}}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MisDatos;
