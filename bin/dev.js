#!/usr/bin/env node

const oclif = await import('@oclif/core');
await oclif.execute({development: true, dir: import.meta.url});
