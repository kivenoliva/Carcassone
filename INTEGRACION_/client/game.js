var sprites = {

    1: { sx: 198, sy: 458, w: 64, h: 64},   //madre
    
    2: { sx:0 , sy: 64, w: 64, h: 64}, 
    
    3: { sx: 918, sy: 264, w: 64, h: 64}, 
    
    4: { sx:722 , sy: 394, w: 64, h: 64},
    
    S5: { sx: 133, sy: 591, w: 64, h: 64}, 
    
    C5: { sx: 263, sy: 524, w: 64, h: 64},   
    
    S6: { sx: 591, sy: 328, w: 64, h: 64}, 
    
    C6: { sx: 657, sy: 526, w: 64, h: 64},  
    
    7: { sx: 918, sy: 198, w: 64, h: 64}, 
        
    8: { sx:722 , sy: 525, w: 64, h: 64},
    
    9: { sx: 788, sy: 66, w: 64, h: 64}, 
    
    S10: { sx: 264, sy: 459, w: 64, h: 64}, 
    
    C10: { sx: 1, sy: 328, w: 64, h:64},    
    
    S11: { sx: 330, sy: 459, w: 64, h: 64}, 
    
    C11: { sx: 330, sy: 0, w: 64, h: 64}, 
    
    S12: { sx: 460, sy: 590, w: 64, h: 64},
        
    C12: { sx: 657, sy: 328, w: 64, h: 64},
    
    13: { sx:723 , sy: 65, w: 64, h: 64}, // De este tipo de pieza solo hay una con escudo.
    
    14: { sx: 0, sy: 0, w: 64, h: 64}, 
    
    15: { sx:918 , sy: 394, w: 64, h: 64}, 
    
    16: { sx:786 , sy: 460, w: 64, h: 64}, 
    
    17: { sx:590 , sy: 590, w: 64, h: 64}, 
    
    18: { sx:526 , sy: 458, w: 64, h: 64}, 
    
    19: { sx:852 , sy: 460, w: 64, h: 64}, 
        
         
    sn:{ sx:989, sy:6, w:17, h:17}, //Seguidor negro
    sa:{ sx:1018, sy:5, w:17, h:17}, //Seguidor amarillo
    sb:{ sx:1049, sy:4, w:17, h:17}, //Seguidor blanco
    sr:{ sx:1077, sy:4, w:17, h:17}, //Seguidor rojo
    sblue:{ sx:1104, sy:4, w:17, h:17}, //Seguidor azul 
};


board = new TableroJuego();
otrapieza = true;
//TextoPidePieza = new TextoPideFicha("Pulsa enter para pedir ficha ",playGame);
var piezaactual = new PiezaActual();
var cuadriculaS = new cuadriculaSeguidor();
DejarScroll =false;
//
var xIA;//estas variables globales son para los calculos de la casilla en la que se pone la ficha para pasarselo a IA
var yIA;//estas variables globales son para los calculos de la casilla en la que se pone la ficha para pasarselo a IA
var xprima = 64;//estas variables globales son para los calculos de la casilla en la que se pone la ficha para pasarselo a IA
var yprima = 64;//estas variables globales son para los calculos de la casilla en la que se pone la ficha para pasarselo a IA
var xIAprima = 0;//estas variables globales son para los calculos de la casilla en la que se pone la ficha para pasarselo a IA
var yIAprima = 0;//estas variables globales son para los calculos de la casilla en la que se pone la ficha para pasarselo a IA
var scrollxprima = 0;//estas variables globales son para los calculos de la casilla en la que se pone la ficha para pasarselo a IA
var scrollyprima = 0;//estas variables globales son para los calculos de la casilla en la que se pone la ficha para pasarselo a IA
//
var JugadoresIA = []    //variable global para cuando IA nos pasa los jugadores
User_IdIA = "";
rotacionTracker = [];
xTracker = 0;
yTracker = 0;
xsegTracker = 0;
ysegTracker = 0;
colocadaTracker = false;
colocadoSegTracker = false;
ladoScrollTracker = "";
contadorScroll = 0;
id_partida = 0;

