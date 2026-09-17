import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
process.chdir(root);
const prompt = createInterface({ input, output });
const ask = async (label, fallback = '') => (await prompt.question(`${label}${fallback ? `（默认：${fallback}）` : ''}：`)).trim() || fallback;
const quote = (value) => `'${value.replaceAll("'", "''")}'`;
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const run = (command, args) => {
	const result = spawnSync(command, args, { cwd: root, stdio: 'inherit', shell: false });
	if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} 执行失败`);
};

try {
	const title = await ask('文章标题');
	if (!title) throw new Error('文章标题不能为空');
	const description = await ask('一句话摘要', title);
	const tagsInput = await ask('标签，使用逗号分隔', '随笔');
	const now = new Date();
	const stamp = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('');
	const time = [String(now.getHours()).padStart(2, '0'), String(now.getMinutes()).padStart(2, '0'), String(now.getSeconds()).padStart(2, '0')].join('');
	const slug = await ask('英文链接名', `post-${stamp}-${time}`);
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('链接名只能包含小写字母、数字和单个连字符');
	const file = join(root, 'src', 'content', 'blog', `${slug}.md`);
	if (existsSync(file)) throw new Error(`文章已存在：${relative(root, file)}`);
	const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
	const tags = tagsInput.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean);
	const frontmatter = [
		'---', `title: ${quote(title)}`, `description: ${quote(description)}`, `pubDate: '${date}'`,
		`tags: [${tags.map(quote).join(', ')}]`, '---', '',
		'<!-- 在这里开始写正文；保存并关闭编辑器后会自动构建、提交和发布。 -->', '',
	].join('\n');
	writeFileSync(file, frontmatter, 'utf8');
	console.log(`\n已创建：${relative(root, file)}\n关闭编辑器后将自动发布。\n`);

	if (process.platform === 'win32') {
		const safePath = file.replaceAll("'", "''");
		run('powershell.exe', ['-NoProfile', '-Command', `Start-Process -FilePath notepad.exe -ArgumentList '${safePath}' -Wait`]);
	} else {
		run(process.env.EDITOR || 'nano', [file]);
	}

	const content = readFileSync(file, 'utf8');
	const body = content.replace(/^---[\s\S]*?---/, '').replace(/<!--[\s\S]*?-->/g, '').trim();
	if (!body) throw new Error(`正文仍为空，文章已保留但没有发布：${relative(root, file)}`);

	console.log('\n正在检查并发布……');
	run(npmCommand, ['run', 'build']);
	run('git', ['add', relative(root, file)]);
	run('git', ['commit', '-m', `docs: publish ${title}`]);
	run('git', ['push']);
	console.log('\n发布请求已推送。GitHub Actions 将自动更新 https://www.halomoon.cn/');
} catch (error) {
	console.error(`\n${error instanceof Error ? error.message : error}`);
	process.exitCode = 1;
} finally {
	prompt.close();
}

