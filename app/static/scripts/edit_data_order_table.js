async function set_data_in_form(choice_id, input_values, keys_from_db) {
    // считываем query параметр
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let current_order;
    let data_values = {};

    // Формат получаемых данных [id, client_name, product_name, brand, model, warranty_period, order_receipt_date]
    await get(`/api/get_order?id=${params['id']}`).then(res => {
        current_order = res;
        data_values["product_name"] = current_order["product_name"];
        data_values["client_name"] = current_order["client_name"];
        data_values["warranty_period"] = current_order["warranty_period"];
        data_values["order_receipt_date"] = current_order["order_receipt_date"];
    }).catch(error => {
        console.log(error)
    })

    await get(`/api/get_product?id=${current_order["product_id"]}`).then(res => {
        let products = res;
        data_values["model"] = products["model"];
        data_values["technical_specifications"] = products["technical_specifications"];
    }).catch(error => {
        console.log(error)
    })

    // Формат получаемых данных [id, name, phoneNumber]
    await get("/api/get_client").then(res => {
        let clients = res;
        data_values["phoneNumber"] = compare(current_order, clients, ["client_name"], ["name"], ["phoneNumber"])[0];
    }).catch(error => {
        console.log(error)
    })

    console.log(data_values)

    addDataInSelect("/api/get_brands", choice_id);

    // let data_values_by_need_keys = {};

    // for (let key of keys_from_db) {
    //     data_values_by_need_keys[key] = data_values[key]
    // }

    SetInputs(input_values["input"], true, data_values, keys_from_db);

    // Формат получаемых данных [id, name]
    await get("/api/get_brands").then(data => {
        data
        let index_counter = 0;

        // добавление в select
        for (let index_data in data) {

            // Айдишник нужного поста для селекта
            if (current_order["brand"] === data[index_data]["name"]) {
                index_counter = index_data;
            }
        }

        document.getElementById(`${input_values["select"]}`).selectedIndex = data["index"]

    }).catch(error => {
        console.log(error)
    })

}

// "choice_brand"

// Выполнить функцию выше при загрузке страницы
set_data_in_form("choice_brand", {
    "select": ["choice_brand"], "input": ["product_name", "model_name", "text_specification",
        "garantity_period", "client_name", "telephone_number", "date_order_acceptance"]
}, ["product_name", "model",
    "technical_specifications", "warranty_period", "client_name", "phoneNumber", "order_receipt_date"])

async function add_order_in_db() {

    let data = get_data_from_input({
        "select": {"brand_name": "choice_brand"},
        "field": {
            "product_name": "product_name",
            "model_name": "model_name",
            "text_specification": "text_specification",
            "warranty_date": "garantity_period",
            "client_name": "client_name",
            "telephone_number": "telephone_number",
            "date_order_acceptance": "date_order_acceptance"
        }
    });

    console.log(data)

    if (!check_fields(data)) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        let data_for_post = {"id": params['id']};

        await get("/api/get_client").then(data_clients => {
            for (client of data_clients) {
                if (data["client_name"] === client["name"] && data["telephone_number"] === client["phoneNumber"]) {
                    data_for_post["clients_id"] = client["id"];
                    break;
                }   
            }
        }).catch(error => {
            console.log(error);
        })

        await get(`/api/get_order?id=${params['id']}`).then(data_order => {
            data_for_post["product_id"] = data_order["product_id"];
        }).catch(error => {
            console.log(error);
        })

        data_for_post["order_receipt_date"] = data["date_order_acceptance"];

        await patch("/api/edit_order", {
            "id": data_for_post["id"],
            "clients_id": data_for_post["clients_id"],
            "product_id": data_for_post["product_id"],
            "order_receipt_date": data_for_post["order_receipt_date"]
        }).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
        
    } else {
        // info
        console.log("Не все поля заполнены!");
    }
}


