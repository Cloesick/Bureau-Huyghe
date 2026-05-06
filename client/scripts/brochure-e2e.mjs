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

function spawnCmd(command, args, options) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: withWindowsSystemPaths({
      ...process.env,
      ...(options?.env ?? {}),
    }),
    ...options,
  });

  return child;
}

async function waitForUrl(url, timeoutMs) {
  const start = Date.now();
  const intervalMs = 500;

  while (Date.now() - start < timeoutMs) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2_000);

      const res = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-store',
      });

      clearTimeout(timeout);

      if (res.ok) {
        return true;
      }
    } catch {
      // ignore
    }

    await new Promise((r) => setTimeout(r, intervalMs));
  }

  return false;
}

async function killProcessTree(pid) {
  if (pid == null) {
    return;
  }

  if (process.platform === 'win32') {
    const systemRoot = process.env.SystemRoot ?? 'C:\\Windows';
    const taskkillExe = `${systemRoot}\\System32\\taskkill.exe`;

    await new Promise((resolve, reject) => {
      const child = spawn(taskkillExe, ['/PID', String(pid), '/T', '/F'], {
        stdio: 'inherit',
        shell: false,
      });

      child.on('error', reject);
      child.on('exit', (code) => {
        if (code === 0 || code === 128) {
          resolve();
          return;
        }
        reject(new Error(`taskkill exited with code ${code}`));
      });
    });

    return;
  }

  try {
    process.kill(pid, 'SIGTERM');
  } catch {
    // ignore
  }
}

async function main() {
  const desiredPort = Number(process.env.E2E_PORT ?? '5174');
  const baseUrl = process.env.E2E_BASE_URL ?? `http://localhost:${desiredPort}`;

  const npmCmd = process.env.npm_execpath ? 'npm' : 'npm';

  const alreadyRunning = await waitForUrl(baseUrl, 1_000);

  let devProc;
  if (!alreadyRunning) {
    devProc = spawnCmd(npmCmd, ['run', 'dev', '--', '--port', String(desiredPort), '--strictPort'], {
      cwd: CLIENT_CWD,
    });

    const ok = await waitForUrl(baseUrl, 60_000);
    if (!ok) {
      await killProcessTree(devProc.pid);
      throw new Error(`Timed out waiting for ${baseUrl}`);
    }
  }

  const exitCode = await new Promise((resolve, reject) => {
    const child = spawnCmd(npmCmd, ['run', 'cypress:brochure', '--', '--config', `baseUrl=${baseUrl}`], {
      cwd: CLIENT_CWD,
    });

    child.on('error', reject);
    child.on('exit', (code) => resolve(code ?? 1));
  });

  if (devProc) {
    await killProcessTree(devProc.pid);
  }

  process.exitCode = exitCode;
}

await main();
