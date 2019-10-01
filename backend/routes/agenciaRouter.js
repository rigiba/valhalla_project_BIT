const express = require  ('express');
const router = express.Router();
const vuelo = require('../modelo/modeloVuelo');
<<<<<<< HEAD
const sillas = require('../modelo/modeloSillas')
=======
>>>>>>> 1ffbde7c0610f10d2c003cc6cd8bc813003a546a
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const xoAuth2= require('xoauth2')
<<<<<<< HEAD


const destinos = require('../modelo/modeloDestinos')
const todo = require('../modelo/modeloTodo')


// get de el modelo todo incluido
router.get('/todo', (req, res, next) => {
    //db.collection.find()
  todo.find({  }).then((todo2) => {
        res.send(todo2)
    }).catch(next)
})

//para crear el modelo todo incluido
router.post('/todo', (req, res, next) => {
    console.log(req.body)
    //db.collection.insert( documento )
    //req.body -> hace referencia al json documento = {nombre:"", año:"", activa:""}
    todo.create(req.body).then((todo2) => {
        res.send(todo2)
    }).catch(next)
})

=======
>>>>>>> 1ffbde7c0610f10d2c003cc6cd8bc813003a546a

//agregar POST (create)


router.get('/crearSillas',(req, res) => {
    const nuevasSillas= new sillas()

    for(i=0;i<47;i++){
        nuevasSillas.PrimeraClase.push(false)
    }

    for(i=0;i<93;i++){
        nuevasSillas.Ejecutivo.push(false)
    }

    for(i=0;i<187;i++){
        nuevasSillas.Economica.push(false)
    }

    for(i=0;i<140;i++){
        nuevasSillas.Turistica.push(false)
    }

    nuevasSillas.save().then(()=>{
        console.log(nuevasSillas._id)
        res.send(nuevasSillas._id)
    }
    ).catch((err)=>{
        console.log(err)
        res.send(err)
        }
    )
});

router.post('/sillas',(req, res) => {
    console.log(req.body.PrimeraClase)
    console.log(req.body.Ejecutivo)
    console.log(req.body.Economica)
    console.log(req.body.Turistica)

    req.body.PrimeraClase.forEach((silla)=>{
        var clave = "PrimeraClase."+silla;
        var json = { };
        json[clave] = true;
        var actualizar = { $set: json};
        console.log(actualizar)
        sillas.findOneAndUpdate({ _id: req.body.idAvion},actualizar,false).then(()=>{
            console.log('Silla actualizada')
        }).catch((err)=>{
            console.log(err)
        })
    })

    req.body.Ejecutivo.forEach((silla)=>{
        var clave = "Ejecutivo."+silla;
        var json = { };
        json[clave] = true;
        var actualizar = { $set: json};
        console.log(actualizar)
        sillas.findOneAndUpdate({ _id: req.body.idAvion},actualizar,false).then(()=>{
            console.log('Silla actualizada')
        }).catch((err)=>{
            console.log(err)
        })
    })

    req.body.Economica.forEach((silla)=>{
        var clave = "Economica."+silla;
        var json = { };
        json[clave] = true;
        var actualizar = { $set: json};
        console.log(actualizar)
        sillas.findOneAndUpdate({ _id: req.body.idAvion},actualizar,false).then(()=>{
            console.log('Silla actualizada')
        }).catch((err)=>{
            console.log(err)
        })
    })

    req.body.Turistica.forEach((silla)=>{
        var clave = "Turistica."+silla;
        var json = { };
        json[clave] = true;
        var actualizar = { $set: json};
        console.log(actualizar)
        sillas.findOneAndUpdate({ _id: req.body.idAvion},actualizar,false).then(()=>{
            console.log('Silla actualizada')
        }).catch((err)=>{
            console.log(err)
        })
    })

    res.send("Avion actualizado")
});

router.post('/vuelo', (req, res, next) => {
    //db.collection.insert( documento )
    //req.body -> hace referencia al json documento = {nombre:"", año:"", activa:""}
    vuelo.create(req.body).then((banda) => {
        res.send(banda)
    }).catch(next)
})

// traigame todos los destinos turisticos 2

router.post('/turisticos', (req, res, next) => {
    //db.collection.insert( documento )
    //req.body -> hace referencia al json documento = {nombre:"", año:"", activa:""}
    destinos.create(req.body).then((destinos2) => {
        res.send(destinos2)
    }).catch(next)
})

// traigame todos los destinos turisticos
router.get('/turisticos', (req, res, next) => {
    //db.collection.find()
  destinos.find({  }).then((destinos) => {
        res.send(destinos)
        
    }).catch(next)
})


//consultar -> get  - read

router.get('/vuelo', (req, res, next) => {
    //db.collection.find()
  vuelo.find({  }).then((vuelo) => {
        res.send(vuelo)
    }).catch(next)
})

// anidado
router.get('/vuelo/anidado', (req, res, next) => {
    //db.collection.find()
  vuelo.find({  }).then((vuelo) => {
        res.send(vuelo)
    }).catch(next)
})

//actualizacion dato -> update PUT
//aveiguar como se usa multi:true para actualizar varias lineas

router.put('/vuelo/:id', (req, res, next) => {
    //db.collv ection.uodate ({condicion }, {$set: {}})
    vuelo.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        //db.collection.find({condicion})
        vuelo.findOne({ _id: req.params.id }).then((vuelo) => {
            res.send(vuelo)
        })
    }).catch(next)
})

router.put('/sillas/:id', (req, res, next) => {
    //db.collv ection.uodate ({condicion }, {$set: {}})
    vuelo.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        //db.collection.find({condicion})
        vuelo.findOne({ _id: req.params.id }).then((vuelo) => {
            res.send(vuelo)
        })
    }).catch(next)
})

router.post('/correo',(req,res,next)=>{
    console.log(req.body.receptor)
    console.log(req.body.ticket)
    const mensaje = `
    <h3>Confirmacion de los tiquetes</h3>
    <br>
    <p>Apreciado usuario, adjuntamos los tiquetes para que haga efectivo su vuelo, gracias por volar con nosotros</p>
  `;

    let transportador = nodemailer.createTransport({
        service:'gmail',
        auth: {
            type: "OAuth2",
            user: "valhallaairlines@gmail.com",
            clientId: "124253551329-j2hkma0406pqmipr7iaq1olhhestpelf.apps.googleusercontent.com",
            clientSecret: "44B_vEabuFVKAeLgUDTjIRK9",
            refreshToken: "1/dlkv6QzhjjREl_S0-Nvfwuv7RvC23tiUMEj05nH0_FHsY6NXV0rKrU0mGqRXHVaZ"
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '<valhallaairlines@gmail.com>', // sender address
        to: req.body.receptor, // list of receivers
        subject: 'Confirmacion de tiquetes', // Subject line
        text: '', // plain text body
        html: mensaje ,
        attachments:[{
            filename:'prueba.pdf',
            path:__dirname+'/tickets/'+req.body.ticket
        }]// html body
    };

    // send mail with defined transport object
    transportador.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Hola '+error);
        }
        console.log('Mensaje enviado: %s', info.messageId);
        console.log('URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', {msg:'El mensaje ha sido enviado'});
    });
})


//Eliminar - Delete

router.delete('/vuelo/:id', (req, res, next) => {
    Bandas.findOneAndRemove({ _id: req.params.id }).then((band) => {
        res.send(banda)
    }).catch(next)
});

// anidado
router.get('/sillas/anidado', (req, res, next) => {
    //db.collection.find()
  sillas.find({  }).then((vuelo) => {
        res.send(vuelo)
    }).catch(next)
})

module.exports = router
