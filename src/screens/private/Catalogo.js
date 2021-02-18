import { useFocusEffect } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
	FlatList,
	RefreshControl,
	View,
} from 'react-native';
import Usuario from '../../components/Usuario';

const Catalogo = (props) => {
	//Estado que guarde el arreglo de objetos de laista de usuarios
	const [usuarios, setUsuarios] = useState([]);
	const [rcVisible, setRcVisible] = useState(true);

	useFocusEffect(() => {
		//Modificamos las opciones del Header del Stack (padre)
		props.navigation.dangerouslyGetParent().setOptions({
			title: 'Catálogo',
		});
	});

	/**
	 * JS permite generar peticiones asíncronas (Thread/Hilos)
	 * Permitiendo optimizar el tiempo de carga y espera de
	 * dichas funciones
	 *
	 * Promise (Promesa)
	 * Son peticion que esperan regresar algo, pero no es
	 * seguro qeu así sea
	 *
	 * Las promesas tiene la particularidad de poder esperar una
	 * respuesta sin hacer que todo el programa espere con ellas
	 *
	 * Los CallBack son funciones que se ejecutan al finalizar
	 * cierta acción
	 *
	 * Para usar una Promesa/Promise existen dos formas:
	 * 1.- fetch con callback
	 * 2.- funciones asíncronas
	 * 3.- *Instancia de tipo Promise
	 */

	//Tomar el cotenido del servicio de lista de usuarios
	//por medio de un callback
	const getUsuariosCallBack = () => {
		//Invocar por medio de fetch la url
		//fetch es el quivalente a ajax.url
		fetch('https://reqres.in/api/users?per_page=12')
			//Llamamos al callback despues de ir a la URL
			.then((response) => response.json())
			//Esperamos a que se obtenga la respuesta json
			.then((json) => {
				//Arreglo para guardar todos los datos de los usuarios
				const arrUsuarios = [];

				//Recorrer el arreglo data para extraer todos los usuarios
				json.data.map((usuario) => {
					//Guardamos cada usuario en mi arreglo
					arrUsuarios.push({
						...usuario,
						edad: 24,
					});
				});

				//Pasamos el arreglo de usuarios al estado
				setUsuarios(arrUsuarios);
			})
			.catch((e) => console.error(e));
	};

	/**
	 * Creamos una función asíncrona para tomar la lista de usuarios
	 */
	// const getUsuariosAsync = async function () { }
	// async function getUsuariosAsync() { }
	const getUsuariosAsync = async () => {
		//La palabra reservada await indica que el contenido de
		//una variable/constante está en espera de ser recibido
		//cumple la misma función que await (Pero no es callback)
		try {
			const response = await fetch(
				'https://reqres.in/api/users?per_page=12'
			);
			const json = await response.json();

			setUsuarios(json.data);
			setRcVisible(false);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * Creamos un efecto que no esté enganchado a ningún componente
	 * (Solo se ejecute al inicio de la Screen)
	 */
	useEffect(() => {
		//Invocar al servicio de lista de usuarios
		//getUsuariosCallBack();

		setTimeout(() => {
			getUsuariosAsync();
		}, 3000);
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				style={{ margin: 15 }}
				//Indicar el estado de carga
				refreshControl={
					<RefreshControl
						refreshing={rcVisible}
					/>
				}
				data={usuarios}
				renderItem={(item) => (
					<Usuario datosUsuario={item.item} />
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
};

export default Catalogo;
