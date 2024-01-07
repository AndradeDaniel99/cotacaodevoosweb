// script.js

$(document).ready(function () {
    function configureAutocomplete(inputId, ulId, autocompleteUrl) {
      var inputElement = $('#' + inputId);
      var ulElement = $('#' + ulId);
  
      inputElement.on('input', function () {
        var inputText = inputElement.val().toLowerCase();
        var suggestions = [];
  
        $.getJSON(autocompleteUrl, function (data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].toLowerCase().includes(inputText)) {
              suggestions.push(data[i]);
            }
          }
  
          displaySuggestions(suggestions);
        });
      });
  
      function displaySuggestions(suggestions) {
        ulElement.empty();
  
        for (var i = 0; i < suggestions.length; i++) {
          var li = $('<li>' + suggestions[i] + '</li>');
  
          li.click(function () {
            inputElement.val($(this).text());
            ulElement.hide();
          });
  
          ulElement.append(li);
        }
  
        if (suggestions.length > 0) {
          // Posiciona o dropdown abaixo da caixa de texto
          ulElement.css({
            top: inputElement.position().top + inputElement.outerHeight(),
            left: inputElement.position().left
          });
  
          ulElement.show(); // Mostra o dropdown de sugestões
        } else {
          ulElement.hide(); // Esconde o dropdown se não houver sugestões
        }
      }
  
      // Oculta o dropdown quando o usuário clicar fora da caixa de texto
      $(document).on('click', function (event) {
        if (!$(event.target).closest('#' + inputId).length) {
          ulElement.hide();
        }
      });
    }
  
    var originAutocompleteUrl = 'sua_lista.json';
    var destinationAutocompleteUrl = 'sua_lista.json';
  
    configureAutocomplete('originInput', 'originUL', originAutocompleteUrl);
    configureAutocomplete('destinationInput', 'destinationUL', destinationAutocompleteUrl);
  });
  