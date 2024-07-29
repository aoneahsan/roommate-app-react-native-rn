import { AppRoutes } from '@/routes/appRoutes';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { ZBox, ZButton } from 'zaions-react-ui-kit';

const TestPages: React.FC = () => {
	const navigate = useNavigate();
	return (
		<>
			<ZBox pt={'50px'} pl={'50px'}>
				<ZButton
					onClick={() =>
						navigate({
							to: AppRoutes.testPagesSub.firebaseTesting,
						})
					}
				>
					Firebase Testing
				</ZButton>
				<Outlet />
			</ZBox>
		</>
	);
};

export default TestPages;
