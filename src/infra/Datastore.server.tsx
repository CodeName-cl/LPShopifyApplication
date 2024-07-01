import { Datastore } from '@google-cloud/datastore';


interface Integration {
  name: string;
}

interface Config {
  shop: string;
  integrations: Integration[]
}

export const readEntity = async (shop: string): Promise<Config | undefined> => {
  const datastore = new Datastore({ namespace: process.env.DATASTORE_NAME_SPACE });
  const kind = 'config';
  const taskKey = datastore.key([kind, shop]);
  const [entity] = await datastore.get(taskKey);

  console.log("aaaaaaaa", entity);

  return entity;
};

export const createEntity = async (config: Config) => {

  // TODO: read old config

  // TODO: merge config with new config

  try {

    // update registry in datastore
    const datastore = new Datastore({ namespace: process.env.DATASTORE_NAME_SPACE || "test" });
    const kind = 'config';
    const taskKey = datastore.key([kind, config.shop]);
    const task = {
      key: taskKey,
      data: config
    };

    console.log(`added integration for shop: ${config.shop}`);
    await datastore.upsert(task);
  } catch (ex) {
    console.log(ex);
  }
};
