//var url= "http://localhost:3300/api/users";
var url= "https://pg-restapi-l6ts.onrender.com/api/users";
function postUser(){
    var myName = $('#name').val();
    var myEmail = $('#email').val();
    var myAge = $('#age').val();
    var myComments = $('#comments').val();

    var myuser = {
        name: myName,
        email: myEmail,
        age: myAge,
        comments: myComments
    };
    console.log(myuser);

    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            $('#resultado').html(JSON.stringify(data.user));
        },
        data: JSON.stringify(myuser)
    });
}


function getUsers() {
    console.log(url);

    $.getJSON(url,
      function(json) {
        console.log(json);

        var arrUsers = json.users;

        var htmlTableUsers = '<table border="1">';

        arrUsers.forEach(function(item) {
            console.log(item);
            htmlTableUsers += '<tr>' +
                                '<td>' + item.id + '</td>' +
                                '<td>' + item.name + '</td>' +
                                '<td>' + item.email + '</td>' +
                                '<td>' + item.age + '</td>' +
                                '<td>' + item.comments + '</td>' +
                                '<td>' + item.comments + '</td>' +
    '<td><button onclick="deleteUser(' + item.id + ')">Eliminar</button></td>' +
                                '</tr>';
        });

        htmlTableUsers += '</table>';

        $('#resultado').html(htmlTableUsers);
      }
    );
}

function deleteUser(id) {
    if (confirm("¿Estás segura de que quieres eliminar al usuario con id " + id + "?")) {
        $.ajax({
            url: url + "/" + id,
            type: 'DELETE',
            success: function (data) {
                console.log(data);
                alert("Usuario eliminado: " + id);
                getUsers(); // actualiza la lista después de eliminar
            },
            error: function (err) {
                console.error(err);
                alert("Error al eliminar el usuario.");
            }
        });
    }
}




