#!/usr/bin/env node
/**
 * Runs Next.js CLI with a clean env (no NPM_CONFIG_DEVDIR) to avoid
 * "npm warn Unknown env config 'devdir'" when invoked via npm scripts.
 * Usage: node scripts/run-next.js <next-command> [args...]
 */
const { spawnSync } = require('child_process');
const path = require('path');

// Remove env vars that trigger npm "Unknown env config" warnings
const env = { ...process.env };
delete env.NPM_CONFIG_DEVDIR;
delete env.npm_config_devdir;

const nextBin = path.join(__dirname, '..', 'node_modules', '.bin', 'next');
const args = process.argv.slice(2);

const result = spawnSync(process.execPath, [nextBin, ...args], {
  stdio: 'inherit',
  env,
  cwd: path.join(__dirname, '..'),
});

process.exit(result.status ?? 1);