var startGame = function() {

    Game.setBoard(0,new cuadricula());
    Game.setBoard(1,new Jugadores(JugadoresIA));       
    Game.setBoard(3,new AyudaScreen("Pulsa espacio para ayuda"));
    //Meteor.call("dameFichaMadre");
    board.add(new PiezaMadre("1", 5*64, 5*64)); //Pieza madre que siempre esta puesta cuando empieza el juego
    console.log(Meteor.userId());
    if(Meteor.userId() === User_IdIA){
	DejarScroll =true;
        Game.setBoard(2,new TextoPideFicha("Pulsa enter para pedir ficha ",playGame));
        //board.add(TextoPidePieza);
    }
    board.add(new ScrollTeclas());
    Game.setBoard(5,board);
   
    
}


playGame = function() {

  if(otrapieza){
	
    pedirPieza();
    console.log("termina Pide Pieza");
    

  }
  
}

var pedirPieza = function () {

	Meteor.call('dameFicha',id_partida, function (error, result) {
	console.log("entra a meteor.call");
	    var arg;
	    //Esta mal sin terminar porque no sabemos todavia con exactitud que nos va a devolver la IA
	    if((result.tipo === 5) || (result.tipo === 6) || (result.tipo === 10) || (result.tipo === 11) || (result.tipo === 12)){
	    
	        if (result.escudo == true){
	            arg = "C" + result.tipo.toString();
	            console.log(arg);
	        }else{
	            arg = "S" + result.tipo.toString();
	        }
	    
	    }else{
	    
	        arg = result.tipo.toString();
	        
	    }
	    
		
		var piezaNueva = new pieza (arg, 11.5*64, 8*64);
		board.add(piezaNueva);
		console.log("AÑADIDA PRIMERA PIEZA");
		//Hacemos update para que los demas clientres pinten la pieza que pide el del turno				
		obj = Turno.findOne({});
		//console.log(obj);
		
		Turno.update(obj._id,{$set: {Comando: "PedirPieza", nombrePieza:arg ,scroll:false}});  
		console.log("Termina meteor.call");
					
	});
	
	
}

var PiezaMadre = function (nombre, x, y){

  this.x = x;
  this.y = y;
  this.w = 64;
  this.h = 64;
  this.nombre = nombre;

 
  this.type = "pieza";

  
  this.step = function(dt) {
  
                  
	
  }
  
  this.draw = function(ctx) {

	  SpriteSheet.draw(Game.ctx, nombre, this.x, this.y,this.giro,this.numgiro,1);
  };	

}


var Seguidor = function (x, y){

    this.x = x;
    this.y = y;
    this.type = "pieza";              // le dejamos mismo tipo que pieza porque en el draw nos interesa que actue igual en algunas cosas

    this.step = function(dt) {           

    }
  
    this.draw = function(ctx) {
        SpriteSheet.draw(Game.ctx, "sr", this.x, this.y, false, 0, 1);
    };	

}



