const express = require  ('express');
const router = express.Router();
const vuelo = require('../modelo/modeloVuelo');
const sillas = require('../modelo/modeloSillas')
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const xoAuth2= require('xoauth2')
const destinos = require('../modelo/modeloDestinos')
const todo = require('../modelo/modeloTodo')
const controladorUsuario = require('../controladores/usuario')
const pdf = require('html-pdf');
const cuerpopdf = require('../modelo/tiquete'); // en esta linea estamos almacenando los archichivos html
var promise;

router.post('/registrar', controladorUsuario.registrar)
router.post('/entrar', controladorUsuario.entrar)

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


//agregar POST (create)
router.get('/crearSillas',(req, res) => {
    const nuevasSillas= new sillas()

    for(i=0;i<47;i++){
        nuevasSillas.PrimeraClase.push({"silla":true})
    }

    for(i=0;i<93;i++){
        nuevasSillas.Ejecutivo.push({"silla":true})
    }

    for(i=0;i<187;i++){
        nuevasSillas.Economica.push({"silla":true})
    }

    for(i=0;i<140;i++){
        nuevasSillas.Turistica.push({"silla":true})
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
        json[clave] = {"silla":false};
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
        json[clave] = {"silla":false};
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
        json[clave] = {"silla":false};
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
        json[clave] = {"silla":false};
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

// get de el modelo de los destinos turisticos
router.get('/tasks/:pais', (req, res, next) => {
    //db.collection.find()
    destinos.find({pais : req.params.pais  }).then((todo2) => {
        res.send(todo2)
    }).catch(next)
})


router.get('/comidas', (req, res, next) => {
    //db.collection.find()
    comidas.find({ }).then((todo2) => {
        res.send(todo2)
    }).catch(next)
})

//bueno para pponer un post
router.post('/tasks/comidas', (req, res, next) => {
    //db.collection.insert( documento )
    //req.body -> hace referencia al json documento = {nombre:"", año:"", activa:""}
    comidas.create(req.body).then((todo2) => {
        res.send(todo2)
    }).catch(next)
})

// este es el post para los autos

router.post('/autos', (req, res, next) => {
    //db.collection.insert( documento )
    //req.body -> hace referencia al json documento = {nombre:"", año:"", activa:""}
    autos.create(req.body).then((todo2) => {
        res.send(todo2)
    }).catch(next)
})

//este es el metodo get para llamar a los  atuos.

router.get('/autos', (req, res, next) => {
    //db.collection.find()
    autos.find({ }).then((todo2) => {
        res.send(todo2)
    }).catch(next)
})



//este es el post para los destinos turisticos
router.post('/tasks/destinos', (req, res, next) => {
    //db.collection.insert( documento )
    //req.body -> hace referencia al json documento = {nombre:"", año:"", activa:""}
    destinos.create(req.body).then((todo2) => {
        res.send(todo2)
    }).catch(next)
})




// buscar por algun destinos
// router.get('/tasks/:pais', (req, res, next) => {
//     //db.collection.find()
//   destinos.find(req.params.pais).then((todo2) => {
//         res.send(todo2)
//     }).catch(next)
// })

//busca segund el pais
router.get('/tasks/:pais2', async (req, res) => {
    const task = await Task.findById(req.params.pais);
    console.log(req.params.pais)
    res.json(task);
});


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
    promise= new Promise((resuelve, rechaza)=>{
        pdf.create(cuerpopdf(req.body.info), {}).toFile('../tiquete.pdf', (err) => {
            if(err) {
                rechaza();
            }
            resuelve()// si no hay error en la creaccion se devuelve la promesa y es cuando react
        });
    }).then(()=>{
        console.log(req.body.receptor)
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

        // Configuracion del email
        let mailOptions = {
            from: '<valhallaairlines@gmail.com>', // Direccion del que envia
            to: req.body.receptor, // lista de receptores
            subject: 'Confirmacion de tiquetes', // Asunto
            text: '', // Texto plano
            html: mensaje ,
            attachments:[{
                filename:'tiquete.pdf',
                path:'../tiquete.pdf'
            }]// html body
        };

        // Enviar el email con el objeto a transportar
        transportador.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Hola '+error);
            }
            console.log('Mensaje enviado: %s', info.messageId);
            console.log('URL: %s', nodemailer.getTestMessageUrl(info));

            res.send('El mensaje ha sido enviado');
        });
    }).catch((err)=>{
        console.log(err.message)
    })
})



//Eliminar - Delete

router.delete('/vuelo/:id', (req, res, next) => {
    Bandas.findOneAndRemove({ _id: req.params.id }).then((band) => {
        res.send(banda)
    }).catch(next)
});


// Traer sillas
router.get('/traersillas', (req, res, next) => {
    //db.collection.find()
  sillas.find({ _id:'5da6a32e328b501c2220c34b'}).then((vuelo) => {
        res.send(vuelo[0])
    }).catch(next)
})





module.exports = router
