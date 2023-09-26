import connectDB from '../../db';
import userSchema from '@@/models/user';
import bcrypt from 'bcryptjs'
import { generateUserToken, verifyUserToken } from '@@/utils/tokenManagement';

export default defineEventHandler(async (e) => {
  const method = e.node.req.method;

  switch (method) {

    case 'POST':
      const body = await readBody(e);
      const registerBill = await registerUser(body);
      return sendJsonResponse(e, { result: registerBill });

    default:
      return sendJsonResponse(e, { error: 'Invalid method.' });
  }
});

async function registerUser(body) {
  try {
    // 
    const { username, email, password, confirmPassword } = body;
    console.log(username, email, password, confirmPassword)
    // Vérification des données d'entrée
    if (!username || !email || !password || !confirmPassword) {
      throw new Error('RegisterUser : Toutes les données d\'entrée sont obligatoires.');
    }

    // Vérification du format de l'email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error('RegisterUser : Format d\'email invalide.');
    }

    // Vérification de la longueur du mot de passe
    if (password.length < 8) {
      throw new Error('RegisterUser : Le mot de passe doit avoir au moins 8 caractères.');
    }

    // Vérification de la correspondance entre le mot de passe et la confirmation
    if (password !== confirmPassword) {
      throw new Error('RegisterUser : La confirmation du mot de passe ne correspond pas.');
    }

    // Vérification si le nom d'utilisateur est déjà pris
    const connection = connectDB()
    const userModel = (await connection).model('User', userSchema);
    const user = await userModel.findOne({
      $or: [{ username: username }, { email: email }],
    })
    if (user) {
      throw new Error('RegisterUser : Le nom d\'utilisateur/email est déjà pris.'); 
    }

    // Enregistrement de l'utilisateur (simulé ici)
    const newUser = {
      username,
      email,
      password: await hashPassword(password), // Vous devriez utiliser une fonction de hachage sécurisée ici
    };

    // L'utilisation de userModel.create() est courante et pratique lorsque vous souhaitez à la fois créer et enregistrer un document dans une collection MongoDB. 
    // Cependant, l'utilisation de new userModel() suivi de save() vous offre plus de flexibilité si vous avez besoin d'effectuer des opérations supplémentaires sur le modèle avant de l'enregistrer, comme la validation ou la manipulation des données.

    //En fin de compte, la décision d'utiliser userModel.create() ou new userModel() suivi de save() dépend de vos besoins spécifiques et de la structure de votre code. 
    //Les deux approches sont valables, mais userModel.create() est souvent préférée pour sa simplicité et sa concision.

    const userCreated = await userModel.create(newUser)
    console.log('[DB] User registered!');

    // Token a mettre ici
    const jwtToken = generateUserToken(userCreated);
    const tokenDecoded = await verifyUserToken(jwtToken);

    return { message: 'User registered successfully.', token: jwtToken, decoded: tokenDecoded };
  } catch (err) {
    console.log('[DB] User registration failed: ', err);
    return { error: 'Failed to register User.' };
  }
}

async function hashPassword(password) {
  const saltRounds = 10; // Le nombre de tours de salage (plus il est élevé, plus le hachage est sécurisé mais lent)
  return await bcrypt.hash(password, saltRounds);
}

function sendJsonResponse(e, data) {
  const jsonResponse = JSON.stringify(data);
  e.node.res.setHeader('Content-Type', 'application/json');
  e.node.res.end(jsonResponse);
}
