import React from 'react';
import { StyleSheet, Modal } from 'react-native';

import * as CONFIG from '../../config';

const ModalCon = (props) => {
	return (
		<Modal
			style={{ ...STYLES.main, ...props.style }}
			animationType='slide'
			visible={props.visible ? props.visible : true}
		>
			{props.children}
		</Modal>
	);
};

const STYLES = StyleSheet.create({
	main: {},
});

export default ModalCon;
