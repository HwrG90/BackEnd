const { buildSchema } = require(`graphql`);
const { productType } = require(`../graphql/types/productoType`);

const { productInput } = require(`../graphql/inputs/productoInput`);

const { productsQueries } = require(`../graphql/querys/productoQuery`);
const { productsMutation } = require(`../graphql/mutations/productoMutation`);


const schema = buildSchema(`
${productType}
${productInput}
type Query {
    ${productsQueries}
}
type Mutation {
    ${productsMutation}
}
`);

module.exports = schema;