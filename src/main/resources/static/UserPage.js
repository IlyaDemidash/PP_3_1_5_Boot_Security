/*
Скрипт заполняет таблицу все поля в navbar и таблицу About User для /admin и /user
 */
$(async function () {
    await loadUser();
});

async function loadUser() {
    fetch("http://localhost:8080/api/user")
        .then(r => r.json()) //читаем ответ в JSON
        .then(data => {
            // Подставляем полученную информацию в navbar
            $('#navUsername').append(data.email);
            //Получаем роли без подстроки ROLE_
            let roles = data.roles.map(role => " " + role.name.substring(5));
            $('#navRoles').append(roles);

            //Заполняем таблицу полученными данными
            let user = `$(
            <tr>
                <td>${data.id}</td>
                <td>${data.firstName}</td>
                <td>${data.lastName}</td>
                <td>${data.age}</td>
                <td>${data.email}</td>
                <td>${roles}</td>)`;
            //Вставляем все в тело таблицы
            $('#userPanelBody').append(user);
        })
        //Выводим ошибку если что-то пошло не так
        .catch((error) => {
            alert(error);
        });
}




