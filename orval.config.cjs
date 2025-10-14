module.exports = {
  cinemaApi: {
    input: {
      target: 'http://localhost:3022/api-json',
    },
    output: {
      mode: 'tags-split',
      target: './src/generated/api.ts',
      schemas: './src/generated/models',
      client: 'react-query',
      clean: true,
      beautiful: true,
      override: {
        mutator: {
          path: './src/api/custom-instance.ts',
          defaultExport: true,
        },
        operations: {
          response: {
            transform: 'response.data',
          },
        },
      },
    },
  },
};
