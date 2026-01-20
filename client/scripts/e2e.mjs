import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const CLIENT_CWD = fileURLToPath(new URL('..', import.meta.url));
const SERVER_CWD = fileURLToPath(new URL('../../server', import.meta.url));

function withWindowsSystemPaths(env) {
  if (process.platform !== 'win32') {
    return env;
  }

  const systemRoot = env.SystemRoot ?? 'C:\\Windows';
  const system32 = `${systemRoot}\\System32`;
  const windowsPowerShell = `${systemRoot}\\System32\\WindowsPowerShell\\v1.0`;

  const existingPath = env.PATH ?? env.Path ?? '';
  const parts = existingPath.split(';').filter(Boolean);
  const prepend = [];

  if (!parts.some((p) => p.toLowerCase() === system32.toLowerCase())) {
    prepend.push(system32);
  }
  if (!parts.some((p) => p.toLowerCase() === windowsPowerShell.toLowerCase())) {
    prepend.push(windowsPowerShell);
  }

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

function getNpmCmd() {
  return 'npm';
}

function spawnCmd(command, args, options) {
  const env = withWindowsSystemPaths({
    ...process.env,
    ...(options?.env ?? {}),
  });

  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env,
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
        return;
      }
    } catch {
    }

    await new Promise((r) => setTimeout(r, intervalMs));
  }

  throw new Error(`Timed out waiting for ${url}`);
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
  }
}

async function main() {
  const npmCmd = getNpmCmd();
  const cypressScript = process.argv[2] ?? 'cypress:run';
  const desiredPort = Number(process.env.E2E_PORT ?? '5174');
  const baseUrl = process.env.E2E_BASE_URL ?? `http://localhost:${desiredPort}`;

  const apiUrl = process.env.E2E_API_URL ?? 'http://localhost:3001';
  const adminEmail = process.env.E2E_ADMIN_EMAIL ?? 'admin.e2e@bureau-huyghe.local';
  const jwtSecret = process.env.E2E_JWT_SECRET ?? 'e2e-secret';

  const devProc = spawnCmd(npmCmd, ['run', 'dev', '--', '--port', String(desiredPort), '--strictPort'], {
    cwd: CLIENT_CWD,
  });

  const serverProc = spawnCmd(npmCmd, ['run', 'dev'], {
    cwd: SERVER_CWD,
    env: {
      NODE_ENV: 'test',
      EMAIL_TRANSPORT: 'json',
      PORT: '3001',
      JWT_SECRET: jwtSecret,
      ADMIN_EMAIL: adminEmail,
      BANK_IBAN: process.env.E2E_BANK_IBAN ?? 'BE68539007547034',
      BANK_BIC: process.env.E2E_BANK_BIC ?? 'KREDBEBB',
      BANK_BENEFICIARY_NAME: process.env.E2E_BANK_BENEFICIARY_NAME ?? 'Bureau Huyghe',
    },
  });

  let shuttingDown = false;
  const shutdown = async () => {
    if (shuttingDown) {
      return;
    }
    shuttingDown = true;
    await killProcessTree(devProc.pid);
    await killProcessTree(serverProc.pid);
  };

  process.on('SIGINT', () => {
    void shutdown().finally(() => process.exit(130));
  });

  process.on('SIGTERM', () => {
    void shutdown().finally(() => process.exit(143));
  });

  try {
    await waitForUrl(baseUrl, 60_000);
    await waitForUrl(`${apiUrl}/health`, 60_000);

    const exitCode = await new Promise((resolve, reject) => {
      const child = spawnCmd(npmCmd, ['run', cypressScript, '--', '--config', `baseUrl=${baseUrl}`], {
        cwd: CLIENT_CWD,
        env: {
          CYPRESS_apiUrl: apiUrl,
          CYPRESS_adminEmail: adminEmail,
          CYPRESS_jwtSecret: jwtSecret,
        },
      });
      child.on('error', reject);
      child.on('exit', (code) => resolve(code ?? 1));
    });

    process.exitCode = exitCode;
  } finally {
    await shutdown();
  }
}

await main();
