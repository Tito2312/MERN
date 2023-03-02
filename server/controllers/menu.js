const Menu = require("../models/menu")

async function createMenu(req, res){
    const {title, path, order, active,} = req.body

    const menu = new Menu({
        title,
        path,
        order,
        active
    })

    menu.save((error, menuStored) => {
        if (error) {
            res.status(400).send({msg: "error al crear menu"})
        }else{
            res.status(200).send(menuStored)
        }
    })
}

async function getMenus(req, res){
    const {active} = req.query

    let response = null

    if (active === undefined) {
        response = await Menu.find().sort({order: "asc"})
    }else{
        response = await Menu.find({active}).sort({order: "asc"})
    }

    if (!response) {
        res.status(400).send({msg: "error al encontrar menu"})
    }else{
        res.status(200).send(response)
    }
}

async function updateMenu(req, res){
    const {id} = req.params
    const menuData = req.body
    
    Menu.findByIdAndUpdate({_id: id}, menuData, (error)=>{
        if (error) {
            res.status(400).send({msg: "no se ha podido actualizar el menu"})
        }else{
            res.status(200).send({msg: "actualizacion correcta"})
        }
    })
}

async function deleteMenu(req, res){
    const {id} = req.params
    
    const menuData = req.body
    
    Menu.findByIdAndDelete({_id: id}, menuData, (error)=>{
        if (error) {
            res.status(400).send({msg: "no se ha podido eliminar el menu"})
        }else{
            res.status(200).send({msg: "eliminacion correcta"})
        }
    })
}

module.exports = {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu
}