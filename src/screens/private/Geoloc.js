import React, { useState } from 'react';
import {
	Alert,
	SafeAreaView,
	Text,
	View,
} from 'react-native';
import ProgressDialog from './../../components/ProgressDialog';

/*
Para mostrar un mapa con el proveedor defecto
usamos un componente de tipo MapView
desde react-native-maps
*/
import MapView, {
	Marker,
	Callout,
	PROVIDER_GOOGLE,
} from 'react-native-maps';

import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

/* Elementos de localización */
import * as Location from 'expo-location';
import { concat } from 'react-native-reanimated';

const marcadores = [
	/*{
		nombre: 'UTEQ',
		direccion:
			'Av. de la Union 2051, Unidad Nacional\nC.P. 76148, Querétaro, Querétaro, México',
		ubicacion: {
			latitude: 20.6540463,
			longitude: -100.4061927,
		},
	},
	{
		nombre: 'Los arcos de Querétaro',
		direccion:
			'Av. Los arcos, Col. Centro\nC.P. 76000, Querétaro, Querétaro, México',
		ubicacion: {
			latitude: 20.5969738,
			longitude: -100.3729799,
		},
	},*/
];

const Geoloc = (props) => {
	const [progress, setProgress] = useState(false);
	const [mapa, setMapa] = useState(null);

	const [home, setHome] = useState({
		ubicacion: {
			latitud: 20.6470656,
			longitud: -100.3403222,
		},
		nombre: (
			<Text>
				<MaterialIcons
					name='home'
					size={18}
					color='#000'
				/>{' '}
				Casa
			</Text>
		),
		direccion:
			'Av. Pie de la Cuesta\nC.P. 23100, Acapulco, Guerrero, México',
	});

	/*
    Función flecha que pida permiso de ir por la ubicación 
    (latitud y longitud del usuario)
    */
	const getUbicacion = async () => {
		setProgress(true);

		try {
			/*
            Pedimos el permiso de ubicación
            */
			const {
				status,
			} = await Location.requestPermissionsAsync();

			/*
            Si nos dieron el permiso
            */
			if (status === 'granted') {
				//Tomamos la ubicación del usuario
				const location = await Location.getCurrentPositionAsync(
					{
						accuracy: Location.Accuracy.Highest,
					}
				);

				/* Usamos una promesa para buscar las direcciones
                mas cercanas a las coordenadas geográficas enviadas

                Invocamos al metodo reverseGeocodeAsync
                coordenadas ------ dirección
                direccion -------- coordenadas
                */
				Location.reverseGeocodeAsync({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				})
					.then((address) => {
						//Tonar la primera direccion
						const direccion = address[0];
						console.log(direccion);

						setHome({
							ubicacion: {
								latitud:
									location.coords
										.latitude,
								longitud:
									location.coords
										.longitude,
							},
							nombre: (
								<Text>
									<MaterialIcons
										name='home'
										size={18}
										color='#000'
									/>{' '}
									Casa
								</Text>
							),
							direccion: `${direccion.street}, ${direccion.city}\nC.P. ${direccion.postalCode}, ${direccion.subregion}, ${direccion.region}. ${direccion.country}`,
						});
						setProgress(false);

						/* movemos el mapa a nuestra nueva ubicación */
						mapa.animateToRegion({
							latitude:
								location.coords.latitude,
							longitude:
								location.coords.longitude,
							latitudeDelta: 0.02,
							longitudeDelta: 0.02,
						});
					})
					.catch((e) =>
						console.log(e.toString())
					);
			} else {
				setProgress(false);
				Alert.alert(
					'ERROR',
					'PERMISO DE UBICACIÓN NECESARIO'
				);
			}
		} catch (e) {
			setProgress(false);
			console.log(e.toString());
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* 
            En este caso usamos un condicional ternario tradicional
            {progress === true ? <ProgressDialog /> : null} 
            */}

			{/* 
            Condicional ternario bajo el tipo de dato
            {progress ? <ProgressDialog /> : null} 
            */}
			{
				/*
                Condicional verdadero (solo nos interesa el caso TRUE)
                solo aplica si se ejecuta la condición de manera verdadera
                */
				progress && <ProgressDialog />
			}

			{/* 
            Coordenadas del punto d einicio
            20.6540463,-100.4061927,

            latitudDelta y longitudDelta representan el angulo de 
            curvatura de la tierra con respecto al plano cartesiano

            los valores delta van desde 1 hasta 0, siendo 1 
            lo mas alejado posible y 0 lo mas cercano
            */}
			<TouchableOpacity
				onPress={getUbicacion}
				style={{
					flex: 2,
					backgroundColor: '#000',
					paddingHorizontal: 20,
					paddingVertical: 10,
				}}
			>
				<Text>
					<MaterialIcons
						name='location-searching'
						color='#fff'
						size={22}
					/>
				</Text>
			</TouchableOpacity>

			<View
				style={{
					flex: 2,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text style={{ fontSize: 18 }}>
					{home.direccion}
				</Text>
			</View>

			<MapView
				/* Creamos una referencia del mapa para poder utilizarlo
                fuera de MapView*/
				provider={PROVIDER_GOOGLE}
				ref={(map) => setMapa(map)}
				showsUserLocation
				followsUserLocation
				style={{
					flex: 8,
				}}
				initialRegion={{
					latitude: home.ubicacion.latitud,
					longitude: home.ubicacion.longitud,
					latitudeDelta: 0.1,
					longitudeDelta: 0.1,
				}}
			>
				<Marker
					coordinate={{
						latitude: home.ubicacion.latitud,
						longitude: home.ubicacion.longitud,
					}}
				>
					<Callout>
						<View style={{ padding: 10 }}>
							<Text
								style={{
									fontSize: 18,
									marginBottom: 10,
								}}
							>
								{home.nombre}
							</Text>

							<Text>{home.direccion}</Text>
						</View>
					</Callout>
				</Marker>
				{/*Agregamos marcadores*/}
				{marcadores.map((m, index) => (
					<Marker
						key={`marcador-${index}`}
						coordinate={{
							latitude: m.ubicacion.latitude,
							longitude:
								m.ubicacion.longitude,
						}}
					>
						<Callout>
							<View style={{ padding: 10 }}>
								<Text
									style={{
										fontSize: 18,
										marginBottom: 10,
									}}
								>
									{m.nombre}
								</Text>

								<Text>{m.direccion}</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>
		</SafeAreaView>
	);
};

export default Geoloc;
