import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import Layout from './src/Layout';
import AppStore from './src/store';
import { useFonts } from 'expo-font';
import { hideAsync } from 'expo-splash-screen';

export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		// Rubik Font
		'Rubik-Light': require('./assets/fonts/Rubik/Rubik-Light.ttf'),
		'Rubik-Regular': require('./assets/fonts/Rubik/Rubik-Regular.ttf'),
		'Rubik-Medium': require('./assets/fonts/Rubik/Rubik-Medium.ttf'),
		'Rubik-SemiBold': require('./assets/fonts/Rubik/Rubik-SemiBold.ttf'),
		'Rubik-Bold': require('./assets/fonts/Rubik/Rubik-Bold.ttf'),
		'Rubik-ExtraBold': require('./assets/fonts/Rubik/Rubik-ExtraBold.ttf'),
		'Rubik-Black': require('./assets/fonts/Rubik/Rubik-Black.ttf'),

		// Roboto Font
		'Roboto-Light': require('./assets/fonts/Roboto/Roboto-Light.ttf'),
		'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
		'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
		'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
		'Roboto-Black': require('./assets/fonts/Roboto/Roboto-Black.ttf'),

		// Hanson Font
		'Hanson-Light': require('./assets/fonts/Hanson/Hanson-Light.ttf'),
		'Hanson-Bold': require('./assets/fonts/Hanson/Hanson-Bold.ttf'),

		// Gilroy Font
		'Gilroy-Light': require('./assets/fonts/Gilroy/Gilroy-Light.ttf'),
		'Gilroy-Regular': require('./assets/fonts/Gilroy/Gilroy-Regular.ttf'),
		'Gilroy-Medium': require('./assets/fonts/Gilroy/Gilroy-Medium.ttf'),
		'Gilroy-Bold': require('./assets/fonts/Gilroy/Gilroy-Bold.ttf'),
		'Gilroy-ExtraBold': require('./assets/fonts/Gilroy/Gilroy-ExtraBold.ttf'),

		// SFProText Font
		'SFProText-Light': require('./assets/fonts/SFProText/SFProText-Light.ttf'),
		'SFProText-Regular': require('./assets/fonts/SFProText/SFProText-Regular.ttf'),
		'SFProText-Medium': require('./assets/fonts/SFProText/SFProText-Medium.ttf'),
		'SFProText-SemiBold': require('./assets/fonts/SFProText/SFProText-SemiBold.ttf'),
		'SFProText-Black': require('./assets/fonts/SFProText/SFProText-Black.ttf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<Provider store={AppStore}>
			<View
				style={styles.container}
				onLayout={onLayoutRootView}
			>
				<Layout />
				<StatusBar style='auto' />
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
