import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const target = join(root, 'external-notes');
const notes = join(target, 'notes');
const run = (command, args) => {
	const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' });
	if (result.status !== 0) process.exit(result.status ?? 1);
};

if (existsSync(notes) && process.env.CI) {
	console.log('Using notes checked out by CI.');
} else if (existsSync(join(target, '.git'))) {
	run('git', ['-C', target, 'pull', '--ff-only']);
} else if (existsSync(notes)) {
	console.log('Using existing external-notes directory.');
} else {
	run('git', ['clone', '--depth', '1', 'https://github.com/Hole333/HaloMoon-Notes.git', target]);
}
