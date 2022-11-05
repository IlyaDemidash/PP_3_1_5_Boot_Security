/*
Скрипт заполняет модальное окно
 */

$(document).ready(function () {
    $('#delete').on("show.bs.modal", function (event) {  //#delete - id модального окна
        const button = $(event.relatedTarget);  //кнопка, которая вызывает модальное окно
        const id = button.data("id"); // Извлечение информации из аттрибута data-id="${user.id}" кнопки, это будет id удаляемого пользователя
        viewDeleteModal(id); //запускаем функцию для заполнения модального окна данными по id пользователя
    })
})

async function viewDeleteModal(id) {
    //Получаем пользователя по id
    let userDelete = await getUser(id);
    let formDelete = document.forms["formDeleteUser"];
    //Заполняем форму полученными данными
    formDelete.id.value = userDelete.id;
    formDelete.firstName.value = userDelete.firstName;
    formDelete.lastName.value = userDelete.lastName;
    formDelete.age.value = userDelete.age;
    formDelete.email.value = userDelete.email;

    $('#deleteRolesUser').empty();

    await fetch("http://localhost:8080/api/roles")
        .then(r => r.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < userDelete.roles.length; i++) {
                    if (userDelete.roles[i].name === role.name) {
                        selectedRole = true;
                        break;
                    }
                }
                let element = document.createElement("option");
                element.text = role.name.substring(5);
                element.value = role.id;
                if (selectedRole) element.selected = true;
                $('#deleteRolesUser')[0].appendChild(element);
            })
        })
        .catch((error) => {
            alert(error);
        })
}

async function getUser(id) {

    let url = "http://localhost:8080/api/admin/" + id;
    let response = await fetch(url);
    return await response.json();
}