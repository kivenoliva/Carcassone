/****
Subscripcion de las listas o bases de datos creadas en el servidor
****/

    Meteor.subscribe("all_games"); 
    Meteor.subscribe("users_data"); 
    Meteor.subscribe("userNames");
    Meteor.subscribe("user_score");

    Tracker.autorun(function(){
        var current_game = Session.get("current_game");
        Meteor.subscribe("messages_current_game", current_game); // Mensajes del chat del juego
        Meteor.subscribe("matches_game", current_game); // Marcador de las partidas
    });
    

    Meteor.startup(function(){
        Session.set("current_game", "none");

        $('#gamecontainer').hide();
        $('#container').hide();
        $('#waiting_matches').hide();
        $('#player_joined').hide();
        $('#game_features').hide();
        $('#display_match_started').hide();
        $('#tablero').hide();

        $(document).on("click", ".alert .close", function(e) {
            $(this).parent().hide();       
        });      
    });

    var Busy = {OnlyBusy:false,Busy_playing:false,Busy_joined:false};
    var match_name;   
    var reactiva = null;

    var currentUser = null;
		Tracker.autorun(function(){
		console.log("current user: " + currentUser);
		currentUser = Meteor.userId();
		console.log("current user: " + currentUser);
	});




    Template.options.events({                 
        'click #start_game': function () {
            match_name=$('#nombre').val();
		    var score= 0;
		    var status= 'Waiting';
		    var usuid = Meteor.userId();
		    var usu = Meteor.users.findOne(usuid);

            match_object_insert = Matches_games.findOne({match_name:match_name});
		    match_created = Matches_games.findOne({match_name:match_name});
			 //Introducimos el usuario
			var jugador= Object.create(Object.prototype);

            players=[];
			jugador.nombreJugador= usu.username;
			jugador.idJugador= usuid;
			jugador.puntuacion= score;
			players.push(jugador);

		    if (match_created != undefined){ 
		        alert("The name of the match is already used, please, try other.");
		    }else{
			    n_players= parseInt($('input[name=n_players]:checked', '#game_features').val());   
		        $('#game_features').hide();
				
		        Matches_games.insert({
				    id_user: usuid,
		            match_name: match_name,
		            num_players: n_players,
		            owner: usu.username,
		                    //score: score,
		            status: status,
					players_array: players,                   
		        });

			    Busy.OnlyBusy = true;
                $('#waiting_for_players').show();
		                //Meteor.call('add_player',match_name);
             }
        },

        'click #close_options': function () {
            $('#game_features').hide();
            $('#display_matches').show();

            var game = Games.findOne({name:"Carcassonne"});
            Session.set("current_game", game._id);
        },

	    'click #wait_cancel': function () {
            $('#waiting_for_players').hide();
            $('#display_matches').show();

		    match_id = Matches_games.findOne({match_name:match_name});

		    Matches_games.remove(match_id._id)
            alert("Su partida ha sido cancelada satisfactoriamente.");
		    Busy.OnlyBusy = false;
        },

        'click #wait_start': function () {
                $('#waiting_for_players').hide();
		        match_object2 = Matches_games.findOne({match_name:match_name});
                alert("Su partida ha comenzado.");
		        Busy.Busy_Playing = true;
		        Busy.OnlyBusy = false;
		        Matches_games.update(match_object2._id,{$set: {status: "Started"}});
		        $('#display_match_started').show();
                Admin= Meteor.users.findOne(Meteor.userId()).username;
                info_partida = Matches_games.findOne({owner: Admin});
				//Creamos el objeto partida que le vamos a pasar a IA/IU
				var partida = Object.create(Object.prototype);
				partida.idPartida= info_partida._id;
				partida.nombrePartida= info_partida.match_name;
				partida.numJugadores= info_partida.num_players;				
				partida.arrayJugadores= info_partida.players_array;
                //Aqui le pasamos el objeto partida a IA
				Meteor.call("generarPartidaPL",partida, function(error){
                    if(error){
                        alert("No ha sido posible crear la partida");
                    }
                });
		}
    });
                 

    Template.join_match.events({        
        'click button': function (){
            var array_players = [];
            $("#join_match").click(function() {
                            matches_game.insert({
                                 array_player_names: array_players.push({name_player:Meteor.userId()})         
                            });               
            })               
        }
    });


    // Para unirse a un juego (carcassone, alliensInvasion...)
    // Template.join_game.events({
       
    //     'click button': function (){
    //         $("#join_game").click(function() {
    //                     games.insert({
    //                             id_game:id_game,   // obtener el valor de id_game   
    //                             game_type:game_type // obtener el game_type
    //                     });   
    //     			})
    // 			}      
    // });

    Template.puntuaciones.scores = function (){
        var arrayPuntuaciones =  users_score.find({}, { sort: { puntuacion: -1 }});
        puntuations= arrayPuntuaciones;
        return puntuations;    
    }

    //En esta función nos devuelven las puntuaciones
    function partidaTerminada(partida){
        var registroPuntuacion = Object.create(Object.prototype);
        for(i= 0; i< partida.arrayJugadores.length; i++ ){
            users_score.insert({player_name:Partida.arrayJugadores[i].nombreJugador, score: Partida.arrayJugadores[i].puntuacion});
        }
    }

    Template.menu_bar.events = {
        'click #AI_button': function () {
            if(!Busy.OnlyBusy){
                console.log("Template.menu_bar.events");
                $('#container').show();
                $('#gamecontainer').hide();
                $('#waiting_matches').hide();
                var game = Games.findOne({name:"AlienInvasion"});
                Session.set("current_game", game._id);
		    }
        },
        'click #FW_button': function () {
		    if(!Busy.OnlyBusy){
		        $('#container').hide();
			    $('#gamecontainer').show();
			    $('#waiting_matches').hide();
			    var game = Games.findOne({name:"FrootWars"});
			    Session.set("current_game", game._id);
            }
        },
	    'click #CC_button': function () {
	        if(!Busy.OnlyBusy && !Busy.Busy_joined){
		        $('#container').hide();
			    $('#waiting_for_players').hide()
			    $('#gamecontainer').hide();
			    $('#waiting_matches').show();
			    $('#display_matches').show();
			    $('#game_features').hide();
			    var game = Games.findOne({name:"Carcassonne"});
			    Session.set("current_game", game._id);
            }else if(Busy.Busy_joined){
                $('#container').hide();
		        $('#waiting_for_players').hide()
			    $('#gamecontainer').hide();
			    $('#waiting_matches').show();
			    $('#display_matches').hide();
			    $('#game_features').hide();
                $('#player_joined').show();
			    var game = Games.findOne({name:"Carcassonne"});
			    Session.set("current_game", game._id);
            }
        },
        'click #New_G': function () {
            if(!Busy.OnlyBusy && !Busy.Busy_Playing && !Busy.Busy_joined){
                if(Meteor.userId()){
                    $('#container').hide();
                    $('#gamecontainer').hide();
				    $('#game_features').show();
				    $('#waiting_matches').show();
				    $('#waiting_for_players').hide()
		            $('#display_matches').hide();					
		            var game = Games.findOne({name:"Carcassonne"});
				    Session.set("current_game", game._id);            
			    }else{
			        alert('You must be logged in for create a new game');
			    }	         
            }	
        }
	}


	Template.chat.none = function (){
        return Session.get("current_game") == "none";
	}


    Template.draw_matches.matches_Wait = function () {
        var match_waiting_list = Matches_games.find({status: "Waiting"});
        var matches_Wait = [];

        match_waiting_list.forEach(function(m){
            matches_Wait.push({propietario: m.owner , nombre_partida: m.match_name, num_jug: m.num_players});
        });	
        return matches_Wait;		
    }


    Template.draw_matches.events = {
        'click .play_game_button': function () {
            if(Meteor.userId()){
                nombrePartida= this.nombre_partida; 
                jugadoresActual= Matches_games.findOne({match_name:nombrePartida}).players_array.length;
                jugadoresMax= Matches_games.findOne({match_name:nombrePartida}).num_players;
                if(jugadoresActual < jugadoresMax ){				
			        $('#display_matches').hide();
					$('#player_joined').show();	
					var id_insert= Meteor.userId();
					Busy.Busy_joined = true;					     
					var jugador= Object.create(Object.prototype);
					actualizar_jugadores = Matches_games.findOne({match_name:nombrePartida}).players_array;
					id_partida = Matches_games.findOne({match_name:nombrePartida})._id;
					jugador.idJugador = id_insert;	
					jugador.nombreJugador = Meteor.users.findOne(id_insert).username; 
					jugador.puntuacion = 0; 
                    actualizar_jugadores.push(jugador);
					Matches_games.update(id_partida,{$set: {players_array: actualizar_jugadores}});	
                }else{
                    alert("La partida esta llena");
                }
			}else{
				alert("You must be logged in for join a match");
			}
		}
    }


    Template.chat_messages.messages = function () {
        var messagesColl =  Messages_games.find({}, { sort: { time: -1 }});
		var messages = [];

		messagesColl.forEach(function(m){
		    var userName = Meteor.users.findOne(m.user_id).username;
		    messages.push({name: userName , message: m.message});
		});

    	return messages;
    }
    
    Template.chat.gameName = function (){
        var game_id = Session.get("current_game");         
        
        if (game_id)
            var game_name = Games.findOne({_id: game_id}).name; 
            console.log("**************" + game_name);		 
       
        return game_name;
	}

    
    
   // Mostrar la puntuación de cada jugador, a partir de la base de datos de users_data
    // Template.players.players_points = function(){
      
    // 		 var users_data= Users_data.find ({}, {sort: {time:-1}});
    // 		 var list_players = [];
    // 		 users_data.forEach (function (u) {
    // 		     var user = Meteor.users.findOne({_id:partida.usr_id});
    // 		     if(user){
    // 		         list_players.push({puntos: u.usr_score, player:u.nick}) // El         
    // 		     }
    // 		 });
    
    // 	 return list_players;    
    //  }

    Template.input.events = {
        'keydown input#message' : function (event) {
            if (event.which == 13) {
                console.log('has pulsado intro');
		        if (Meteor.userId()){
		            var user_id = Meteor.user()._id;
		            var message = $('#message');
		            if (message.length != 0) {
		                console.log('guardo el mensaje');
		                Messages_games.insert({
		                    user_id: user_id,
		                    message: message.val(),
		                    time: Date.now(),
		                    game_id: Session.get("current_game")
		                });
		                message.val('')
		            }
		        }else{
		            $("#login-error").show();
		        }
		    }
		} 
	}
	
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });

