import { useFocusEffect } from '@react-navigation/core';
import React from 'react';
import { Text, View } from 'react-native';

const Catalogo = (props) => {
	useFocusEffect(() => {
		//Modificamos las opciones del HEader del Stack (padre)
		props.navigation.dangerouslyGetParent().setOptions({
			title: 'Catálogo',
		});
	});

	return (
		<View>
			<Text>Catalogo.js</Text>
		</View>
	);
};

export default Catalogo;