pieza = function (nombre, x, y){
    this.x = x;
    this.y = y;
    this.w = 64;
    this.h = 64;
    this.nombre = nombre;
    piezaactual.nombre = nombre;
    var colocada = false;
    var noDejan = false;
    this.giro = false;
    piezaactual.giro= false;
    this.numgiro = 0;
    var giroIA = 0;
    piezaactual.ngiro= 0;
    this.type = "pieza";
    this.scroll = false;
    this.primeravez = true;
    this.primer = 0;
    
    
    this.step = function(dt) {
    //console.log("colocada = " + colocada);
    if (!colocada){
        otrapieza = false;
         
        if(Meteor.userId() === User_IdIA){
            game.onmousedown = function(e){
            if(e.which == 1){
                if (!colocada){//límite(76-644)para la x, (167-674) para la y
                    mX = (e.pageX);
                    mY = (e.pageY);
                    if(mX<76||mX>644 ||mY<167 || mY>674){
					    alert('No puedes colocar la pieza ahí!');
			        }else{
				        cX =Math.floor((mX-5)/64);
				        cY = Math.floor((mY-114)/64);				   
				        x = (cX *64);
				        y = (cY * 64);

              			// Para quedarnos con la casilla del tablero donde nos pinchan, para pasarselo a IA.
				        for (i=1;i<9;i++){//
					        xprima = 64;
		           		 	for (j=1;j<10;j++){
						    xIAprima = scrollxprima+xprima/64;
						    yIAprima = scrollyprima+yprima/64;
						    xprima += 64;
					      	if(cX == j && cY == i){
							    xIA = xIAprima;
							    yIA = yIAprima;
							    console.log("giroIA = " + giroIA);
							    console.log("xIA = " + xIA);
							    console.log("yIA = " + yIA);
						    }
					    }
					    yprima += 64;
				       }//
				       
						
				       Meteor.call("ponerFicha",id_partida,giroIA,{x: xIA,y: yIA}, function (error, result) {
				      	if(result){
						    obj = Turno.findOne({Comando:"PedirPieza"});
						    Turno.update(obj._id,{$set: {Comando:"ColocarPieza",posx: x, posy:y,scroll:false }});  
						    board.add(piezaactual);
						    board.add(cuadriculaS); 
						    DejarScroll = false;    //cuando estamos esperando a que pulsen una tecla para elegir la posicion donde colocar el seguidor se mete dibujo para colocar seguidor no se puede mover el scroll
						    board.add(new ColocarSeguidor(x, y)); 
						    colocada = true;	
					    }else{
						    noDejan = true;
						    alert('No puedes colocar la pieza ahí!');
					    }
				       });
				       xIAprima = 0;
				       yIAprima = 0;
				       xprima = 64;
				       yprima = 64;
				
			       }
		      }
		         
           }
        }   
        //else{miramos la variable global y con esos datos modificamos x e y del objeto pieza y ponemos colocada a true y la variable global la 
        //ponemos a false     
              
	    if(Game.keys['giro']){
		
			    this.giro = true;
			    piezaactual.giro = true;
			    this.numgiro++;
			    giroIA++;
			    piezaactual.ngiro++;
			    if(this.numgiro == 4){
				    this.numgiro = 0;
				    giroIA = 0;
				    piezaactual.ngiro = 0;
			    }
			    console.log("this.numgiro = " +this.numgiro)
			    
			    obj = Turno.findOne({Comando: "PedirPieza"});
			    
			    Turno.update(obj._id, {$set: {rotacion: true, numRotacion: this.numgiro,scroll:false}});
			    Game.keys['giro'] = false;
	    }
	    	
    }else{
    
        if(rotacionTracker[0]){
            this.giro = true;
            this.numgiro = rotacionTracker[1];
            rotacionTracker[0] = false;
        }else if(colocadaTracker){//si ya no es mi turno, mirar colocadaTracker si esta a true o a false
		x = xTracker;
		y = yTracker;
		board.add(new ColocarSeguidor(x, y))
		colocada = true;
		colocadaTracker = false;
	}
    }
    }
  };
  
  this.draw = function(ctx) {
		  if(colocada && !this.scroll){
			//console.log("como esta colocada cambio el this.x");
			this.x = x;
			this.y = y;
			this.primeravez = false;
			this.primer= 1; //si la colocamos ya no es la primeravez que sale a imagen,lo hago para que si es aun la pieza a 
			this.scroll = true;//colocar pues se pueda pintar fuera de la cuadricula, es decir, si this.primer = 0
					//(ver draw de spritesheet engine)
			 if(Meteor.userId() === User_IdIA){
				alert("Si NO quieres poner seguidor pulsa N.") ; 
			}
		  }
		  if(!this.scroll){//esto es para que si aun la pieza es la que tenemos que colocar al hacer scroll no se mueva
			this.x = x;//si scroll esta a false, la pieza mantiene las coordenadas (11.5*64, 8*64)
			this.y = y;
		  }

		  if(noDejan){
			this.x = 11.5*64;
			this.y = 8*64;
		  	
		  }
	 
	  SpriteSheet.draw(Game.ctx, nombre, this.x, this.y,this.giro,this.numgiro,this.primer);

  };
}


//constructor para inicializar jugadores y pintarlos a un lado....etc
//de momento sin argumentos porque por defecto suponemos los 4 jugadores inicializados al principio
//supongo que luego como argumentos habrá que pasarle los jugadores que nos informen que juagan
Jugadores = function(arrayJugadores){
	colores = ["sr", "sblue", "sa", "sn", "sb"];
  this.step = function(dt) {
        //De momento lo pongo vacio porque solo quiero probar tittle scream
  };
  this.draw = function(ctx) {
/*
		ctx.fillStyle = "#FFFFFF";
	  ctx.font = "bold 27px bangers";
	  ctx.fillText("JUGADORES", 10.5*64,1.5*64);
		arrayJugadores.forEach(function (e, i) {
	  	ctx.font = "bold 17px bangers";
			ctx.fillStyle = "#FFFFFF";
	  	ctx.fillText(e.nombre, 10.5*64,(2+i)*64);
	  	SpriteSheet.draw(Game.ctx, colores[i], 12.5*64, (1.75+i)*64,false,0,0);
			ctx.font = "bold 14px bangers";
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText("puntos", 10.7*64, (2.3+i)*64);
			ctx.fillStyle = "#FF0000";
			ctx.fillText(e.puntos, 11.6*64, (2.3+i)*64);
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText("seguidores", 12.3*64, (2.3+i)*64);
			ctx.fillStyle = "#FF0000";
			ctx.fillText(e.seguidores, 13.7*64, (2.3+i)*64);
		});
*/ 
  };
}

