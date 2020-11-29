
import Client from '../client'

export default function hook(options = {}) {

  const client = new Client(options)
  const { isAuthorized, createAuthorizeURL } = client

  return {
    client,
    isAuthorized,
    createAuthorizeURL,
  };
}
