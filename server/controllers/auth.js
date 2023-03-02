const bcrypt = require('bcryptjs')
const User = require('../models/user') 
// const { use } = require('../router/auth')
const jwt = require('../utils/jwt')

function register(req, res){
    const {firstname, lastname, email, password} = req.body

    if(!email) res.status(400).send({msg: "el email es obligatorio"})
    if(!password) res.status(400).send({msg: "la contraseña es obligatoria"})

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,
        password
    })

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    user.password = hashPassword

    user.save((error, userStorage) => {

        if(error){
            res.status(400).send({msg: "Error al crear usuario"})
        }else{
            res.status(200).send(userStorage)
        }
    })

    // res.status(200).send({msg: "TODO OK"})
}

function login(req, res){
    const {email, password} = req.body

    if(!email) res.status(400).send({msg: 'El email es obligatorio'})
    if(!password) res.status(400).send({msg: 'la contraseña es obligatoria'})

    const emailLowerCase = email.toLowerCase()

    User.findOne({email: emailLowerCase}, (error, userStore)=>{
        if(error){
            res.status(500).send({msg: 'error en el servidor'})
        }else{
            bcrypt.compare(password, userStore.password, (bcryptError, check)=>{
                if(bcryptError){
                    res.status(500).send({msg: "Error del servidor"})
                }else if(!check){
                    res.status(400).send({msg: "contraseña incorrecta"})
                }else if(!userStore.active){
                    res.status(401).send({msg: "usuario no autorizado o activo"})
                }else{
                    res.status(200).send({
                        access: jwt.createAccessToken(userStore),
                        refresh: jwt.createRefreshToken(userStore)
                    })
                }
            })
        }
    })
}

function refreshAccessToken(req, res){
    const { token } = req.body

    if(!token) res.status(400).send({msg: "token requerido"})

    const { user_id } = jwt.decoded(token)

    User.findOne({_id: user_id}, (error, userStorage) => {
        if(error){
            res.status(500).send({msg: "Error del servidor"})
        }else{
            res.status(200).send({accessToken: jwt.createAccessToken(userStorage)
            })
        }
    })
}

module.exports = {
    register,
    login,
    refreshAccessToken
}