var cuadricula = function(){
    this.step = function(dt) {
        
    };
    this.draw = function(ctx) {
      //Pantalla que va a aparecer DESPUES de pulsar espacio
      var img1 = new Image();
      var img2 = new Image();
      img1.src = 'background.jpg';
      img2.src = 'menu.jpg';
      Game.ctx.drawImage(img1, 50, 50, 655, 650);
      Game.ctx.drawImage(img2, 655, 50, 245, 650);
	    for (i=1;i<9;i++){
        for (j=1;j<10;j++){
          Game.ctx.strokeStyle = "#ffffff";
          Game.ctx.strokeRect(j*64,i*64,64,64);
        }
      }
    };	
}

var ColocarSeguidor = function(x, y) {
    posicion0 = false;
    posicion1 = false;
    posicion2 = false;
    posicion3 = false;
    posicion4 = false;
    posicion5 = false;
    posicion6 = false;
    posicion7 = false;
    posicion8 = false;
    posicion9 = false;
    posicion10 = false;
    posicion11 = false;
    posicion12 = false;
    noseg = false;
    var colocado = false;
    var ActualizarTurno = false;
    this.step = function(dt) {
    
     if(!colocado){ 
	if(Meteor.userId() === User_IdIA){     
		if(Game.keys['pos0']) posicion0 = true;
		if(posicion0 && !Game.keys['pos0']) {                   
		    posicion0 = false;
		    board.remove(piezaactual);  
		    board.remove(cuadriculaS);
		    
		    Meteor.call("ponerSeguidor", id_partida, 0,User_IdIA, function ( error, result) {
		    
		        //if(result[0]){ 
				if (result){                                
	            board.add (new Seguidor (x+7.5, y+2.5));
			    User_IdIA = result[2];
			    JugadoresIA = result[1];
			    obj = Turno.findOne({Comando:"ColocarPieza"});
			    Turno.update(obj._id,{$set: {Comando:"ColocarSeguidor",posxseg: x+7.5, posyseg:y+2.5,scroll:false}});//,Jugadores: JugadoresIA, User_id:  User_IdIA}});	
			        colocado= true;      
			        //otrapieza = true; 
				Game.setBoard(2,new CapaBorra());    
			        DejarScroll = false;
				ActualizarTurno = true;
			    }else{
			        alert("No puedes colocar un seguidor en esa posicion \nPrueba otra");
			        board.add(piezaactual);
						board.add(cuadriculaS); 
			    }
			
		    });
		}
		
		if(Game.keys['pos1']) posicion1 = true;
		if(posicion1 && !Game.keys['pos1']) {
		    posicion1 = false;
		    board.remove(piezaactual);  
		    board.remove(cuadriculaS);
		    
		    Meteor.call("colocar_seguidor",[1], function (error, result) {
		    
		        if(result[0]){                                      
		            board.add (new Seguidor (x+22, y+2.5));
				User_IdIA = result[2];
			    JugadoresIA = result[1];
			    obj = Turno.findOne({Comando:"ColocarPieza"});
			    Turno.update(obj._id,{$set: {Comando:"ColocarSeguidor",posxseg: x+22, posyseg:y+2.5,scroll:false}});
			        colocado= true;      
			        //otrapieza = true;
				Game.setBoard(2,new CapaBorra());     
			        DejarScroll = false;
					ActualizarTurno = true;
			    }else{
			        alert("No puedes colocar un seguidor en esa posicion \nPrueba otra");
			        board.add(piezaactual);
						board.add(cuadriculaS); 
			    }
			
		    });
		    
		}
		
		if(Game.keys['pos2']) posicion2 = true;
		if(posicion2 && !Game.keys['pos2']) {
		    posicion2 = false;
		    board.remove(piezaactual);  
		    board.remove(cuadriculaS);
		    
		    Meteor.call("colocar_seguidor",[2], function (error, result) {
		    
		        if(result[0]){                                      
		            board.add (new Seguidor (x+41, y+2.5));
				User_IdIA = result[2];
			    JugadoresIA = result[1]; 
			    obj = Turno.findOne({Comando:"ColocarPieza"});
			    Turno.update(obj._id,{$set: {Comando:"ColocarSeguidor",posxseg: x+41, posyseg:y+2.5,scroll:false}});
			        colocado= true;      
			        //otrapieza = true;   
				Game.setBoard(2,new CapaBorra());  
			        DejarScroll = false;
					ActualizarTurno = true;
			    }else{
			        alert("No puedes colocar un seguidor en esa posicion \nPrueba otra");
			        board.add(piezaactual);
						board.add(cuadriculaS); 
			    }
			
		    });
		    
		}
		
		if(Game.keys['pos3']) posicion3 = true;
		if(posicion3 && !Game.keys['pos3']) {
		    posicion3 = false;
		    board.remove(piezaactual);  
		    board.remove(cuadriculaS);
		    
		    Meteor.call("colocar_seguidor",[3], function (error, result) {
		    
		        if(result[0]){                                      
		            board.add (new Seguidor (x+48, y+14.5));
				User_IdIA = result[2];
			    JugadoresIA = result[1]; 
			    obj = Turno.findOne({Comando:"ColocarPieza"});
			    Turno.update(obj._id,{$set: {Comando:"ColocarSeguidor",posxseg: x+48, posyseg:y+14.5,scroll:false }}); 
			        colocado= true;      
			        //otrapieza = true;
				Game.setBoard(2,new CapaBorra());     
			        DejarScroll = false;
					ActualizarTurno = true;
			    }else{
			        alert("No puedes colocar un seguidor en esa posicion \nPrueba otra");
			        board.add(piezaactual);
						board.add(cuadriculaS); 
			    }
			
		    });       
		               
		}
		
		if(Game.keys['pos4']) posicion4 = true;
		if(posicion4 && !Game.keys['pos4']) {
		    posicion4 = false;
		    board.remove(piezaactual);  
		    board.remove(cuadriculaS);
		    
		    Meteor.call("colocar_seguidor",[4], function (error, result) {
		    
		        if(result[0]){                                      
		            board.add (new Seguidor (x+48, y+27));
				User_IdIA = result[2];
			    JugadoresIA = result[1];
			    obj = Turno.findOne({Comando:"ColocarPieza"});
			    Turno.update(obj._id,{$set: {Comando:"ColocarSeguidor",posxseg: x+48, posyseg:y+27,scroll:false }});
			        colocado= true;      
			        //otrapieza = true; 
				Game.setBoard(2,new CapaBorra());    
			        DejarScroll = false;
					ActualizarTurno = true;
			    }else{
			        alert("No puedes colocar un seguidor en esa posicion \nPrueba otra");
			        board.add(piezaactual);
						board.add(cuadriculaS); 
			    }
			
		    });       
		}
		
		if(Game.keys['pos5']) posicion5 = true;
		if(posicion5 && !Game.keys['pos5']) {
		    posicion5 = false;
		    board.remove(piezaactual);  
		    board.remove(cuadriculaS);
		    
		    Meteor.call("colocar_seguidor",[5], function (error, result) {
		    
		        if(result[0]){                                      
		            board.add (new Seguidor (x+48, y+39));
				User_IdIA = result[2];
			    JugadoresIA = result[1];
			    obj = Turno.findOne({Comando:"ColocarPieza"});
			    Turno.update(obj._id,{$set: {Comando:"ColocarSeguidor",posxseg: x+48, posyseg:y+39,scroll:false }});
			        colocado= true;      
			        //otrapieza = true;
				Game.setBoard(2,new CapaBorra());     
			        DejarScroll = false;
					ActualizarTurno = true;
			    }else{
			        alert("No puedes colocar un seguidor en esa posicion \nPrueba otra");
			        board.add(piezaactual);
						board.add(cuadriculaS); 
			    }	        
		    });       

		                   
		}
		
		if(Game.keys['pos6']) posicion6 = true;
		if(posicion6 && !Game.keys['pos6']) {
		    posicion6 = false;
		    board.remove(piezaactual);  
		    board.remove(cuadriculaS);
		    
		    Meteor.call("colocar_seguidor",[6], function (error, result) {
		    
		        if(result[0]){                                      
		            board.add (new Seguidor (x+40, y+48));
				User_IdIA = result[2];
			    JugadoresIA = result[1];
			    obj = Turno.findOne({Comando:"ColocarPieza"});
			    Turno.update(obj._id,{$set: {Comando:"ColocarSeguidor",posxseg: x+40, posyseg:y+48,scroll:false }});
			        colocado= true;      
			        //otrapieza = true; 
				Game.setBoard(2,new CapaBorra());    
			        DejarScroll = false;
					ActualizarTurno = true;
			    }else{
			        alert("No puedes colocar un seguidor en esa posicion \nPrueba otra");
			        board.add(piezaactual);
						board.add(cuadriculaS); 
			    }	        
		    });    
		}
		
		if(Game.keys['pos7']) posicion7 = true;
		if(posicion7 && !Game.keys['pos7']) {
		   posicion7 = false;
		   board.remove(piezaactual);  
		   board.remove(cuadriculaS);
		   
		   Meteor.call("colocar_seguidor",[7], function (error, result) {
		    
		        if(result[0]){                                      
		            board.add (new Seguidor (x+22, y+48));
				User_IdIA = result[2];
			    JugadoresIA = result[1];
			    obj = Turno.findOne({Comando:"ColocarPieza"});
			    Turno.update(obj._id,{$set: {Comando:"ColocarSeguidor",posxseg: x+22, posyseg:y+48,scroll:false }});
			        colocado= true;      
			        //otrapieza = true;
				Game.setBoard(2,new CapaBorra());     
			        DejarScroll = false;
					ActualizarTurno = true;
			    }else{
			        alert("No puedes colocar un seguidor en esa posicion \nPrueba otra");
			        board.add(piezaactual);
						board.add(cuadriculaS); 
			    }	        
		    });    
		}
		
		if(Game.keys['pos8']) posicion8 = true;
		if(posicion8 && !Game.keys['pos8']) {
		    posicion8 = false;
		    board.remove(piezaactual);  
		    board.remove(cuadriculaS);
		    
		    Meteor.call("colocar_seguidor",[8], function (error, result) {
		    
		        if(result[0]){                                      
		            board.add (new Seguidor (x+7.5, y+48));
				User_IdIA = result[2];
			    JugadoresIA = result[1];
			    obj = Turno.findOne({Comando:"ColocarPieza"});
			    Turno.update(obj._id,{$set: {Comando:"ColocarSeguidor",posxseg: x+7.5, posyseg:y+48,scroll:false }});
			        colocado= true;      
			        //otrapieza = true; 
				Game.setBoard(2,new CapaBorra());    
			        DejarScroll = false;
					ActualizarTurno = true;
			    }else{
			        alert("No puedes colocar un seguidor en esa posicion \nPrueba otra");
			        board.add(piezaactual);
						board.add(cuadriculaS); 
			    }	        
		    });    
		}
		
		if(Game.keys['pos9']) posicion9 = true;
		if(posicion9 && !Game.keys['pos9']) {
		    posicion9 = false;
		    board.remove(piezaactual);  
		    board.remove(cuadriculaS);
		    
		    Meteor.call("colocar_seguidor",[9], function (error, result) {
		    
		        if(result[0]){                                      
		            board.add (new Seguidor (x, y+39));
				User_IdIA = result[2];
			    JugadoresIA = result[1];
			    obj = Turno.findOne({Comando:"ColocarPieza"});
			    Turno.update(obj._id,{$set: {Comando:"ColocarSeguidor",posxseg: x, posyseg:y+39,scroll:false }});
			        colocado= true;      
			        //otrapieza = true; 
				Game.setBoard(2,new CapaBorra());    
			        DejarScroll = false;
					ActualizarTurno = true;
			    }else{
			        alert("No puedes colocar un seguidor en esa posicion \nPrueba otra");
			        board.add(piezaactual);
						board.add(cuadriculaS); 
			    }	        
		    });    
		}
		
		if(Game.keys['pos10']) posicion10 = true;
		if(posicion10 && !Game.keys['pos10']) {
		    posicion10 = false;
		    board.remove(piezaactual);  
		    board.remove(cuadriculaS);
		    
		    Meteor.call("colocar_seguidor",[10], function (error, result) {
		    
		        if(result[0]){                                      
		            board.add (new Seguidor (x, y+27));
				User_IdIA = result[2];
			    JugadoresIA = result[1];
			    obj = Turno.findOne({Comando:"ColocarPieza"});
			    Turno.update(obj._id,{$set: {Comando:"ColocarSeguidor",posxseg: x, posyseg:y+27,scroll:false }});
			        colocado= true;      
			        //otrapieza = true;
				Game.setBoard(2,new CapaBorra());     
			        DejarScroll = false;
					ActualizarTurno = true;
			    }else{
			        alert("No puedes colocar un seguidor en esa posicion \nPrueba otra");
			        board.add(piezaactual);
						board.add(cuadriculaS); 
			    }	        
		    });    
		          
		}
		
		if(Game.keys['pos11']) posicion11 = true;
		if(posicion11 && !Game.keys['pos11']) {
		    posicion11 = false;
		    board.remove(piezaactual);  
		    board.remove(cuadriculaS);
		    
		    Meteor.call("colocar_seguidor",[11], function (error, result) {
		    
		        if(result[0]){                                      
		            board.add (new Seguidor (x, y+14.5));
				User_IdIA = result[2];
			    JugadoresIA = result[1];
			    obj = Turno.findOne({Comando:"ColocarPieza"});
			    Turno.update(obj._id,{$set: {Comando:"ColocarSeguidor",posxseg: x, posyseg:y+14.5 ,scroll:false}});
			        colocado= true;      
			        //otrapieza = true;  
				Game.setBoard(2,new CapaBorra());   
			        DejarScroll = false;
					ActualizarTurno = true;
			    }else{
			        alert("No puedes colocar un seguidor en esa posicion \nPrueba otra");
			        board.add(piezaactual);
						board.add(cuadriculaS); 
			    }	        
		    });          
		}
		
		if(Game.keys['pos12']) posicion12 = true;
		if(posicion12 && !Game.keys['pos12']) {
		    posicion12 = false;
		    board.remove(piezaactual);  
		    board.remove(cuadriculaS);
		    
		    Meteor.call("colocar_seguidor",[12], function (error, result) {
		    
		        if(result[0]){                                      
		            board.add (new Seguidor (x+24, y+27));
				User_IdIA = result[2];
			    JugadoresIA = result[1];
			    obj = Turno.findOne({Comando:"ColocarPieza"});
			    Turno.update(obj._id,{$set: {Comando:"ColocarSeguidor",posxseg: x+24, posyseg:y+27,scroll:false }});
			        colocado= true;      
			        //otrapieza = true;
				Game.setBoard(2,new CapaBorra());    
			        DejarScroll = false;
					ActualizarTurno = true;
			    }else{
			        alert("No puedes colocar un seguidor en esa posicion \nPrueba otra");
			        board.add(piezaactual);
				board.add(cuadriculaS); 
			    }	        
		    });            
		}
		
		if(Game.keys['NOSeguidor']) noseg = true;
		if(noseg && !Game.keys['NOSeguidor']) {
		    noseg = false;
		    board.remove(piezaactual);  
		    board.remove(cuadriculaS);
		    
		    Meteor.call("colocar_seguidor", function (error, result) {
			    obj = Turno.findOne({Comando:"ColocarPieza"});
			    Turno.update(obj._id,{$set: {Comando:"ColocarSeguidor",posxseg: 0, posyseg:0,scroll:false }});
			    colocado= true;
			    //otrapieza = true;
			    //falta hacer update con x e y igual a 0
			    //Recordatorio, 14-1-2015 tiene adri guardado lo de borrar seguidores.
			    Game.setBoard(2,new CapaBorra());
			    DejarScroll = false;
		        //NO HAY     
		    });     
		}else{
			if(colocadoSegTracker){
				if(xsegTracker != 0 && ysegTracker != 0){
					board.add (new Seguidor (xsegTracker, ysegTracker));
					colocado= true;
					colocadoSegTracker = false;
				}else{
					colocado= true;
					colocadoSegTracker = false;
				}
		}
	}
      } 
     }else if(ActualizarTurno){
	obj = Turno.findOne({Comando:"ColocarSeguidor"});
	Turno.update(obj._id,{$set: {Comando:"ActualizarTurno",Jugadores: JugadoresIA, User_id:  User_IdIA,scroll:false}});	
	ActualizarTurno = false;
     }
    }
        
    this.draw = function(ctx) {
        
    }
}


