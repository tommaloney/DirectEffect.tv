  document.addEventListener("DOMContentLoaded", function() {
  var roomName = window.location.href.split(".tv/")[1].split(".html")[0];
  var readChatroom = new Firebase("https://hashoutboutchat.firebaseio.com/" + roomName + "/chatData");

  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var chatRoom = "Test";
      var chatData = [];
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();

      readChatroom.on('value', function(snapshot) {
        if (snapshot.val()) {
          chatData = snapshot.val();
        }
      });

      if(unNaturalCharacters(name) || unNaturalCharacters(text)){
        alert("Please don't hack our site, that's not very nice.");
      }
      else {
        chatData.push({name: name, text: removeBadWords(text)});
        readChatroom.set(chatData);
      }

      $('#messageInput').val('');
    }
  });


  readChatroom.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
  });


  function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  }


  function unNaturalCharacters(name){
    //return name.match(/*need to put regex to detect unnatural character here*/);
    var re = /[^0-9a-zA-Z ' _ -]/g;//we are assuming that a malicious javascript injection will have an unnatural character;
    return name.match(re);
  }


  function removeBadWords(text) {
    var words = [/\b(ass)\b/igm, /\b(bitch)\b/igm, /\b(fuck)\b/igm, /\b(cunt)\b/igm, /\b(nigger)\b/igm, /\b(shit)\b/igm, /\b(asshole)\b/igm, /\b(dick)\b/igm, /\b(penis)\b/igm, /\b(cock)\b/igm, /\b(pussy)\b/igm, /\b(dildo)\b/igm, /\b(cum)\b/igm, /\b(blowjob)\b/igm, /\b(boner)\b/igm, /\b(jizz)\b/igm, /\b(queef)\b/igm, /\b(tits)\b/igm, /\b(boob)\b/igm, /\b(fucking)\b/igm, /\b(fucker)\b/igm, /\b(asshat)\b/igm, /\b(assfuck)\b/igm, /\b(suck balls)\b/igm, /\b(dumbass)\b/igm];
    for (var i=0;i<words.length;i++){
      text = text.replace(words[i], "$!&%");
    }
      
    return text;
  }
});