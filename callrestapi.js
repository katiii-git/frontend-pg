var url= "http://localhost:8080/api/users";
//var url= "https://.onrender.com/api/users";
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
            showToast('✅ Usuario agregado con éxito');
            $('#name').val('');
            $('#email').val('');
            $('#age').val('');
            $('#comments').val('');
            getUsers();
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
                                '<td><button onclick="deleteUser(' + item.id + ')">Eliminar</button></td>' +
                                '<td><button onclick="openEditModal(' +
  item.id + ', \'' +
  item.name + '\', \'' +
  item.email + '\', ' +
  item.age + ', \'' +
  item.comments + '\')">Editar</button></td>' +
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
                showToast('🗑️ Usuario eliminado con éxito');
                getUsers(); // actualiza la lista después de eliminar
            },
            error: function (err) {
                console.error(err);
                showToast('Error al eliminar usuario');
            }
        });
    }
}

function openEditModal(id, name, email, age, comments) {
  $('#edit-id').val(id);
  $('#edit-name').val(name);
  $('#edit-email').val(email);
  $('#edit-age').val(age);
  $('#edit-comments').val(comments);
  $('#editModal').removeClass('hidden');
}

function closeModal() {
  $('#editModal').addClass('hidden');
}

function confirmEdit() {
  const id = $('#edit-id').val();
  const updatedUser = {
    name: $('#edit-name').val(),
    email: $('#edit-email').val(),
    age: $('#edit-age').val(),
    comments: $('#edit-comments').val()
  };

  $.ajax({
    url: `${url}/${id}`,
    type: 'put',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(updatedUser),
    success: function (data) {
      closeModal();
      getUsers();
      showToast('Usuario actualizado correctamente');
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast show';

  setTimeout(() => {
    toast.className = 'toast'; // lo oculta
  }, 3000); // 3 segundos
}

