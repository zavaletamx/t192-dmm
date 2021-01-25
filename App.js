import React from 'react';
import { ScrollView, Text, View } from 'react-native';

/** Agregamos librerías de íconos */
import {
	Feather,
	Zocial,
	Ionicons,
} from '@expo/vector-icons';

/**
 * El diseño de UI en React usa los principios del desarrollo web
 * Entre ellos el manejo de JSX, los estilos tambien están inspirados
 * en el entorno web
 *
 * Flex
 */

const App = () => {
	return (
		<View style={{ backgroundColor: '#000', flex: 1 }}>
			<View
				style={{
					backgroundColor: '#F6D8AE',
					flex: 8,
					/** Centrado horizontal */
					alignItems: 'center',
					/** Centrado vertical */
					justifyContent: 'space-around',
				}}
			>
				<Text>
					<Feather
						name='user'
						size={28}
						color='#083D77'
					/>
					{'  '}
					Raúl Zavaleta
				</Text>
				<Text>
					<Zocial
						name='call'
						size={28}
						color='#083D77'
					/>
					{'  '}
					(442) 204 8329
				</Text>
				<Text>
					<Ionicons
						name='md-mail-sharp'
						color='#083D77'
						size={28}
					/>
					{'  '}
					raul.zavaletazea@gmail.com
				</Text>
			</View>

			<View
				style={{
					flex: 2,
					flexDirection: 'row',
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: '#DA4167',
					}}
				/>
				<View
					style={{
						flex: 1,
						backgroundColor: '#2E4057',
					}}
				/>
				<View
					style={{
						flex: 1,
						backgroundColor: '#fff',
					}}
				>
					<View
						style={{
							flex: 1,
							backgroundColor: '#fff',
						}}
					/>
					<View
						style={{
							flex: 1,
							backgroundColor: '#000',
						}}
					/>
				</View>
				<View
					style={{
						flex: 1,
						backgroundColor: '#083D77',
					}}
				/>
				<View
					style={{
						flex: 1,
						backgroundColor: '#6E2594',
					}}
				/>
			</View>
		</View>
	);
};

export default App;
