const { response } = require("express");
const Evento = require("../models/Evento");


const getEventos = async(req, res = response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');

    try {
        res.status(200).json({
            ok: true,
            eventos
        });

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });

    }


}


/* {
    ok:true,
    msg:"geteventos",
} */

const crearEvento = async (req, res = response) => {

    console.log('>> crearEvento, req.uid =', req.uid);
    console.log('>> crearEvento, req.body =', req.body);

    const evento = new Evento(req.body);

    try{
      //console.log(req.body)  
      evento.user = req.uid;  
      const eventoGuardado = await evento.save()

        res.status(201).json({
            ok: true,
            evento: eventoGuardado,
        });


    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });

    }
    
}



    /* {
    ok:true,
    msg:"crearEventos",
} */


const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id;

    try{

        const evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: "Evento no encontrado por id",
            });
        }

        if(evento.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para editar este evento",
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.status(200).json({
            ok: true,
            evento: eventoActualizado,
        });

        

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });

    }

}    
     /* {
    ok:true,
    msg:"actualizarEvento",
} */


const eliminarEvento = async(req, res = response) => {


    const eventoId = req.params.id;

    try{

        const evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: "Evento no encontrado por id",
            });
        }

        if(evento.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para eliminar este evento",
            });
        }


        const eventoEliminado = await Evento.findByIdAndDelete(eventoId, { new: true });

        res.status(200).json({
            ok: true,
            evento: eventoEliminado,
        });

        

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });

    }
}    
    /* {
    ok:true,
    msg:"eliminarEvento",
} */

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}