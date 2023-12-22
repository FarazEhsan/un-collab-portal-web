
//rewrite the below using nextjs fetch
async function getManagementApiToken() {
    const res = await fetch('https://dev-huxjkvfkb5f36hh4.us.auth0.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: process.env.AUTH0_GRANT_TYPE,
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET
      })
    });
  
    if (!res.ok) {
      throw new Error(`Failed to get token: ${res.statusText}`);
    }
  
    const data = await res.json();
  
    return data.access_token;
  }

  export default getManagementApiToken