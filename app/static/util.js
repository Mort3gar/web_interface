const get = async (url) => (await axios.get(url)).data;
const post = async (url, dict_) => (await axios.post(url, dict_)).data;