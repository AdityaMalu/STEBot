$(document).ready(function () {
    var chatWindow = $('#chat-widget');
    var messageInput = '<input type="text" id="user-input" placeholder="Type your message here" autofocus/>';
    chatWindow.append(messageInput);
    $('#user-input').on('keypress', function (event) {
      if (event.which === 13) {
        var message = $(this).val();
        $(this).val('');
        chatWindow.append('<div class="user-message">' + message + '</div>');
        sendMessage(message);
      }
    });
  
    function sendMessage(message) {
      $.ajax({
        url: 'http://localhost:5005/webhooks/rest/webhook',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ message: message }),
        success: function (data, textStatus) {
          var botResponse = data[0].text;
          chatWindow.append('<div class="bot-message">' + botResponse + '</div>');
          chatWindow.scrollTop(chatWindow[0].scrollHeight);
        },
      });
    }
  });
  