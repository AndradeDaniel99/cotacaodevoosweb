$(document).ready(function () {
    // Carrega os dados do JSON (substitua 'seu_arquivo.json' pelo caminho do seu arquivo)
    $.getJSON('sua_lista.json', function (data) {
      var autocompleteData = data;
  
      // Quando o usuário digita algo na caixa de texto
      $('#myInput').on('input', function () {
        var inputText = $(this).val().toLowerCase();
        var suggestions = [];
  
        // Filtra os itens do JSON que contêm o texto digitado
        for (var i = 0; i < autocompleteData.length; i++) {
          if (autocompleteData[i].toLowerCase().includes(inputText)) {
            suggestions.push(autocompleteData[i]);
          }
        }
  
        // Exibe as sugestões
        // Suponha que 'suggestionsOrigin' e 'suggestionsDestination' sejam as listas de sugestões para origem e destino, respectivamente.

        // Para a caixa de texto de origem
        displaySuggestions(suggestionsOrigin, 'originInput', 'originUL');

        // Para a caixa de texto de destino
        displaySuggestions(suggestionsDestination, 'destinationInput', 'destinationUL');

      });
  
      // Função para exibir sugestões
      function displaySuggestions(suggestions, inputId, ulId) {
        var inputElement = $('#' + inputId);
        var ulElement = $('#' + ulId);
        ulElement.empty();
      
        for (var i = 0; i < suggestions.length; i++) {
          var li = $('<li>' + suggestions[i] + '</li>');
      
          li.click(function () {
            inputElement.val($(this).text());
            ulElement.hide(); // Esconde o dropdown após clicar em uma sugestão
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
      
    });
  });
  