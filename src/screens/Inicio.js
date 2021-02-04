import React from 'react';
import { Button, Text, View } from 'react-native';

/** props es una referencia a las variables, const, obj, componentes, etc
 * que comparte el componente padre conmigo
 */
const Inicio = (props) => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Button
				title='Login'
				onPress={() => {
					/** PAra navegar entre ventanas
					 * usamos la propiedad navigation y la funcion
					 * navigate('_SOBRENOMBRE_');
					 */
					props.navigation.navigate('Login');
				}}
			/>

			<Button
				title='Registro'
				onPress={() => {
					props.navigation.navigate('Registro');
				}}
			/>
		</View>
	);
};

export default Inicio;
