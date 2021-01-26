import React from 'react';
import { Button, Text, View } from 'react-native';

/** props es una referencia a las variables, const, obj, componentes, etc
 * que comparte el componente padre conmigo
 */
const Inicio = (props) => {
	console.log(props);
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Text>En Inicio.js</Text>
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
		</View>
	);
};

export default Inicio;
