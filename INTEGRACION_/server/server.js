var mazo;
var tablero;
var partidaPrueba;




    Meteor.publish("turnoIU"); 

    Meteor.publish("all_games", function () {
        return Games.find();
    });

    Meteor.publish("userNames", function() {
        return Meteor.users.find ({}, {fields: {username:1}});
    });

    Meteor.publish("messages_current_game", function (current_game) {
    	return Messages_games.find({game_id: current_game}, {limit:10, sort: {time:-1}});
    });

    Meteor.publish("users_data", function () {
	return Meteor.users.find({},{fields: {nick:1,usr_score:1, played_games:1,won_games:1}});
    });

    Meteor.publish('matches_game', function() {
        return Matches_games.find ({}, {fields: {match_name:1,num_players:1,difficulty:1,owner:1,owner_name:1,score:1,status:1,players_array:1}});  
    });

    Meteor.publish('users_score'), function() {
        return Matches_games.find ({},{fields: {player_name:1,score:1}});
    }

    Messages_games.allow({
    	insert: function(userId, doc){
		// Only authenticated users can insert messages
	        return Meteor.userId();
	    }
    });

    Games.allow({
    	insert: function(userId, doc){
		    return Meteor.userId();
		}
	});

	Matches_games.allow({
		insert: function(userId, doc){
		    return Meteor.userId();
    	},

		remove: function(userId, doc){
		    return Meteor.userId();
    	},

    	update: function(userId, doc){
		    return Meteor.userId();
    	}
	});



