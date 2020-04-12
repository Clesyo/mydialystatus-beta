import auth0 from '../../lib/auth0';

const logout = async (req, rep) =>{
    await auth0.handleLogout(req, rep)
}

export default logout