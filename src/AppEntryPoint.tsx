import { Theme, ThemePanel, useThemeContext } from '@radix-ui/themes';

// Tanstack React Router
import { RouterProvider } from '@tanstack/react-router';
import AppRouter from './routes';

// Import Radix UI CSS
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

import '@radix-ui/themes/styles.css';
import 'react-toastify/dist/ReactToastify.min.css';

import 'react-datepicker/dist/react-datepicker.css';

import 'zaions-react-ui-kit/dist/index.css';

// importing this here so the ENVs validation will kick in as soon as ap starts
import '@/utils/envKeys';

import { configureZTK } from 'zaions-tool-kit';
import ENVS from '@/utils/envKeys';
import { getUserLocationData } from './capacitorApis/geoLocation';
import { useEffect } from 'react';

configureZTK({ cryptoSecret: ENVS.cryptoSecret });

const queryClient = new QueryClient();

const AppEntryPoint: React.FC = () => {
	useEffect(() => {
		getUserLocationData().then((res) => {
			console.log({ res });
		});
	}, []);
	return (
		<>
			<Theme appearance='dark' radius='full'>
				<RecoilRoot>
					<QueryClientProvider client={queryClient}>
						<RouterProvider router={AppRouter} />

						<ReactQueryDevtools initialIsOpen={false} />
					</QueryClientProvider>
				</RecoilRoot>
				<ThemePanel defaultOpen={false} />

				<ToastContainer />
			</Theme>
		</>
	);
};

export default AppEntryPoint;
