//@ts-check
class TicketManager {
    #precioBaseDeGanancia = 15;
   
    constructor(){
        this.eventos = []
    }
    getEventos(){
        console.log(this.eventos)
        return this.eventos
    }
    buscarEventos(idEvento){
        const eventoEncontrado = this.eventos.find(evento => evento.id == idEvento );
        return eventoEncontrado;
    }
    #generarId(){
        let maxId = 0;
        for(let i=0; i < this.eventos.length; i++){
            const eve = this.eventos[i];
            if(eve.id > maxId)
                maxId = eve.id
        }
        return ++maxId
    }
    agregarEvento(
        nombre, 
        lugar, 
        precio, 
        capacidad, 
        fecha 
        ){
            precio = precio + this.#precioBaseDeGanancia;
            capacidad = capacidad ?? 50;
            fecha = fecha || Date.now();
            // id+=1;
            // let participantes = []
        
        const eventoNuevo = {nombre, lugar, precio, capacidad, fecha, id:this.#generarId()};
        this.eventos = [...this.eventos, eventoNuevo];
    }
   
    agregarUsuario(idDelEvento){

    }
}

const ticketera = new TicketManager();

ticketera.agregarEvento(
    'Sonata Artica',
    'Buenos Aires',
    3500,
    4000,
    Date.now()
);

ticketera.agregarEvento(
    'Sonata Artica',
    'Buenos Aires',
    3500,
    4000,
    Date.now()
);

const busqueda1 = ticketera.buscarEventos(1);
const busqueda2 = ticketera.buscarEventos(2);




console.log(ticketera.eventos)

console.log(busqueda2)