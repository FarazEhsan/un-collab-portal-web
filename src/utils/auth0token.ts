import axios from 'axios';

async function getManagementApiToken() {
    const params = new URLSearchParams({
        grant_type: `${process.env.NEXT_PUBLIC_AUTH0_GRANT_TYPE}`,
        client_id: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`,
        client_secret: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET}`,
        audience: `${process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}`,
    });

    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_AUTH0_TOKEN_URL}`,
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