var ScrollTeclas = function() {

    this.width = 140;
    this.height = 140;
    this.scrollx = 45;
    this.scrolly = 45;

    var izq = false;
    var der = false;
    var arriba = false;
    var abajo = false;


    this.draw = function (ctx) {
        ctx.save();
        for(var y=0; y<=550; y=y+64){
            for(var x=0; x<=600; x=x+64){
                ctx.fillText((this.scrollx+x/64) + ".",7+x,11+y);
                ctx.fillText((this.scrolly+y/64),32+x,11+y);
            };
        };

        ctx.restore();
    }
    
    this.step = function(dt) {
    
        if (DejarScroll){
    		if(Meteor.userId() === User_IdIA){
			if(!Game.keys['left']) izq = true;
			if(izq && Game.keys['left']) {
			    izq = false;
			    if (this.scrollx != 0) {
				this.scrollx -= 1;
				this.board.translateScroll(1,0);
			    }
			//ScrollTracker = true;
			contadorScroll++;
			obj = Turno.findOne({});
			Turno.update(obj._id,{$set: {scroll:true,ladoscroll:"izq",contador: contadorScroll}});
			    
			}
		
			if(!Game.keys['right']) der = true;
			if(der && Game.keys['right']) {
			    der = false;
			    if (this.scrollx != this.width) {
				this.scrollx += 1;
				this.board.translateScroll(-1,0);

			    }
			   //ScrollTracker = true;
			   contadorScroll++;
			   obj = Turno.findOne({});
			   Turno.update(obj._id,{$set: {scroll:true,ladoscroll:"der",contador: contadorScroll }});
			}
		
			if(!Game.keys['up']) arriba = true;
			if(arriba && Game.keys['up']) {
			    arriba = false;
			    if (this.scrolly != 0) {
				this.scrolly -= 1;
				this.board.translateScroll(0,1);

			    }
			   //ScrollTracker = true;
			   contadorScroll++;
			   obj = Turno.findOne({});
			   Turno.update(obj._id,{$set: {scroll:true,ladoscroll:"up",contador: contadorScroll }});
			}
		
			if(!Game.keys['down']) abajo = true;
			if(abajo && Game.keys['down']) {
			    abajo= false;
			    if (this.scrolly != this.height) {
				this.scrolly += 1;
				this.board.translateScroll(0,-1);
			    }
			  //ScrollTracker = true;
			  contadorScroll++;
		    	  obj = Turno.findOne({});
			  Turno.update(obj._id,{$set: {scroll:true,ladoscroll:"down",contador: contadorScroll }});
			}
		
			    scrollxprima = this.scrollx;
		   	    scrollyprima = this.scrolly;
		}else{
			if(ladoScrollTracker == "izq"){
				console.log("entra a izq");
				if (this.scrollx != 0) {
					this.scrollx -= 1;
					this.board.translateScroll(1,0);
			   	}
				//ScrollTracker = false;
			}else if(ladoScrollTracker == "der"){
				console.log("entra a der");
				if (this.scrollx != this.width) {
					this.scrollx += 1;
					this.board.translateScroll(-1,0);
			   	}
				//ScrollTracker = false;
			}else if(ladoScrollTracker == "up"){
				console.log("entra a up");
				if (this.scrolly != 0) {
					this.scrolly -= 1;
					this.board.translateScroll(0,1);
			    	}
				//ScrollTracker = false;
			}else if(ladoScrollTracker == "down"){
				console.log("entra a down");
				if (this.scrolly != this.height) {
					this.scrolly += 1;
					this.board.translateScroll(0,-1);
				}
				//ScrollTracker = false;
			}
			scrollxprima = this.scrollx;
		   	scrollyprima = this.scrolly;
			DejarScroll = false;
		}
	}	   
   	   
    }

}

EmpezarTodo = function (id_Partida, arrayJugadores, user_Id) {

	console.log("ID en cliente: " + id_Partida);
    Game.initialize("game",sprites,startGame);       
    JugadoresIA = arrayJugadores;
    User_IdIA = user_Id;
    id_partida = id_Partida;
	
};
/*
EmpezarTodo = function (arrayJugadores) {
    console.log("empezando");
    //Game.initialize("game",sprites,startGame);
};

*/