Meteor.methods ({    
    
    /*probarPropagacionDePdato: function(idPartida){
        console.log("se van a generar las fichas.");
        var ficha1 = {
                        dato: ['f','f','f','f','r','f','f','f','f','f','r','f', 'r'],
	                    pdato: [3,3,3,3,2,4,4,4,4,4,2,3, 2],
                        aplicarGiro: function(){},
                        numFicha: 2
                     }
        var ficha2 = {
                        dato: ['f','f','f','f','r','f','f','r','f','f','f','f', 'r'],
	                    pdato: [5,5,5,5,3,6,6,3,5,5,5,5, 3],
                        aplicarGiro: function(){},
                        numFicha: 3
                     }
        var ficha3 = {
                        dato: ['f','r','f','f','r','f','c','c','c','f','r','f', 'x'],
	                    pdato: [7,4,8,8,5,9,2,2,2,9,6,7, 1],
                        aplicarGiro: function(){},
                        numFicha: 4,
                        escudo: false
                     }
        var ficha4 = {
                        dato: ['f','r','f','f','r','f','f','r','f','f','r','f', 'x'],
	                    pdato: [10,7,11,11,8,12,12,9,13,13,10,10, 2],
                        aplicarGiro: function(){},
                        numFicha: 5
                     }
        var ficha5 = {
                        dato: ['f','f','f','f','f','f','f','f','f','f','r','f', 'm'],
	                    pdato: [14,14,14,14,14,14,14,14,14,14,11,14, 1],
                        aplicarGiro: function(){},
                        numFicha: 6
                     }
        var ficha6 = {
                        dato:  ['c','c','c','f','f','f','f','f','f','c','c','c', 'f'],
	                    pdato: [3,3,3,15,15,15,15,15,15,3,3,3, 15],
                        aplicarGiro: function(){},
                        numFicha: 7,
                        escudo: false
                     }
        var fichaPoner = {
                        dato:  ['f','f','f','c','c','c','f','r','f','f','r','f', 'r'],
	                    pdato: [16, 16, 16,  4,  4,  4,  16, 12, 17, 17, 12, 16,  12],
                        aplicarGiro: function(){},
                        numFicha: 8,
                        escudo: false
                     }
        var fichaCiudad = {
                        dato:  ['f','f','f','f','r','f','c','c','c','f','r','f', 'r'],
	                    pdato: [18,  18, 18, 18, 13, 19, 5,  5,  5,  19, 13, 18, 13],
                        aplicarGiro: function(){},
                        numFicha: 9,
                        escudo: false
                     }
        console.log("se han generado las fichas.");
        var partida = getPartida(idPartida);
        if (authenticate(partida)){
            partida.tablero.fichaActual = ficha1;
            console.log("se va a poner la ficha1");
            success = partida.tablero.ponerFicha({x:48,y:49},0);
            console.log("se ha puesto la ficha1");
            
            partida.tablero.ponerSeguidor(6,1);
            console.log("se ha puesto seguidor en a ficha 1");
        console.log("\n\n\n\n"); 
        _(partida.listaCampos).each(function(c){
            console.log("campo" + c.id + ":" + c.content);
        });
        _(partida.listaCiudades).each(function(c){
            console.log("ciudad" + c.id + ":" + c.content + " id fichas: " + c.idFichas);
        });
        _(partida.listaCaminos).each(function(c){
            console.log("camino" + c.id + ":" + c.content + " id fichas: " + c.idFichas);
        }) 
        
        console.log("##################### RESUMEN DE PUNTOS ######################");
        _(partida.jugs).each(function(j){
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Jugador: " + j.idJugador + ": " + j.puntos);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% tiene " + j.numSeguidores +" seguidores:")
            }) 
        
            partida.tablero.fichaActual = ficha2;
            console.log("se va a poner la ficha2");
            success = partida.tablero.ponerFicha({x:48,y:50},0);
            console.log("se ha puesto la ficha2");
            
            partida.tablero.ponerSeguidor(4,2);
            console.log("se ha puesto seguidor en a ficha 2");
            
        console.log("\n\n\n\n"); 
        _(partida.listaCampos).each(function(c){
            console.log("campo" + c.idCampo + ":" + c.content);
        });
        _(partida.listaCiudades).each(function(c){
            console.log("ciudad" + c.idCiudad + ":" + c.content);
        });
        _(partida.listaCaminos).each(function(c){
            console.log("camino" + c.idCamino + ":" + c.content + "idFichas: " + c.idFichas);
        }) 
        console.log("\n\n\n\n"); 
         console.log("##################### RESUMEN DE PUNTOS ######################");
        _(partida.jugs).each(function(j){
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Jugador: " + j.idJugador + ": " + j.puntos);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% tiene " + j.numSeguidores +" seguidores:")
            }) 
   
            partida.tablero.fichaActual = ficha3;
            console.log("se va a poner la ficha3");
            success = partida.tablero.ponerFicha({x:48,y:51},0);
            console.log("se ha puesto la ficha3");
            
            partida.tablero.ponerSeguidor();
            console.log("no se ha puesto seguidor en a ficha 3");
            
        console.log("\n\n\n\n"); 
        _(partida.listaCampos).each(function(c){
            console.log("campo" + c.idCampo + ":" + c.content);
        });
        _(partida.listaCiudades).each(function(c){
            console.log("ciudad" + c.idCiudad + ":" + c.content);
        });
        _(partida.listaCaminos).each(function(c){
            console.log("camino" + c.idCamino + ":" + c.content + "idFichas: " + c.idFichas);
        }) 
        console.log("\n\n\n\n"); 
         console.log("##################### RESUMEN DE PUNTOS ######################");
        _(partida.jugs).each(function(j){
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Jugador: " + j.idJugador + ": " + j.puntos);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% tiene " + j.numSeguidores +" seguidores:")
            }) 
   
            partida.tablero.fichaActual = ficha4;
            console.log("se va a poner la ficha4");
            success = partida.tablero.ponerFicha({x:49,y:51},0);
            console.log("se ha puesto la ficha4");
            
            partida.tablero.ponerSeguidor(1,1);
            console.log("no se ha puesto seguidor en a ficha 4");
            
        console.log("\n\n\n\n"); 
        _(partida.listaCampos).each(function(c){
            console.log("campo" + c.idCampo + ":" + c.content);
        });
        _(partida.listaCiudades).each(function(c){
            console.log("ciudad" + c.idCiudad + ":" + c.content);
        });
        _(partida.listaCaminos).each(function(c){
            console.log("camino" + c.idCamino + ":" + c.content + "idFichas: " + c.idFichas);
        }) 
        console.log("\n\n\n\n"); 
         console.log("##################### RESUMEN DE PUNTOS ######################");
        _(partida.jugs).each(function(j){
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Jugador: " + j.idJugador + ": " + j.puntos);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% tiene " + j.numSeguidores +" seguidores:")
            }) 
        
            partida.tablero.fichaActual = ficha5;
            console.log("se va a poner la ficha5");
            success = partida.tablero.ponerFicha({x:50,y:51},0);
            console.log("se ha puesto la ficha5");
            
            partida.tablero.ponerSeguidor(0,2);
            console.log("se ha puesto seguidor en a ficha 5");
            
        console.log("\n\n\n\n"); 
        _(partida.listaCampos).each(function(c){
            console.log("campo" + c.idCampo + ":" + c.content);
        });
        _(partida.listaCiudades).each(function(c){
            console.log("ciudad" + c.id + ":" + c.content + "ladoslibres: " + c.ladosLibres + " CAMPOS DE CIUDAD: " + c.camposAdyacentes);
        });
        _(partida.listaCaminos).each(function(c){
            console.log("camino" + c.id + ":" + c.content  + "ladoslibres: " + c.ladosLibres + "idFichas: " + c.idFichas);
        })  
        console.log("\n\n\n\n"); 
         console.log("##################### RESUMEN DE PUNTOS ######################");
        _(partida.jugs).each(function(j){
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Jugador: " + j.idJugador + ": " + j.puntos);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% tiene " + j.numSeguidores +" seguidores:")
            }) 
      
            partida.tablero.fichaActual = ficha6;
            console.log("se va a poner la ficha6");
            success = partida.tablero.ponerFicha({x:50,y:50},0);
            console.log("se ha puesto la ficha6");
            
            partida.tablero.ponerSeguidor(1,3);
            console.log("se ha puesto seguidor en a ficha 6");
        console.log("\n\n\n\n"); 
        _(partida.listaCampos).each(function(c){
            console.log("campo" + c.idCampo + ":" + c.content);
        });
        _(partida.listaCiudades).each(function(c){
            console.log("ciudad" + c.id + ":" + c.content + "ladoslibres: " + c.ladosLibres + " CAMPOS DE CIUDAD: " + c.camposAdyacentes);
        });
        _(partida.listaCaminos).each(function(c){
            console.log("camino" + c.id + ":" + c.content  + "ladoslibres: " + c.ladosLibres + "idFichas: " + c.idFichas );
        })  
        console.log("\n\n\n\n"); 
         console.log("##################### RESUMEN DE PUNTOS ######################");
        _(partida.jugs).each(function(j){
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Jugador: " + j.idJugador + ": " + j.puntos);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% tiene " + j.numSeguidores +" seguidores:")
            }) 
        
            partida.tablero.fichaActual = fichaPoner;
            console.log("se va a poner la ficha7");
            success = partida.tablero.ponerFicha({x:49,y:50},0);
            console.log("se ha puesto la ficha7");
            
            partida.tablero.ponerSeguidor();
            console.log("no se ha puesto seguidor en a ficha 7");
            
        console.log("\n\n\n\n"); 
        _(partida.listaCampos).each(function(c){
            console.log("campo" + c.idCampo + ":" + c.content);
        });
        _(partida.listaCiudades).each(function(c){
            console.log("ciudad" + c.id + ":" + c.content + "ladoslibres: " + c.ladosLibres + " CAMPOS DE CIUDAD: " + c.camposAdyacentes);
        });
        _(partida.listaCaminos).each(function(c){
            console.log("camino" + c.id + ":" + c.content  + "ladoslibres: " + c.ladosLibres + "idFichas: " + c.idFichas);
        })  
        console.log("\n\n\n\n");  
         console.log("##################### RESUMEN DE PUNTOS ######################");
        _(partida.jugs).each(function(j){
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Jugador: " + j.idJugador + ": " + j.puntos);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% tiene " + j.numSeguidores +" seguidores:")
            }) 
       
            partida.tablero.fichaActual = fichaCiudad;
            console.log("se va a poner la ficha8");
            success = partida.tablero.ponerFicha({x:50,y:49},0);
            console.log("se ha puesto la ficha8");
            
            partida.tablero.ponerSeguidor();
            console.log("no se ha puesto seguidor en a ficha 8");
            
        console.log("\n\n\n\n"); 
        _(partida.listaCampos).each(function(c){
            console.log("campo" + c.id + ":" + c.content);
        });
        _(partida.listaCiudades).each(function(c){
            console.log("ciudad" + c.id + ":" + c.content + "ladoslibres: " + c.ladosLibres + " CAMPOS DE CIUDAD: " + c.camposAdyacentes);
        });
        _(partida.listaCaminos).each(function(c){
            console.log("camino" + c.id + ":" + c.content  + "ladoslibres: " + c.ladosLibres + "idFichas: " + c.idFichas);
        }) 
        console.log("\n\n\n\n");
        
        console.log("##################### RESUMEN DE PUNTOS ######################");
        _(partida.jugs).each(function(j){
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Jugador: " + j.idJugador + ": " + j.puntos);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% tiene " + j.numSeguidores +" seguidores:")
            }) 
            
        partida.recuentoPuntosFinal();
        console.log("##################### RESUMEN FINAL!!!!!! DE PUNTOS ######################");
        _(partida.jugs).each(function(j){
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   Jugador: " + j.idJugador + ": " + j.puntos);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% tiene " + j.numSeguidores +" seguidores:")
            })
        };
        
    },*/
    
	crearPartida: function(id,jugs,num){
		partidaPrueba = generarPartida(id,jugs,num);
        console.log("se ha generado la partida");
        console.log(partidas);
	},
	/*
    generarMazo: function(){
    	//aqui se ha puesto la ficha madre al generar el Mazo.
        mazo = generarMazo();
    },

	dameFichaMadre: function(){
		return mazo.dameFichaMadre();
	},

    generarTablero: function(){
        tablero = generarTablero();
    },*/

    //********************************************************************//
    //                      Interfaz con IU                               //
    //********************************************************************//


    dameFicha: function(id_partida){
		console.log("EN SERVER.JS id_partida es: " + id_partida);
        var partida = getPartida (id_partida);
        console.log("partida: " + partida);
        var fichaIU;
        var ficha = partida.tablero.dameFicha();
        fichaIU = {
        tipo: ficha.tipo,
        escudo: ficha.escudo,
        numFicha: ficha.numFicha
     };
        return fichaIU;
    },
   
    ponerFicha: function(id_partida,giro,posFicha){
        var success = false;
		console.log("LO QUE RECIBIMOS COMO GIRO ES: " + giro);
        var partida = getPartida(id_partida);
        success = partida.tablero.ponerFicha(posFicha,giro);
        return success;
    },

    ponerSeguidor: function(id_partida,posSeguidor,id_jugador){
        var success = false;
        var partida = getPartida(id_partida);
        //success = ponerSeguidor (posSeguidor,Meteor.userId().id);
        success = partida.tablero.ponerSeguidor (posSeguidor,id_jugador);
        //return success[0];
		console.log("1111111111111111111111111111 " + posSeguidor);
		return true;
    },

    generarPartidaPL: function(objetoPartidaPL){
        generarPartida(objetoPartidaPL.idPartida, objetoPartidaPL.arrayJugadores, objetoPartidaPL.numJugadores);
    }
    
    

});

Meteor.startup(function(){
	console.log("Arrancado servidor");
	//generamos una partida para que el cliente pueda probar la interfaz sin problemas de sincronía
	console.log("server: voy a generar una partida");
        generarPartida(0,[{idJugador:"i7A2qukT5nHHBtMZN",nombreJugador:'a'},{idJugador:2,nombreJugador:'b'}],2);
        console.log("server: he generado la partida");
});
