import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as CONFIG from '../../config';
import BodyText from '../BodyText';
import ModalCon from '../ModalCon';
import Card from '../Card';
import MainButton from '../MainButton';

const LocationPicker = (props) => {
	const modalCloseHandler = () => {
		if (props.closemodal) {
			props.closemodal();
		} else {
			alert("pass 'closemodal' props");
		}
	};

	const [location, setLocation] = useState([
		{ key: 'Country/Region', value: 'Canada' },
		{ key: 'Street Address', value: '6 Huron St' },
		{ key: 'Apt, Suit, etc (optional)', value: '1812' },
		{ key: 'City', value: 'Toronto' },
		{ key: 'Province', value: 'Ontario' },
		{ key: 'Post Code', value: 'L5T2A6' },
	]);

	return (
		<ModalCon visible={props.visible}>
			<View style={STYLES.header}>
				<TouchableOpacity onPress={modalCloseHandler}>
					<Ionicons
						style={STYLES.backIcon}
						name='chevron-back'
						size={24}
						color={CONFIG.GREY}
					/>
				</TouchableOpacity>
				<BodyText style={STYLES.modalTitle}>{props.title}</BodyText>
				<TouchableOpacity onPress={() => {}}>
					{/* <BodyText style={STYLES.doneText}>
            <Ionicons name="checkmark" size={26} />
          </BodyText> */}
				</TouchableOpacity>
			</View>
			<View style={STYLES.main}>
				<Card style={{ ...STYLES.card }}>
					<View style={{ ...STYLES.cardHeader }}>
						<BodyText style={{ ...STYLES.cardHeaderTitle }}>
							Use Current Location
						</BodyText>
					</View>
					<View style={{ ...STYLES.cardBody }}>
						{location &&
							location.map((item, index) => (
								<View
									style={{ ...STYLES.row }}
									key={index}
								>
									<BodyText style={{ ...STYLES.infokey }}>{item.key}</BodyText>
									<BodyText style={{ ...STYLES.infovalue }}>
										{item.value}
									</BodyText>
								</View>
							))}
					</View>
					<View style={STYLES.btnCon}>
						<MainButton
							color='primary'
							style={STYLES.btn}
							onPress={modalCloseHandler}
						>
							Confirm
						</MainButton>
					</View>
				</Card>
			</View>
		</ModalCon>
	);
};

const STYLES = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 20,
		paddingHorizontal: 16,
	},
	backIcon: {},
	modalTitle: {
		fontFamily: CONFIG.FONT_RUBIK_BOLD,
		fontSize: 18,
	},
	doneText: {
		fontSize: 16,
	},
	main: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		height: 'auto',
		width: '90%',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	cardHeader: {
		backgroundColor: 'rgba(141, 139, 139, .3)',
		paddingTop: 30,
		paddingBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	cardHeaderTitle: {
		color: CONFIG.CHIP_TEXT,
		fontSize: 24,
		fontFamily: CONFIG.FONT_RUBIK_MEDIUM,
	},
	cardBody: {
		paddingVertical: 20,
		paddingHorizontal: 14,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	infokey: {
		fontSize: 18,
		color: CONFIG.LIGHT_TEXT_COLOR,
	},
	infovalue: {
		fontSize: 18,
	},
	btnCon: {
		paddingHorizontal: '20%',
		marginBottom: 20,
	},
	btn: {
		paddingVertical: 8,
	},
});

export default LocationPicker;
