# CoderHouse

*BackEnd*

> This is a project for the course of BackEnd from the CoderHouse.

---

# Para acceder a GraphiQL ingresa a

## ` (http://localhost:8080/graphql) `

## Comandos

````
query getProducts{
getAllProducts{
    id
    nombre
    stock
    }
}

query getProductByID{
    getProductById (id:"6338beb822de3760a5894afa"){
    nombre
    stock
    }
}

mutation updateProduct{
    updateProductById(id:"6338beb822de3760a5894afa", data:{
        nombre: "producto graphql",
        descripcion: "modificado graphql",
        codigo: 50,
        thumbnail: "URL graphql",
        precio: 99,
        stock: 99
        }){
    nombre
    id
    }
}

mutation deleteProduct{
    deleteProductById(id:"6338beb822de3760a5894afa")
}
````