import * as prismic from '@prismicio/client';

export function createClient(config = {}) {
  const client = prismic.createClient(process.env.PRISMIC_API_ENDPOINT, {
    ...config,
  });

  return client;
}
