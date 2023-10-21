export const config = {
  dependencies: ['express', 'dotenv', 'winston', 'zod', 'mongoose', 'date-fns'],

  devDependencies: [
    '@types/express',
    'ts-node-dev',
    'typescript',
    'tsconfig-paths',
  ],

  packageJsonScripts: {
    dev: 'ts-node-dev -r tsconfig-paths/register --respawn --transpile-only src/index.ts',
    clean: 'rm -rf dist',
    build: 'npm run clean && tsc',
    start: 'node dist/index.js',
    test: 'echo "Error: no test specified" && exit 1',
  },
};
