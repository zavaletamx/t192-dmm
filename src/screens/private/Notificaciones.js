import React, { useEffect, useRef, useState } from 'react';
import {
	Alert,
	Platform,
	SafeAreaView,
	Text,
} from 'react-native';

/*
Importamos las librerías para acceder a las notificacionesPUSH

LAS NOTIFICACIONES POER SERVICIO DE FCM Y APNS SOLO ESTÁN DISPONIBLES 
EN DISPOSITIVOS FÍSICOS (NO FUNCIONA EN EMULADORES/SIMULADORES)
*/
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

/* 
Implementar un handler (metodo que indique que hacer [interface])
cuando existan notificaciones nuevas
*/
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

const Notificaciones = (props) => {
	/*
    Los hooks son funciones que me permiten
    realizar operaciones especiales y manipular el 
    ciclo de vida de mi app (cuando inicia, cuando se actualiza, 
    cuando se minimiza,cuando se cierra, etc.).

    useState, useEffect, useLayoutEffect, useFocusEffect, etc.
    Los hooks arriba mencionados permiten realizar diversas acciones 
    y generan un cambio en o los valores de estado y componentes del 
    Screen y su jerarquía

    useReff es un Hook que permite generar contenido mutable (un cambio)
    no solo en su contenido, tambien en su estructura, useReff no genera
    nuevos elementos de un estado, usa una referencia al mismo
    */

	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef(); //recibir
	const responseListener = useRef(); //enviar

	/*
    Metodo que pida el permiso de enviar/recibir notificaciones
    push y suscribirse a dichas notificaciones
    */
	const registerForPushNotificationsAsync = async () => {
		let token; //Inicializamos un token vacío

		//Solo aplicamos las notificaciones a dispositivos físicos
		if (Constants.isDevice) {
			//Pedimos permiso
			const {
				status: existingEstatus,
			} = await Notifications.getPermissionsAsync();
			let finalStatus = existingEstatus;
			if (existingEstatus !== 'granted') {
				const {
					status,
				} = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			if (finalStatus !== 'granted') {
				Alert.alert(
					'ERROR',
					'Se requiere el permiso'
				);
				return;
			}

			//Tomamos el token  que nos genere el servicio
			token = (
				await Notifications.getExpoPushTokenAsync()
			).data;
			console.log(token);
		}

		//Si no estamos en un dispositivo real
		else {
			Alert.alert(
				'ERROR',
				'Notificaciones push sólo disponibles en dispositivos físicos'
			);
		}

		//Si el dispositivo es Android, indicar que usaremos
		//el canal de distribución estandar (default)
		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync(
				'default',
				{
					name: 'default',
					importance:
						Notifications.AndroidImportance.MAX,
					vibrationPattern: [0, 250, 250, 250],
					lightColor: '#FF231f7c',
				}
			);
		}

		return token;
	};

	/*Creamos una función que no está enganchada y solo se ejecuta 
    una vez, pero en el moento en el que esta Screen deje de ser 
    el foco principal, enviamos las notificaciones a segundo plano
    */
	useEffect(() => {
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		);

		notificationListener.current = Notifications.addNotificationReceivedListener(
			(notification) => setNotification(notification)
		);

		return () =>
			Notifications.removeNotificationSubscription(
				notificationListener
			);
	}, []);
	return (
		<SafeAreaView>
			<Text>Notificaciones.js</Text>
			<Text>{expoPushToken}</Text>
		</SafeAreaView>
	);
};

export default Notificaciones;
