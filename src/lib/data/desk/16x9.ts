import type { Desk } from '$lib/types';
import { NAV_ITEMS } from '../navigations';
import placeholderImg from '$lib/assets/gamepad.png';

// Aspect ratio: 16:9
// Logical size: 1280x720
const DESK_16x9: Desk = {
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
			size: 200,
			rotation: 3,
			focusFrame: {
				size: 100,
				cornerSize: 30,
				cornerThickness: 3
			},
			navigation: NAV_ITEMS['/games']
		},
		{
			id: '2',
			image: placeholderImg,
			imageAlt: '',
			x: 960,
			y: 180,
			rotation: 12,
			size: 120,
			navigation: NAV_ITEMS['/games']
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

// this is just a mockup desk, everything is not real
// i mean everything is just a placeholder
// will change later
export default DESK_16x9;
