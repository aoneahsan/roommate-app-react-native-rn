import { getFrbAuthInstance } from '@/firebaseInstance';
import { AppRoutes } from '@/routes/appRoutes';
import { useNavigate } from '@tanstack/react-router';
import {
	createUserWithEmailAndPassword,
	getIdToken,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { ZBox, ZButton } from 'zaions-react-ui-kit';

const FirebaseTestPage: React.FC = () => {
	const navigate = useNavigate();

	const registerTest = async () => {
		const frbAuth = getFrbAuthInstance();
		const email = prompt('Enter Email') ?? 'email@yopmail.com';
		const password = prompt('Enter Password') ?? 'Asd123!@#';

		const result = await createUserWithEmailAndPassword(
			frbAuth,
			email,
			password
		);

		console.info({ ml: 'registerTest', result });
	};

	const loginTest = async () => {
		const frbAuth = getFrbAuthInstance();
		const email = prompt('Enter Email') ?? 'email@yopmail.com';
		const password = prompt('Enter Password') ?? 'Asd123!@#';

		const result = await signInWithEmailAndPassword(frbAuth, email, password);

		console.info({ ml: 'loginTest', result });
	};

	const getIdTokenTest = async () => {
		const frbAuth = getFrbAuthInstance();

		const currentUser = frbAuth.currentUser;

		let getIdTokenResult = null;
		if (currentUser) {
			currentUser;
			getIdTokenResult = await getIdToken(currentUser);
		}
		console.info({ ml: 'getIdTokenTest', currentUser, getIdTokenResult });
	};

	return (
		<>
			<ZBox pt={'50px'} pl={'50px'}>
				<ZButton
					onClick={() => {
						navigate({
							to: AppRoutes.testPages,
						});
					}}
				>
					Go Back
				</ZButton>
				<ZBox pt={'30px'} pb={'30px'}>
					firebaseTestPage
				</ZBox>
				<ZBox pt={'10px'} pb={'10px'}>
					<ZButton onClick={registerTest}>registerTest</ZButton>
				</ZBox>
				<ZBox pt={'10px'} pb={'10px'}>
					<ZButton onClick={loginTest}>loginTest</ZButton>
				</ZBox>
				<ZBox pt={'10px'} pb={'10px'}>
					<ZButton onClick={getIdTokenTest}>getIdToken</ZButton>
				</ZBox>
			</ZBox>
		</>
	);
};

export default FirebaseTestPage;
