import { config } from "dotenv";

config({ path: '.env' });

type ElectronProtocolHandler = (request: GlobalRequest) => (GlobalResponse) | (Promise<GlobalResponse>)

export const imageProtocol: ElectronProtocolHandler = (request: GlobalRequest) => {
  const url = new URL(request.url);
  const imageUrl = process.env.ASSETS_SERVER_URL + 'images/' + url.host;

  return fetch(imageUrl, {
    method: 'GET',
    headers: request.headers,
  });
}
