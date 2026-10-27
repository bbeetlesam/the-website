import { readFile, writeFile } from 'node:fs/promises';
import postcss from 'postcss';
import prettier from 'prettier';

const cssPath = new URL('../src/routes/layout.css', import.meta.url);
const outputPath = new URL('../src/lib/styles/tokens.ts', import.meta.url);
const css = await readFile(cssPath, 'utf8');
const root = postcss.parse(css, { from: cssPath.pathname });
const theme = root.nodes.find((node) => node.type === 'atrule' && node.name === 'theme');

if (!theme) {
	throw new Error(`Could not find @theme in ${cssPath.pathname}`);
}

const groups = { color: new Map(), font: new Map() };

for (const node of theme.nodes ?? []) {
	if (node.type !== 'decl') continue;

	const prefix = Object.keys(groups).find((group) => node.prop.startsWith(`--${group}-`));
	if (!prefix) continue;

	const name = node.prop.slice(prefix.length + 3);
	const key = name.replace(/-([a-z\d])/g, (_, character) => character.toUpperCase());

	if (!key) {
		throw new Error(`Token ${node.prop} has no name`);
	}
	if (groups[prefix].has(key)) {
		throw new Error(`Duplicate ${prefix} token key "${key}" from ${node.prop}`);
	}

	groups[prefix].set(key, node.value);
}

for (const [group, tokens] of Object.entries(groups)) {
	if (tokens.size === 0) {
		throw new Error(`No --${group}- tokens found in @theme`);
	}
}

const renderGroup = (tokens) =>
	[...tokens]
		.map(([key, value]) => `\t\t${JSON.stringify(key)}: ${JSON.stringify(value)},`)
		.join('\n');

const generated = `// This file is generated from the color and font tokens in src/routes/layout.css.\n// Run pnpm tokens:generate after changing those declarations.\n\nconst tokens = {\n\tcolor: {\n${renderGroup(groups.color)}\n\t},\n\tfont: {\n${renderGroup(groups.font)}\n\t}\n} as const;\n\nexport default tokens;\n`;
const prettierConfig = await prettier.resolveConfig(outputPath.pathname);
const formatted = await prettier.format(generated, {
	...prettierConfig,
	filepath: outputPath.pathname
});

await writeFile(outputPath, formatted);
console.log(`Generated ${outputPath.pathname}`);
