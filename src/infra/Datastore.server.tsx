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

  return entity;
};

export const upsertEntity = async (config: Config) => {
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


export const addAutomation = async (shop: string, integration: Integration) => {
    const oldData = await readEntity(shop);
  const oldIntegrations = oldData?.integrations || [];

  // save to database
  upsertEntity({
    shop: shop,
    integrations: [...oldIntegrations, integration]
  });
}
