import {promises as fs, watch} from 'node:fs';
import {argv} from 'node:process';
import tsj from 'ts-json-schema-generator';

const args = new Set(argv.slice(2));

async function generate() {
	/** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
	const config = {
		path: 'src/commands/process/index.ts',
		tsconfig: 'tsconfig.json',
		type: 'JsonFileObject',
	};

	const outputPath = `data.schema.json`;

	const schema = tsj.createGenerator(config).createSchema(config.type);
	const schemaString = JSON.stringify(schema, null, 4);

	console.log(`Creating "${outputPath}"...`);
	await fs.writeFile(outputPath, schemaString);
	console.log('Done.');
}

await generate();

if (args.has('-w') || args.has('--watch')) {
	console.log('Watching `src/commands/process/index.ts` for changes...');
	watch('src/commands/process/index.ts', {recursive: false}, (filename) => {
		if (filename) {
			generate();
		} else {
			console.log('filename not provided');
		}
	});
}
