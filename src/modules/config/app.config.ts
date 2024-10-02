

const loadDefaultConfiguration = () => ({
    port: parseInt(process.env.API_PORT ?? '333'),
    host: process.env.API_HOST ?? 'localhost',
    graphqlPath: '/graphql'
  });

  const loadOxforApiConfiguration = () => ({
    oxfordBaseUrl: process.env.OXFORD_BASE_URL ?? 'https://od-api-sandbox.oxforddictionaries.com/api/v2',
    appKey: process.env.OXFORD_APP_KEY ?? "",
    appId: process.env.OXFORD_APP_ID ?? ""
  })

const loadMongoConfiguration = () =>( {
    mongodb: {
        uri: process.env.URI
    }
})

export { loadDefaultConfiguration, loadMongoConfiguration, loadOxforApiConfiguration }