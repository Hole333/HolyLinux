import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
process.chdir(root);

if (process.argv.includes('--help')) {
	console.log('Usage: npm run publish');
	console.log('Creates a Markdown article, opens an editor, builds the site, and pushes the commit.');
	process.exit(0);
}

const prompt = createInterface({ input, output });
const ask = async (label, fallback = '') =>
	(await prompt.question(`${label}${fallback ? ` (default: ${fallback})` : ""}: `)).trim() || fallback;
const quote = (value) => `'${value.replaceAll("'", "''")}'`;
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const run = (command, args, options = {}) => {
	const result = spawnSync(command, args, { cwd: root, stdio: 'inherit', shell: false, ...options });
	if (result.error) throw result.error;
	if (result.status !== 0) throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
};
const tryEditor = (command, args) => {
	const result = spawnSync(command, args, { cwd: root, stdio: 'inherit', shell: false });
	if (result.error?.code === 'ENOENT') return false;
	if (result.error) throw result.error;
	if (result.status !== 0) throw new Error(`${command} exited with code ${result.status}`);
	return true;
};
const openEditor = (file) => {
	const configured = process.env.VISUAL || process.env.EDITOR;
	if (configured && tryEditor(configured, [file])) return;
	if (tryEditor('code', ['--wait', file])) return;
	if (tryEditor('cursor', ['--wait', file])) return;
	if (process.platform === 'win32' && tryEditor('notepad.exe', [file])) return;
	for (const editor of ['nano', 'vim', 'vi']) if (tryEditor(editor, [file])) return;
	throw new Error('No editor was found. Set the EDITOR or VISUAL environment variable.');
};

try {
	const title = await ask('Article title');
	if (!title) throw new Error('Article title is required.');
	const description = await ask('Short description', title);
	const tagsInput = await ask('Tags, separated by commas', 'general');
	const now = new Date();
	const stamp = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('');
	const time = [String(now.getHours()).padStart(2, '0'), String(now.getMinutes()).padStart(2, '0'), String(now.getSeconds()).padStart(2, '0')].join('');
	const slug = await ask('URL slug', `post-${stamp}-${time}`);
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('The slug may contain lowercase letters, numbers, and single hyphens only.');
	const file = join(root, 'src', 'content', 'blog', `${slug}.md`);
	if (existsSync(file)) throw new Error(`Article already exists: ${relative(root, file)}`);
	const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
	const tags = tagsInput.split(',').map((tag) => tag.trim()).filter(Boolean);
	const frontmatter = [
		'---', `title: ${quote(title)}`, `description: ${quote(description)}`, `pubDate: '${date}'`,
		`tags: [${tags.map(quote).join(", ")}]`, '---', '',
		'<!-- Write the article here. Save and close the editor to continue publishing. -->', '',
	].join('\n');
	writeFileSync(file, frontmatter, 'utf8');
	console.log(`\nCreated: ${relative(root, file)}`);
	console.log('Save and close the editor to continue.\n');
	openEditor(file);

	const content = readFileSync(file, 'utf8');
	const body = content.replace(/^---[\s\S]*?---/, '').replace(/<!--[\s\S]*?-->/g, '').trim();
	if (!body) throw new Error(`The article body is empty. The file was kept but not published: ${relative(root, file)}`);

	console.log('\nBuilding and publishing...');
	run(npmCommand, ['run', 'build']);
	run('git', ['add', relative(root, file)]);
	run('git', ['commit', '-m', `docs: publish ${title}`]);
	run('git', ['push']);
	console.log('\nThe article was pushed. GitHub Actions is updating https://www.halomoon.cn/');
} catch (error) {
	console.error(`\n${error instanceof Error ? error.message : error}`);
	process.exitCode = 1;
} finally {
	prompt.close();
}
