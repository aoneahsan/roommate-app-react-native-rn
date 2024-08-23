import { useEffect, useRef } from 'react';
import { setupCapGoogleMap } from './index';

const CapGoogleMapsTestComponent: React.FC = () => {
	const mapRef = useRef<HTMLElement>();

	useEffect(() => {
		if (mapRef.current) {
			setupCapGoogleMap({
				mapEl: mapRef.current,
				mapId: 'zaions-cap-google-map-test-component#1',
				setMapCenterToMyCurrentLocation: true,
				addMarkerAtMyCurrentLocation: true,
			});
		}
	}, [mapRef.current]);

	return (
		<>
			<capacitor-google-map
				ref={mapRef}
				style={{
					display: 'inline-block',
					width: '100%',
					height: 400,
				}}
			></capacitor-google-map>
		</>
	);
};

export default CapGoogleMapsTestComponent;
