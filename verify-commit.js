const msgPath = process.argv[2] || '.git/COMMIT_EDITMSG';

console.log(msgPath);
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
    console.error(`
        不合法的 commit 消息格式。
    `);

    process.exit(1);
}
