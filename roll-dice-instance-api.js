const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

const schema = buildSchema(`
  type Die {
    numSides: Int!
    roll(numRolls: Int!): [Int!]!
  }

  type Query {
    getDie(numSides: Int = 6): Die
  }
`);

function randomIn(num) {
  return 1 + Math.floor(Math.random() * num);
}

class Die {
  constructor(numSides) {
    this.numSides = numSides;
  }

  roll({ numRolls }) {
    return new Array(numRolls)
      .fill(this.numSides)
      .map(randomIn);
  }
}

const root = {
  getDie({ numSides }) {
    return new Die(numSides);
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(
  4040,
  () => console.log('Running @ http://localhost:4040/graphql'),
);
