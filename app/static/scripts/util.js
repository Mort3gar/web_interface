const get = async (url) => (await axios.get(url)).data;
const post = async (url, dict_) => (await axios.post(url, dict_)).data;

async function del_row(url, item_id, row_id){
    // Формат отправляемых данных ['id']
    await post(url, {"id": item_id}).then(res =>{
        row_id.parentNode.removeChild(row_id);
        console.log(res);
    }).catch(error => {
        console.log(error);
    })
}