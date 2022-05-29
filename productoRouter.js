const { Router } = require('express');
const { isObject } = require('util');
const ContenedorProductos = require('./ContenedorProductos')



let cont = new ContenedorProductos()


let obj = [
    {
        title: "Thor",
        price: "30€",
        url: "/static/thor.png",
        id: 1
    },
    {
        title: "PsychoDuck",
        price: "20€",
        url: "/static/pyscho.png",
        id: 2
    },
    {
        title: "Rubik",
        price: "25€",
        url: "/static/rubik.png",
        id: 3
    }
]

    ; (() => {
        for (let i = 0; i < obj.length; i++) {
            cont.save(obj[i]);
        }
    })();


const productosRouter = Router()

productosRouter.get('', (req, res) => {

    const data = {
        productos: cont.getAll(),
        activeP: true
    }
    return res.render('productos', data)
})

productosRouter.get('/table', (req, res) => {
    return res.json(cont.getAll())
})

productosRouter.get('/:id', (req, res) => {

    let obj = cont.getByid(+req.params.id)

    if (obj != -1) {
        return res.json(obj)
    } else {
        throw new Error('Error')
    }
})

productosRouter.post('', (req, res) => {
    let obj = req.body
    obj.id = cont.productos.length + 1
    cont.save(obj)

    return res.redirect('/')
})

productosRouter.put('/:id', (req, res) => {
    let obj = cont.updateProduct(req.body, +req.params.id)

    if (obj != -1) {
        return res.json(obj)
    } else {
        throw new Error('Error')
    }
})

productosRouter.delete('/:id', (req, res) => {
    let obj = cont.deleteById(+req.params.id)
    console.log(obj)
    if (obj != -1) {
        return res.status(204).json({})
    } else {
        throw Error('Error')
    }

})


module.exports = productosRouter