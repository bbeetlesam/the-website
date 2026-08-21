const pickRandomItem = <T>(items: T[]): T | undefined => {
	if (items.length === 0) return undefined;
	return items[Math.floor(Math.random() * items.length)];
};

export { pickRandomItem };
