const axios = require(`axios`);

const putProduct = async () => {
    const putProduct = await axios.put(`http://localhost:8080/api/test/62d1a09d253500d44bcfb496`, {
        nombre: `producto desde Axios`,
        precio: 1234,
        url: `URL desde Axios`,
        descripcion: `descripción desde Axios`,
        timestamp: new Date().toDateString(),
        codigo: 33333,
        stock: 3,
        cantidad: 0
    });

    console.log({
        status: putProduct.status,
        data: putProduct.data
    });

}

putProduct();