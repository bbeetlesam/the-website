import type { Desk } from '$lib/types';
import placeholderImg from '$lib/assets/gamepad.png';
import gameWhite from '$lib/assets/images/nav-icons/game-white.svg';
import gameBlack from '$lib/assets/images/nav-icons/game-black.svg';
import bioWhite from '$lib/assets/images/nav-icons/bio-white.svg';
import bioBlack from '$lib/assets/images/nav-icons/bio-black.svg';
import blogsWhite from '$lib/assets/images/nav-icons/blogs-white.svg';
import blogsBlack from '$lib/assets/images/nav-icons/blogs-black.svg';
import artsWhite from '$lib/assets/images/nav-icons/arts-white.svg';
import artsBlack from '$lib/assets/images/nav-icons/arts-black.svg';
import oddworksWhite from '$lib/assets/images/nav-icons/oddworks-white.svg';
import oddworksBlack from '$lib/assets/images/nav-icons/oddworks-black.svg';

// Aspect ratio: 16:9
// Logical size: 1280x720
// NOTE: Mockup data — will be migrated to Sanity
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
			focusFrame: { size: 100, cornerSize: 30, cornerThickness: 3 },
			navigation: {
				route: '/(header)/games',
				title: 'Games',
				desc: 'Strange, arcade oddities.',
				icon: { white: gameWhite, black: gameBlack }
			}
		},
		{
			id: '2',
			image: placeholderImg,
			imageAlt: '',
			x: 960,
			y: 180,
			rotation: 12,
			size: 120,
			navigation: {
				route: '/(header)/bio',
				title: 'Bio',
				desc: 'Who am I really?',
				icon: { white: bioWhite, black: bioBlack }
			}
		},
		{
			id: '3',
			image: placeholderImg,
			imageAlt: '',
			x: 320,
			y: 540,
			rotation: -5,
			size: 150,
			navigation: {
				route: '/(header)/blogs',
				title: 'Blogs',
				desc: 'The signs of my mind.',
				icon: { white: blogsWhite, black: blogsBlack }
			}
		},
		{
			id: '4',
			image: placeholderImg,
			imageAlt: '',
			x: 960,
			y: 540,
			rotation: 15,
			size: 95,
			navigation: {
				route: '/(header)/arts',
				title: 'Arts',
				desc: 'Pieces of my arts.',
				icon: { white: artsWhite, black: artsBlack }
			}
		},
		{
			id: '5',
			image: placeholderImg,
			imageAlt: '',
			x: 640,
			y: 360,
			rotation: -10,
			size: 105,
			navigation: {
				route: '/(header)/oddworks',
				title: 'Oddworks',
				desc: 'Other strange projects.',
				icon: { white: oddworksWhite, black: oddworksBlack }
			}
		}
	]
};

export default DESK_16x9;
