//import { userTokenKey, csrfTokenKey } from '@@/secretApiKeys';
import jwt from 'jsonwebtoken'
const csrfTokenKey = process.env.SECRET_API_KEY;
const userTokenKey = process.env.SECRET_API_KEY;

//////////////////////////////////////////////////////
// User Token
export function generateUserToken(user) {
  // Créez un payload contenant les données de l'utilisateur que vous souhaitez inclure dans le token
  const payload = {
    userId: user._id, // Vous devez utiliser l'ID de l'utilisateur ou un identifiant unique
    username: user.username,
    email: user.email,
  };

  // Signez le token avec votre clé secrète
  const token = jwt.sign(payload, userTokenKey, {
    expiresIn: '7d', // Vous pouvez définir la durée de validité du token ici
  });
  return token;
}

export function getJwtTokenFromLocalStorage() {
  const token = localStorage.getItem('userToken');
  return token;
}

export function verifyUserToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, userTokenKey, (err, decoded) => {
      if (err) {
        // Token is invalid or has expired
        console.error('JWT verification failed:', err);
        reject(err);
      } else {
        // Token is valid
        console.log('JWT decoded:', decoded);
        resolve(decoded);
      }
    });
  });
}
// User Token
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// CSRF Token
export function generateCsrfToken() {
  const payload = {
    time: Date.now()
  }

  const token = jwt.sign(payload, csrfTokenKey, {
    expiresIn: '1h', // Vous pouvez définir la durée de validité du token ici
  });
  return token;
}

export function verifyCsrfToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, csrfTokenKey, (err, decoded) => {
      if (err) {
        // Token is invalid or has expired
        console.error('JWT verification failed:', err);
        reject(err);
      } else {
        // Token is valid
        console.log('JWT decoded:', decoded);
        resolve(decoded);
      }
    });
  });
}
// CSRF Token
//////////////////////////////////////////////////////