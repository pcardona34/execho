/* curseur.js */
/* Permet d'insérer du code dans une zone de texte */

/* D'après un article de Torsten Anacker, traduit de l'allemand par SelfHTML */
/* J'ai réduit et simplifié le code pour Firefox ou tout navigateur récent avec Gecko */

function insertion(repdeb) {
  var input = document.forms['formulaire'].elements['saisie'];
  input.focus();
  
  if(typeof input.selectionStart != 'undefined')
  {
    /* Insertion du code */
    var start = input.selectionStart;
    var end = input.selectionEnd;
    var insText = input.value.substring(start, end);
    input.value = input.value.substr(0, start) + repdeb + input.value.substr(end);
    /* Ajustement de la position du curseur */
    var pos;
    pos = start + repdeb.length;
    input.selectionStart = pos;
    input.selectionEnd = pos;
  }
}
