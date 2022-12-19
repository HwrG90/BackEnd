const axios = require(`axios`);

const deleteProduct = async () => {
    const deleteProduct = await axios.delete(`http://localhost:8080/api/test/62d1a11d253500d44bcfb4a4`);
    console.log({
        status: deleteProduct.status,
        data: deleteProduct.data
    });
}

deleteProduct();