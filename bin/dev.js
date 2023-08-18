#!/usr/bin/env -S node --loader ts-node/esm --no-warnings=ExperimentalWarning
// eslint-disable-next-line node/shebang
(async () => {
  const oclif = await import('@oclif/core');
  await oclif.execute({ type: 'esm', development: true, dir: import.meta.url });
})();
