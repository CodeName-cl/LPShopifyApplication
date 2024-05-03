import DATA from "~/inmemory.server";

export const loader = async ({ request }) => {

  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  DATA[id] = "";
  delete DATA[id];

  return {};

}
