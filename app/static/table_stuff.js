const get = async (url) => (await axios.get(url)).data;
const post = async (url, dict_) => (await axios.post(url, dict_)).data;

async function del_element(id){
    // Формат отправляемых данных ['id']
    post("/api/delete_staff", { id }).then(res =>{
        console.log(res)
    }).catch(error => {
        console.log(error)
    })
}

// Формат получаемых данных [id, name, title(post)]
function addDataInTable(table_id){
    get("/api/get_staff").then(data => {
        let table = document.getElementById(table_id);

        // Бежим по индексам даты и по ключам, вставляем соответствующие значения в таблицу
        for (let item of data) {
            let new_row = table.insertRow(table.rows.length);

            for (let key in item) {
                new_row.insertCell().innerHTML = item[key];
            }

            new_row.insertCell().innerHTML = `
                <div class="btn-group">
                    <button type="button" class="btn btn-outline-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Действие
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="edit_staff?id=${item["id"]}">Изменить</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" onclick="del_element(${item["id"]})">Удалить</a></li>
                    </ul>
                </div>
            `
        }
    }).catch(error =>{
        console.log(error)
    })
}

addDataInTable("table_orders");