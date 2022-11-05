/*
Скрипт заполняет модальное окно
 */

$(document).ready(function () {
    $('#edit').on("show.bs.modal", function (event) {  //#delete - id модального окна
        const button = $(event.relatedTarget);  //кнопка, которая вызывает модальное окно
        const id = button.data("id"); // Извлечение информации из аттрибута data-id="${user.id}" кнопки, это будет id удаляемого пользователя
        viewEditModal(id); //запускаем функцию для заполнения модального окна данными по id пользователя
    })
})

async function viewEditModal(id) {
    //Получаем пользователя по id
    let userEdit = await getUser(id);
    let form = document.forms["formEditUser"];
    //Заполняем форму полученными данными
    form.id.value = userEdit.id;
    form.firstName.value = userEdit.firstName;
    form.lastName.value = userEdit.lastName;
    form.age.value = userEdit.age;
    form.email.value = userEdit.email;
    form.password.value = userEdit.password;

    $('#editRolesUser').empty();

    await fetch("http://localhost:8080/api/roles")
        .then(r => r.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < userEdit.roles.length; i++) {
                    if (userEdit.roles[i].name === role.name) {
                        selectedRole = true;
                        break;
                    }
                }
                let element = document.createElement("option");
                element.text = role.name.substring(5);
                element.value = role.id;
                if (selectedRole) element.selected = true;
                $('#editRolesUser')[0].appendChild(element);
            })
        })
        .catch((error) => {
            alert(error);
        })
}