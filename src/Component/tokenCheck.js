export function isTokenExpired(token) {
    const decodedToken = JSON.parse(token.split('.')[1]);
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    return expirationTime < currentTime;
}