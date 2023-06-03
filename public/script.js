// Sélection de l'élément avec la classe "floating-chat"
var element = $('.floating-chat');

// Stockage local
var myStorage = localStorage;

// Vérifie si l'ID de chat est déjà stocké dans le localStorage
if (!myStorage.getItem('chatID')) {
    // Génère un nouvel ID de chat et le stocke dans le localStorage
    myStorage.setItem('chatID', createUUID());
}

// Ajoute la classe "enter" à l'élément après un délai de 1 seconde
setTimeout(function() {
    element.addClass('enter');
}, 1000);

// Associe la fonction openElement à l'événement click de l'élément
element.click(openElement);

function openElement() {
    // Sélectionne les éléments messages et text-box à l'intérieur de l'élément
    var messages = element.find('.messages');
    var textInput = element.find('.text-box');

    // Cache l'icône de chat
    element.find('>i').hide();

    // Ajoute les classes "expand" et "enter" à l'élément et à la fenêtre de chat
    element.addClass('expand');
    element.find('.chat').addClass('enter');

    // Calcule la longueur de la valeur de l'input texte multipliée par 2
    var strLength = textInput.val().length * 2;

    // Associe la fonction onMetaAndEnter à l'événement keydown de l'input texte et l'active
    textInput.keydown(onMetaAndEnter).prop("disabled", false).focus();

    // Désactive l'événement click sur l'élément pour éviter d'ouvrir plusieurs fenêtres de chat
    element.off('click', openElement);

    // Associe la fonction closeElement à l'événement click du bouton de fermeture
    element.find('.header button').click(closeElement);

    // Associe la fonction sendNewMessage à l'événement click du bouton d'envoi
    element.find('#sendMessage').click(sendNewMessage);

    // Fait défiler les messages vers le bas
    messages.scrollTop(messages.prop("scrollHeight"));
}

function closeElement() {
    // Supprime les classes "enter" et "expand" de l'élément et cache la fenêtre de chat
    element.find('.chat').removeClass('enter').hide();
    element.find('>i').show();
    element.removeClass('expand');

    // Désactive l'événement click sur le bouton de fermeture
    element.find('.header button').off('click', closeElement);

    // Désactive l'événement click sur le bouton d'envoi
    element.find('#sendMessage').off('click', sendNewMessage);

    // Désactive l'événement keydown sur l'input texte, le désactive et perd le focus
    element.find('.text-box').off('keydown', onMetaAndEnter).prop("disabled", true).blur();

    // Réactive l'événement click sur l'élément après un délai de 500 millisecondes
    setTimeout(function() {
        element.find('.chat').removeClass('enter').show()
        element.click(openElement);
    }, 500);
}

// Fonction pour générer un UUID
function createUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function sendNewMessage() {
    var userInput = $('.text-box');
    var newMessage = userInput.html().replace(/\<div\>|\<br.*?\>/ig, '\n').replace(/\<\/div\>/g, '').trim().replace(/\n/g, '<br>');

    if (!newMessage) return;

    var messagesContainer = $('.messages');

    messagesContainer.append([
        '<li class="self">',
        newMessage,
        '</li>'
    ].join(''));

    // Efface l'ancien message
    userInput.html('');

    // Met le focus sur l'input texte
    userInput.focus();

    // Fait défiler les messages vers le bas avec une animation
    messagesContainer.finish().animate({
        scrollTop: messagesContainer.prop("scrollHeight")
    }, 250);
}

function onMetaAndEnter(event) {
    if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
        sendNewMessage();
    }
}
