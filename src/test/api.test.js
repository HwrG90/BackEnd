const request = require("supertest");
const app = require('../index')

describe("GET /api/productos", () => {
    it("Deberia retornar status 200", (done) => {
        request(app)
            .get("/api/productos")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

describe("POST /api/productos", () => {
    it("Deberia Agregar un Producto", (done) => {
        const response = {
            nombre: "producto desde supertest",
            precio: 1234,
            thumbnail: "URL desde supertest",
            descripcion: "descripción desde supertest",
            codigo: 33333,
            stock: 3,
        };
        request(app)
            .post("/api/productos")
            .send(response)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
})

describe("DELETE /api/productos/:id", () => {
    it("Deberia retornar status 200", (done) => {
        request(app)
            .get("/api/productos/630649420257d0ab34ff18c7") // Poner un ID de un Producto 630649420257d0ab34ff18c7
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    })
})