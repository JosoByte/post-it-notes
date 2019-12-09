var posX2 = 0;
var posY2 = 0;
var posX = 0;
var posY = 0;
var puesta = false;

    class Nota { //clase nota
      constructor(id) {
        this.id = id;
        this.title = '';
        this.text = '';
        this.date = new Date();
      }
    }
    class ListaNotas { //clase que mantiene a las notas
      constructor() {
        this.id = 0;
        this.notas = []; //donde se almacenan las notas
      }
    }
    class Controlador{ //controlador
      constructor(){
        var self = this; //se define a si mismo, parece redundante pero es necesario.
        this.lista = new ListaNotas(); //crea la lista de notas
        this.newView = new NotaView(this); //crea la view
        this.boton = document.getElementById('boton');
        this.boton.addEventListener('click', function(){
          self.insertarPosit();
        });
        this.elemento;
        if (localStorage.notas){//guarda en local
            this.lista.notas = JSON.parse(localStorage.notas)
        }
      }
      insertarPosit(){
        var title = prompt('Escribe un titulo para la nota');
        this.hora = new Date(); //para poner hora al postit
        this.creada = this.hora.getDate() + '/' + this.hora.getMonth() + '/' + this.hora.getFullYear() + ' ' + this.hora.getHours() + ':' + this.hora.getMinutes() + ':' + this.hora.getSeconds();
        this.lista.notas.push(new Nota(this.lista.id));
        this.newView.nuevaNota(this.lista.id,title,'',this.creada,0);
        localStorage.notas = JSON.stringify(this.lista.notas);

      }
      agarrar(elemento) {
        puesta = true;
        this.elemento = elemento;
      }
      cambiarDatos(e){
        posY2 = e.clientY;
        posX2 = e.clientX;
        posY = parseInt(this.elemento.style.top);
        posX = parseInt(this.elemento.style.left);
      }
      mover(e) {
        //Mueve la nota seleccionada
        if (puesta) {
          this.elemento.style.top = (posY + e.clientY - posY2) + 'px';
          this.elemento.style.left = (posX + e.clientX - posX2) + 'px';
          }
      }
    }
    class NotaView {//view
      constructor(controlador) {
        this.controlador = controlador;
      }
      nuevaNota(id, title = '', text = '', date, color) {
        //Crea una vista para la nota
        var self = this;
        this.notaV = document.createElement('div');
        this.notaV.setAttribute('class', 'nota');
        this.notaV.setAttribute('id', `${id}`);
        this.notaV.setAttribute('style','left: 100px; top: 100px;');
        this.notaV.style.backgroundColor = '#ffff4d';
        document.getElementById('tablero').appendChild(this.notaV);
        this.notaV.setAttribute('onmousedown', 'controlador.agarrar(this); controlador.cambiarDatos(event)');
        this.titleV = document.createElement('h4');
        this.notaV.appendChild(this.titleV);
        this.titleV.style.backgroundColor = '#ffff00';
        this.titleV.innerHTML = title;
        this.textV = document.createElement('textarea');
        this.notaV.appendChild(this.textV);
        this.textV.style.backgroundColor = '#ffff4d';
        this.horaV = document.createElement('p');
        this.notaV.appendChild(this.horaV);
        this.horaV.innerHTML = 'date: ' + date;
        this.boton = document.createElement('button');
        this.boton.setAttribute('type', 'button');
        this.boton.setAttribute('class', 'eliminar');
        this.boton.addEventListener('click', function(){
          self.borrarNota(id);
        });
        this.boton.innerHTML = 'X';
        this.titleV.appendChild(this.boton);
      }
      borrarNota(id){
        //Elimina la nota seleccionada por id
        document.getElementById('tablero').removeChild(document.getElementById(id));
        this.controlador.lista.notas.splice(this.controlador.lista.notas[id], 1);
      }
    }
    window.onload = () => {
    controlador = new Controlador();
        
    }
    window.onmouseup = function(){
        puesta = false;
    }
    document.addEventListener('mousemove', function(e) {
      controlador.mover(event);
    }, false);


    
    

