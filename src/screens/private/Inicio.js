import { useFocusEffect } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Snackbar from 'react-native-snackbar-component';
import firebase from './../../database/firebase';

const Inicio = (props) => {
	const [snack, setSnack] = useState(false);

	/*
    Efecto qu actualice el título del Stack Navigator  
    desde los componentes Drawer Hijos
    Esto se tiene que actualizar cada vez aue cambiamos de Drawer.Screnn
     */
	useFocusEffect(() => {
		//Modificamos las opciones del HEader del Stack (padre)
		props.navigation.dangerouslyGetParent().setOptions({
			title: 'Inicio',
		});
	});

	/* Creamos un efecto (solo se ejecute al inicio)
    que nos permite ir por los datos del usuario 
    que ha iniciado sesión */
	useEffect(() => {
		/*
        Verificamos si tenemos info de algún usuario de manera
        local
        */
		const usuarioFirebase = firebase.auth.currentUser;

		/*
        Revisamos si el usuario no está validado
        */
		if (!usuarioFirebase.emailVerified) {
			setSnack(true);
		}
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Snackbar
				visible={snack}
				textMessage='Hola Snack'
				backgroundColor='#dc3545'
				textMessage='Cuenta sin verificar'
				actionText='Ok'
				actionHandler={() => {
					setSnack(false);
				}}
			/>
			<Text>En inicio</Text>
		</SafeAreaView>
	);
};

export default Inicio;
