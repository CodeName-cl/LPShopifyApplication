import DATA from "~/inmemory.server";

export function loader({ request }) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  return {
    accessToken: DATA[id]
  };
}