Tracker.autorun(function(){

    reactiva = Turno.find();
    //console.log(reactiva);    
    reactiva.forEach(function(m){
   
        if(m.Comando === "EmpezarPartida" && m.ladoscroll == ""){
            console.log("1111");
			console.log("1111----" + m.id_Partida);
            EmpezarTodo(m.id_Partida, m.Jugadores, m.User_id);
        }
        if(Meteor.userId() != User_IdIA){
		if(!m.scroll){
            if(m.Comando === "PedirPieza"){
                if(!m.rotacion){     //cuando deja de ser mi turno, solo se pinta si m.rotacion esta a false(cambiar este if) 
                                     //Dejar toda la base de datos como esta al principio        
                    console.log("2222") ; 
                    var piezaNueva = new pieza (m.nombrePieza, 11.5*64, 8*64);
                    board.add(piezaNueva);
                }else{
                    rotacionTracker = [m.rotacion, m.numRotacion];
                }
            
            }else if(m.Comando === "ColocarPieza"){
				colocadaTracker = true;
            	xTracker = m.posx;
				yTracker = m.posy;
            } else if (m.Comando === "ColocarSeguidor") {
				colocadoSegTracker = true;
				xsegTracker = m.posxseg;
				ysegTracker = m.posyseg;
                console.log("33333") ; 
                //colocar seguidor 
            }else if (m.Comando === "ActualizarTurno") {
						
				 JugadoresIA = m.Jugadores;
				 User_IdIA = m.User_id;
				 console.log("44444")
				 if(Meteor.userId() === User_IdIA){
						otrapieza = true;
						DejarScroll = true;
				   		Game.setBoard(2,new TextoPideFicha("Pulsa enter para pedir ficha ",playGame));
						console.log("55555") ;
		  		 }
		 		console.log("66666") ;
				Game.setBoard(1,new Jugadores(JugadoresIA));
			}
		}else{
			DejarScroll = true;
			ladoScrollTracker = m.ladoscroll;
			contadorScroll++;
			//ScrollTracker = false;
			console.log("77777")		
	  	}
		}
    });
        
});


Meteor.startup(function(){
    console.log("Arrancado Cliente");
    Meteor.subscribe("turnoIU");
});
/*
Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});*/
