import type { Plugin } from 'unified';

const aliases: Record<string, string> = {
  sh: 'bash', shell: 'bash', zsh: 'bash', console: 'bash', terminal: 'bash',
  c: 'c', 'c++': 'cpp', cc: 'cpp', h: 'c', hpp: 'cpp',
  js: 'javascript', jsx: 'jsx', ts: 'typescript', tsx: 'tsx',
  py: 'python', rb: 'ruby', rs: 'rust', yml: 'yaml', md: 'markdown',
  plaintext: 'text', text: 'text', plain: 'text',
};

const normalizeCodeLanguage: Plugin = () => (tree: any) => {
  for (const node of tree.children ?? []) {
    if (node.type !== 'code' || !node.lang) continue;
    const language = String(node.lang).trim().toLowerCase();
    node.lang = aliases[language] ?? language;
  }
};

export default normalizeCodeLanguage;
