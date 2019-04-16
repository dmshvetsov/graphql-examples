const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => 'Hello world!',
};

const query = '{ hello }';
graphql(schema, query, root).then(console.log).catch(console.error);
