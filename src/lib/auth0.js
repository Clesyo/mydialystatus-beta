import { initAuth0 } from '@auth0/nextjs-auth0';

 export default initAuth0({
    clientId: process.env.AUT0_CLEINT_ID,
    clientSecret: process.env.AUT0_CLEINT_SECRET,
    scope: process.env.AUT0_SCOPE,
    domain: process.env.AUT0_CLEINT_DOMAIN,
    redirectUri: process.env.AUT0_REDIRECT_URI,
    postLogoutRedirectUri: process.env.AUT0_LOGOUT_REDIRECT_URI,
    session: {
        cookieSecret:process.env.AUT0_SESSION_SECRET,
        cookieLifetime: process.env.AUT0_SESSION_COOKIE_TIME,

    },
})