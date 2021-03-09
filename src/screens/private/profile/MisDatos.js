import React, { useEffect, useState } from 'react';
import {
	Button,
	ImageBackground,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ScrollView,
	Alert,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import firebase from './../../../database/firebase';
import estilos from './../../../styles/estilos';
import ProgressDialog from '../../../components/ProgressDialog';
import Snack from 'react-native-snackbar-component';
import AppModal from '../../../components/AppModal';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const MisDatos = (props) => {
	const [usuarioFirebase, setUsuarioFirebase] = useState(
		{}
	);
	const [docUsuario, setDocUsuario] = useState({});
	const [loading, setLoading] = useState(true);
	const [snackUpdate, setSnackUpdate] = useState(false);
	const [snackError, setSnackError] = useState(false);
	const [modalImg, setModalImg] = useState(false);

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

	/**
	 * Creamos una constante para tomar una imagen desde
	 * la galería
	 * (Image Gallery - Android)
	 * (Camera Roll - iOS)
	 *
	 * 0.- Importar librería ImagePicker y todos sus componentes
	 * 1.- Pedir permiso para acceder a la mutimedia
	 * 2.- Indicar el tipo de multimedia que necesitamos (photo/video/all)
	 * 3.- Indicar si se podrá editar la imagen
	 * 4.- Indicar la relación de aspecto
	 */
	const getImagenGaleria = async () => {
		/**
		 * Preguntamos por el permiso para acceder a
		 * los elementos multimedia de la galería
		 */
		const {
			status,
		} = await ImagePicker.requestMediaLibraryPermissionsAsync();

		/**
		 * Si el usuario nos da permiso de ingresar a su galería
		 * Mostramos todas sus fotos y esperamos que seleccione una
		 */
		if (status === 'granted') {
			const imgGaleria = await ImagePicker.launchImageLibraryAsync(
				{
					mediaTypes:
						ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 4],
					quality: 1,
				}
			);

			/* agregar la url de la imgen al state docUsuario */
			setDocUsuario({
				...docUsuario,
				['avatar']: imgGaleria.uri,
			});

			/**
			 * Ocultar modal de selección de fotos
			 */
			setModalImg(false);

			/**
			 * Mostramos loader
			 */
			setLoading(true);

			/**
			 * Subir la foto a firebase storage
			 * NOTA: asegurate de implementar storage desde el archivo firebase.js
			 *
			 * Para subir archivos a firebase es necesario crear un objeto Blob dentro
			 * de un elemento File
			 */
			const blob = await (
				await fetch(imgGaleria.uri)
			).blob();

			/**
			 * File tiene tres parámetris
			 * 1.- contenido binario
			 * 2.- nombre del archivo
			 * 3.- config del archivo (tipo de archivo)
			 */
			const file = new File(
				[blob],
				`${docUsuario.id}.jpg`,
				{ type: 'image/jpeg' }
			);

			blob.close();

			/**
			 * Con el archivo creado, podemos subirlo al storage
			 *
			 * Acerce de firebase Storage
			 *
			 * la referencia a storage se posiciona en la raíz del contenedor
			 *
			 * ref() --------- referencia al contenedor (bucket)
			 * child() ------- referencia a un componente dentro de
			 *                 la referencia del contenedor
			 * put() --------- Crea un nuevo archivo a partrio de un blob/file
			 */
			try {
				const subida = await firebase.storage
					.ref()
					.child('images')
					.child(file.name)
					.put(file, { contentType: file.type });

				/** si la subida es exitosa */
				if (subida.state === 'success') {
					/** Solicitar la url de la imagen */
					const urlAvatar = await subida.ref.getDownloadURL();

					/* actualizamos los datos de la colección para agregar la imagen 
                    al documento del usuario */
					await firebase.db
						.collection('usuarios')
						.doc(docUsuario.id)
						.update({ avatar: urlAvatar });

					/* Snack que indique los cambios */
					setLoading(false);
					setSnackUpdate(true);
				}
			} catch (e) {
				setLoading(false);
				setSnackError(true);
				console.log(e.toString());
			}
		}
	};

	/**
	 * Funcion para tomarnos una foto
	 */
	const getFotoCamara = async () => {
		/**
		 * Para usar la camara necesitamos dos permisos
		 * 1.- Acceso a la camara
		 * 2.- Acceso a lagalería del dispositivo
		 */
		const permisoCamara = await Permissions.askAsync(
			Permissions.CAMERA
		);

		const permisoGaleria = await Permissions.askAsync(
			Permissions.MEDIA_LIBRARY
		);

		/**
		 * Si obtenemos los permisos
		 */
		if (
			permisoCamara.status === 'granted' &&
			permisoGaleria.status === 'granted'
		) {
			/**
			 * --Mismo procedimiento que tomar imagen de la galeria
			 */
			const imgCamara = await ImagePicker.launchCameraAsync(
				{
					mediaTypes:
						ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 4],
					quality: 1,
				}
			);

			/**
			 * Mostrar la imagen seleccionada en el perfil
			 */
			setDocUsuario({
				...docUsuario,
				['avatar']: imgCamara.uri,
			});

			setModalImg(false);
		} else {
			/* si nos dieron permiso */
			Alert.alert(
				'ERROR',
				'para continuar permite el uso de la camara y tu galería',
				[
					{
						text: 'Continuar',
						onPress: () => setModalImg(false),
					},
				]
			);
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

			{modalImg ? (
				<AppModal
					show={modalImg}
					layerBgColor='#333'
					layerBgOpacity={0.5}
					modalBgColor='#fff'
					modalOpacity={1}
					modalContent={
						<View>
							<Text
								style={{
									alignSelf: 'center',
									marginBottom: 20,
									fontSize: 20,
									fontWeight: '500',
								}}
							>
								<FontAwesome5
									name='camera-retro'
									size={20}
								/>{' '}
								Actualizar foto de perfíl
							</Text>
							<Button
								title='Tomar foto'
								onPress={getFotoCamara}
							/>

							{Platform.OS === 'android' ? (
								<View
									style={{
										marginVertical: 10,
									}}
								/>
							) : null}

							<Button
								title='Galería'
								onPress={getImagenGaleria}
							/>

							{Platform.OS === 'android' ? (
								<View
									style={{
										marginVertical: 10,
									}}
								/>
							) : null}

							<Button
								title='Cancelar'
								color='red'
								onPress={() =>
									setModalImg(false)
								}
							/>
						</View>
					}
				/>
			) : null}

			{/**
			 * Si loading es verdadero, mostramos la modal
			 */}

			{loading ? <ProgressDialog /> : null}

			<ScrollView>
				<TouchableOpacity
					onPress={() => setModalImg(true)}
				>
					<ImageBackground
						/** Evaluamos si el usuario tiene una imgen de perfil guardada
						 * en su doc de firestore de lo contrario mostramos la imgen
						 * defecto de perfil
						 */
						source={
							typeof docUsuario.avatar !==
							'undefined'
								? { uri: docUsuario.avatar }
								: require('./../../../../assets/images/image_placeholder.png')
						}
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
