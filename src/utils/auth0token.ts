import axios from 'axios';

async function getManagementApiToken() {
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: "K4FpVUsE1toX4tDrwR7D5rwJFpMS0N4r",
    client_secret:
      "VjT36DGhHeuajgfGxEhafTah06NcwGZeMvLtm-gM-Fq0JxmuI8THcDlQmt-r00ni",
    audience: "https://dev-huxjkvfkb5f36hh4.us.auth0.com/api/v2/",
  });

  try {
    const res = await axios.post(
      "https://dev-huxjkvfkb5f36hh4.us.auth0.com/oauth/token",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.data.access_token;
  } catch (e) {
    console.log("Token fetch error", e);
  }
}

export default getManagementApiToken;