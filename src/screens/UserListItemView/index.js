import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import * as CONFIG from '../../config';
import UserListItemInfoCard from '../../components/UserListItemInfoCard';
import UserListItemChipsCard from '../../components/UserListItemChipsCard';

// Images
import MusicIcon from './../../../assets/images/icons/music.png';
import MovieIcon from './../../../assets/images/icons/movie.png';

const UserListItemView = (props) => {
	const [userData, setUserData] = useState({
		personalInfo: {
			title: 'Personal Info',
			data: {
				name: 'Gigi',
				gender: 'Female',
				occupation: 'Student',
			},
		},
		musicChips: {
			image: MusicIcon,
			data: [
				{ id: '1', value: 'Lady Gaga' },
				{ id: '2', value: 'Rihanna' },
				{ id: '3', value: 'Beyonce' },
				{ id: '4', value: 'Selena' },
				{ id: '5', value: 'Justin Bieber' },
				{ id: '6', value: 'DJ Snake' },
				{ id: '7', value: 'Ariana Grande' },
				{ id: '8', value: 'Dua Lipa' },
				{ id: '9', value: 'Billie Eilish' },
			],
			bgColor: '#004170',
			chipBg: '#CCD9E2',
		},
		movieChips: {
			image: MovieIcon,
			data: [
				{ id: '1', value: 'The Silence of the Lambs' },
				{ id: '2', value: 'Butterfly' },
				{ id: '3', value: 'Effect' },
				{ id: '4', value: 'Hannibal' },
				{ id: '5', value: 'Se7en' },
				{ id: '6', value: 'One' },
				{ id: '7', value: 'Flew Over the Cuckoo’s Nest' },
				{ id: '8', value: 'speed' },
				{ id: '9', value: 'now' },
				{ id: '10', value: 'dark' },
				{ id: '11', value: 'globe' },
			],
			bgColor: '#4E64BC',
			chipBg: 'rgba(78, 100, 188, .3)',
		},
		roomPerference: {
			title: 'Room Perference',
			data: {
				minBudget: 700,
				maxBudget: 1200,
				place: 'Entire Room',
				buildingType: 'Condo',
			},
		},
		roommatePerference: {
			title: 'Roommate Perference',
			data: {
				gender: 'Female',
				age: '25-80',
				smoke: 'unlimited',
			},
		},
	});

	useEffect(() => {
		props.navigation.setOptions({
			title: userData.personalInfo.data.name,
		});
	}, []);

	return (
		<ScrollView contentContainerStyle={STYLES.bgWhite}>
			<View style={STYLES.main}>
				<UserListItemInfoCard
					data={userData.personalInfo}
					style={STYLES.infoCard}
				/>
				<View style={{ ...STYLES.row }}>
					<UserListItemChipsCard
						data={userData.musicChips}
						style={STYLES.chipsCard}
					/>
					<UserListItemChipsCard
						data={userData.movieChips}
						style={STYLES.chipsCard}
					/>
				</View>
				<UserListItemInfoCard
					data={userData.roomPerference}
					style={STYLES.infoCard}
				/>
				<UserListItemInfoCard
					data={userData.roommatePerference}
					style={STYLES.infoCard}
				/>
			</View>
		</ScrollView>
	);
};

const STYLES = StyleSheet.create({
	bgWhite: {
		backgroundColor: CONFIG.WHITE,
		flexGrow: 1,
	},
	main: {},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	infoCard: {},
	chipsCard: {
		flex: 1,
	},
});

export default UserListItemView;
