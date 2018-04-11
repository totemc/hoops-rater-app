// This is just an example. Fill this with information from the slack for auth.
export default {
  oidc: {
    client_id: 'oktaclientid',
    issuer: 'oktaissuer',
    redirect_uri: window.location.origin + '/implicit/callback',
	}
};