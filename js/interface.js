/*
 * interface.js
 *
 * ( c ) 2012-2015 Patrick Cardona
 * Dicto version 1.2.0 - AMB Project
 * Gestion des événements de l'interface
 *
 */

/* =================================================================== */
/* LICENCE
/* =================================================================== */
/*
@licstart  The following is the entire license notice for the
    JavaScript code in this page.

Copyright (C) 2012  Patrick CARDONA - A propos

    The JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.

@licend  The above is the entire license notice
    for the JavaScript code in this page.
*/

/* ***************************************** */
/*
 * Gestion effective des données de la dictée
 */

// On définit une variable globale pour la position du curseur dans le texte
var position = 0;

// création objet echo
var echo = new oEcho();
// On charge les données de cet exercice à partir du fichier data.json
	$.getJSON('data.json', function(data) {
		if(data.app_name == "jecho"){
			echo.prof = data.prof;
			echo.titre = data.titre;
			echo.texte = data.texte;
			echo.correction = data.correction;
			echo.auteur = data.auteur;
			echo.ouvrage = data.ouvrage;
			echo.consigne = data.consigne;

			// On actualise les étiquettes à afficher dans l'interface
			$("#titre_principal").html( echo.titre );
			$("#prof").append( echo.prof );
			$("#consigne").html( echo.consigne );
			$("#ouvrage").html( echo.ouvrage );
			$("#auteur").html( echo.auteur );
			// Zone de texte :
			$("#texte").html( echo.texte );

      // var ok = generate ('success', 'Le fichier de données a correctement été chargé.');


		}
		else{
			var erreur = generate ('error', 'Erreur : le fichier de données comporte une erreur.');
		}
	});

$(document).ready(function(){

	/*
	 * Etat de l'interface par défaut :
	 */
	// On masque la section de correction
	$("#section_2").hide();
	// On masque la section de solution
	$("#section_3").hide();
	// On masque le bouton recommencer
	$("#section_4").hide();
  // Le résumé des outils utilisés dans le logiciel est résumé dans apropos.js
  var msg = apropos.affiche();
  $("#licence").append(msg);
  // Le texte légal se situe dans le fichier lic.js
  $("#licence").append(lic);

	// Animation de l'écran d'accueil : désactivée.
/* Désactivation - début
$("#accueil").hide();
$("#accueil").fadeIn(2000, function() {
	$(this).animate(
			{top: -225},{
			duration: 1000,
		 	easing: 'swing',
			complete: function(){
				$("#logo").animate(
					{width: 0,
					top:0,
					opacity: 0},{
						duration: 2500,
    					easing: 'swing',
    					complete: function(){
    						$(this).fadeOut(500);
							}
						});

					}
			});
});
Désactivation - fin */

	// Caractères spéciaux

	$(".spec").click(function(){
			var carspec = $(this).text();
			insertion(carspec);
			e.preventDefault();
		});


		// Gestion des boutons
	$("input:submit").click(function(e){
		var instruction = $(this).val();
		switch ( instruction ){

			case "Aide":
				// Aide contextuelle
					var info = generate('information', "<p>Placez le curseur à l'endroit désiré, puis cliquez sur un bouton caractère spécial pour l'insérer dans votre texte.&nbsp;&nbsp;&otimes;</p>");
			break;



			case "Corriger le texte":
				echo.saisie = $("#texte").val();
				if(echo.saisie.length > 0){
					var correction = echo.corrige();
					if (correction != -1 ){
						$("#correction").html( correction );
						$("#section_2").show();
						$("#section_1").hide();
						$("#section_1_bis").hide();
						$("#section_4").show();
					}
				}else{
					jAlert("Veuillez d'abord saisir le texte.","Erreur : aucun texte saisi");
					return false;
				}
			break;

			case "Afficher la solution":
				$("#solution").html( echo.affiche() );
				$("#section_3").show();
				$("#section_1").hide();
				$("#section_1_bis").hide();
				$("#section_2").hide();
				$("#section_4").show();
			break;

			case "Recommencer":

        noty({
          text: 'Voulez-vous vraiment tout recommencer ?',
          buttons: [
          {addClass: 'btn btn-primary', text: 'Ok', onClick: function($noty) {

          // this = button element
          // $noty = $noty element

              $noty.close();
              $("#texte").val( echo.texte );
              $("#section_2").hide();
              $("#section_3").hide();
              $("#section_4").hide();
              $("#section_1").show();
              $("#section_1_bis").show();
            }
          },
				{addClass: 'btn btn-danger', text: 'Annuler', onClick: function($noty) {
            $noty.close();
            // on continue
          }
        }
        ]
      });
			break;

			case "Reprendre":
				$("#section_2").hide();
				$("#section_3").hide();
				$("#section_4").hide();
				$("#section_1").show();
				$("#section_1_bis").show();
			break;

			default:
			var erreur = generate ('error', "Aucune action définie !");
		}
		e.preventDefault(); // pour empêcher la soumission effective du formulaire.
	});

});
