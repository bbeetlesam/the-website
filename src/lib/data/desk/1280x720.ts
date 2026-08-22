import type { DeskConfig } from '$lib/types';
import { NAV_ROUTES } from '../navigations';
import placeholderImg from '$lib/assets/gamepad.png'; // other design soon created

// 16:9 ratio
const DESK_1280x720: DeskConfig = {
	size: {
		width: 1280,
		height: 720
	},

	items: [
		{
			id: 'gamepad',
			image: placeholderImg,
			imageAlt: 'Gamepad',
			x: 320,
			y: 180,
			rotation: 0,
			size: 200,
			isRouteItem: true,
			route: NAV_ROUTES['games']
		},
		{
			id: '2',
			image: placeholderImg,
			imageAlt: '',
			x: 960,
			y: 180,
			rotation: 12,
			size: 120
		},
		{
			id: '3',
			image: placeholderImg,
			imageAlt: '',
			x: 320,
			y: 540,
			rotation: -5,
			size: 150
		},
		{
			id: '4',
			image: placeholderImg,
			imageAlt: '',
			x: 960,
			y: 540,
			rotation: 15,
			size: 95
		},
		{
			id: '5',
			image: placeholderImg,
			imageAlt: '',
			x: 640,
			y: 360,
			rotation: -10,
			size: 105
		}
	]
};

export default DESK_1280x720;
