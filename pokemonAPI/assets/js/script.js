
$(document).ready(function () {
    // Función o Método, para buscar los datos de un pokemon por AJAX a la Api de Pokemon
    $("#botonBuscar").click(function (e) {
      e.preventDefault();
      var namePokemon = $("#inputBuscar").val().toLowerCase();
      if (namePokemon) {
        getNamePokemon(namePokemon);
      }
  
    });
  
    $("#botonLimpiar").click(function (e) {
      e.preventDefault();
      $("#contenedorPokemon").empty();
      $('#inputBuscar').val('');
    });
  
    function getNamePokemon(pokemon) {
      $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon}/`,
        dataType: "json",
        success: function (data) {
            renderPokemon(data)
        }
      });
    }

function renderPokemon(data){
    let div = $("<div></div>");
    div.addClass("poke card");

    let name = $("<h3></h3>");
    name.addClass("card-title");
    name.append(data.id + " " + data.name.toUpperCase());
    div.append(name);

    let Pokeimg = $("<img></img");
    Pokeimg.attr("src", data.sprites.other["official-artwork"].front_default);
    Pokeimg.addclass("card-Pokeimg");
    div.append(Pokeimg);

    let body = $("<div></div>");
    body.addClass("card-body");

    var pokeType = data.types;
    var tipos = '';
    pokeType.forEach(function (type) {
      if (pokeType.length > 1 && !pokeType.length.last) {
        tipos += `${type['type']['name']} - `.toUpperCase();
      } else {
        tipos += `${type['type']['name']}`.toUpperCase();
      }

    })
    body.append(`<div>Tipo: ${tipos}<div>`);
    div.append(body);

    $('#contenedorPokemon').append(div);
  }


});
