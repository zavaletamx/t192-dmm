import React, { useEffect, useState } from 'react';
import {
	ImageBackground,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from './../../../database/firebase';

const MisDatos = (props) => {
	const [usuarioFirebase, setUsuarioFirebase] = useState(
		{}
	);
	const [docUsuario, setDocUsuario] = useState({});

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
		getDocUsuario(usuarioFirebase.uid);
	});

	/**
	 * Función flecha que ejecuta una consulta sobre la colección
	 * usuarios
	 */
	const getDocUsuario = async (uid) => {
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
			console.log(snapshot.data());
		}
	};

	return (
		/**
		 * SafeAreaView calcula el espacio donde el texto
		 * no se visualiza y lo recorre
		 */
		<SafeAreaView style={{ flex: 1 }}>
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
			</ScrollView>
		</SafeAreaView>
	);
};

export default MisDatos;
