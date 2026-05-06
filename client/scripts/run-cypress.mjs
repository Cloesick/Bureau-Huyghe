import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const CLIENT_CWD = fileURLToPath(new URL('..', import.meta.url));

function withWindowsSystemPaths(env) {
  if (process.platform !== 'win32') {
    return env;
  }

  const systemRoot = env.SystemRoot ?? 'C:\\Windows';
  const system32 = `${systemRoot}\\System32`;
  const system32Wbem = `${system32}\\Wbem`;
  const windowsPowerShell = `${system32}\\WindowsPowerShell\\v1.0`;

  const existingPath = env.PATH ?? env.Path ?? '';
  const parts = existingPath.split(';').filter(Boolean);

  const prepend = [];

  const ensure = (p) => {
    if (!parts.some((existing) => existing.toLowerCase() === p.toLowerCase())) {
      prepend.push(p);
    }
  };

  ensure(system32);
  ensure(system32Wbem);
  ensure(windowsPowerShell);

  if (prepend.length === 0) {
    return env;
  }

  const nextPath = `${prepend.join(';')};${existingPath}`;
  return {
    ...env,
    PATH: nextPath,
    Path: nextPath,
  };
}

function getCypressBin() {
  if (process.platform === 'win32') {
    return 'node_modules\\.bin\\cypress.cmd';
  }
  return 'node_modules/.bin/cypress';
}

function main() {
  const args = process.argv.slice(2);
  const bin = getCypressBin();

  const child = spawn(bin, args, {
    cwd: CLIENT_CWD,
    stdio: 'inherit',
    env: withWindowsSystemPaths(process.env),
    shell: process.platform === 'win32',
  });

  child.on('exit', (code) => {
    process.exitCode = code ?? 1;
  });

  child.on('error', (err) => {
    console.error(err);
    process.exitCode = 1;
  });
}

main();
