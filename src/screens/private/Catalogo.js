import { useFocusEffect } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
	SafeAreaView,
	FlatList,
	View,
	Text,
	ImageBackground,
} from 'react-native';
import firebase from './../../database/firebase';

const Catalogo = (props) => {
	const [pelis, setPelis] = useState([]);

	useFocusEffect(() => {
		props.navigation.dangerouslyGetParent().setOptions({
			title: 'Catálogo',
		});
	});

	/**
	 * Efecto sin enganchar para mostrar la lista de películas
	 * en la coleccion peliculas
	 */
	useEffect(() => {
		/**
		 * Un snapshot es una fotografía, una copia instantanea
		 * de la versión actual de la base de datos que se
		 * modifica en tiempo real de manera automatica
		 */
		firebase.db
			.collection('peliculas')
			.onSnapshot((querySnapshot) => {
				/**
				 * querySnapshot contiene un arreglo
				 * con todos los documentos de la colección
				 *
				 * Recorrer el arreglo de docs
				 * para poder acceder a cada elementos de manera
				 * individual
				 */
				const arrPelis = [];
				querySnapshot.docs.map((doc) => {
					/**
					 * Los datos de cada documento se almacenan en
					 * la funcion data()
					 *
					 * El id es una porpiedad
					 */
					arrPelis.push({
						...doc.data(),
						id: doc.id,
					});
				});
				setPelis(arrPelis);
			});
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FlatList
				style={{ margin: 15 }}
				data={pelis}
				keyExtractor={(item) => item.id}
				renderItem={(item) => (
					<View
						style={{
							borderColor: '#000',
							borderWidth: 1,
							paddingVertical: 10,
							paddingHorizontal: 20,
							marginVertical: 10,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text>{item.item.titulo}</Text>
						<ImageBackground
							source={{
								uri: item.item.poster,
							}}
							blurRadius={0}
							resizeMode='contain'
							style={{
								width: 200,
								height: 200,
							}}
						/>
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

export default Catalogo;
