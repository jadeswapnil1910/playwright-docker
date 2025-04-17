const { execSync } = require('child_process');

let exitCode = 0;

try {
  execSync('npm run execute:script', { stdio: 'inherit' });
} catch (err) {
  exitCode = err.status || 1;
}

try {
  execSync('npm run posttest', { stdio: 'inherit' });
} catch (err) {
  console.error('⚠️ posttest failed:', err.message);
}

process.exit(exitCode);
