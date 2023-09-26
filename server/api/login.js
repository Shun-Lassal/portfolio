import connectDB from '../../db';
import userSchema from '@@/models/user';
import bcrypt from 'bcryptjs'
import { generateUserToken, verifyUserToken } from '@@/utils/tokenManagement';

export default defineEventHandler(async (e) => {
  const method = e.node.req.method;

  switch (method) {

    case 'POST':
      const body = await readBody(e);
      const loginBill = await loginUser(body);
      return sendJsonResponse(e, { result: loginBill });

    default:
      return sendJsonResponse(e, { error: 'Invalid method.' });
  }
});

async function loginUser(body) {
  try {
    const { username, password } = body;

    // Vérification des données d'entrée
    if (!username || !password) {
      throw new Error('LoginUser : Toutes les données d\'entrée sont obligatoires.');
    }

    if (username.length < 2 || username.length > 64) {
      throw new Error('LoginUser : L\'username est trop court/long.');
    }

    // Vérification de la longueur du mot de passe
    if (password.length < 8) {
      throw new Error('LoginUser : Le mot de passe doit avoir au moins 8 caractères.');
    }

    // Vérification si le nom d'utilisateur existe
    const connection = connectDB()
    const userModel = (await connection).model('User', userSchema);
    const user = await userModel.findOne({'username': username})
    if (!user) {
      throw new Error('No_Username_Found');
    }
    
    const passwordIsOk = await verifyPassword(password, user.password); 
    if (!passwordIsOk) {
      throw new Error('No_Matching_Password');
    }
    
    console.log('[DB] User logged-in!');

    // Token a mettre ici
    const jwtToken = generateUserToken(user);
    const tokenDecoded = await verifyUserToken(jwtToken);
    
    return { message: 'User logged-in successfully.', token: jwtToken, decoded: tokenDecoded };
  } catch (err) {
    console.log('[DB] User log failed: ', err);
    return { error: 'Failed to log User.' };
  }
}

// Fonction pour vérifier un mot de passe
async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

function sendJsonResponse(e, data) {
  const jsonResponse = JSON.stringify(data);
  e.node.res.setHeader('Content-Type', 'application/json');
  e.node.res.end(jsonResponse);
}
