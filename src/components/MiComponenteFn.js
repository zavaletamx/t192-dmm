/*
Lo minimo para crear un componente:
    1.- Importar react de las librerias del core
    2.- Importar los elementos visuales requeridos
        (Minimo 1)
    3.- Retornar minimo un elemento visual
    4.- Exportar el modulo principal
*/
import React from 'react';
import { Button, Text, View } from 'react-native';
import estilos from './../styles/estilos';

/*
Solo un componente default por archivo
*/
export default function MiComponenteFn() {
	/*
    Usa fragmentos para mandar dos 
    elementos a la vez
    
    <>
    <CONTENIDO />
    </>

    */
	return (
		<>
			<View>
				<Text style={estilos.subtitulos}>
					Mi ComponenteFn
				</Text>
			</View>
			<View>
				<Button title='Boton 1' />
			</View>
		</>
	);
}

export function OtroComponente() {
	return (
		<View>
			<Text style={estilos.subtitulos}>
				Otro Componente
			</Text>
		</View>
	);
}

//export default MiComponenteFn;
