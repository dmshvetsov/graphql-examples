const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    rollDices(numDice: Int!, numSides: Int = 6): [Int!]!
  }
`);

const root = {
  rollDices: (args) => {
    const { numDice, numSides } = args;
    return new Array(numDice)
      .fill()
      .map(() => Math.floor(Math.random() * numSides));
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4040, () => console.log('Running @ http://localhost:4040/graphql'));

/** Client
 
const dice = 3;
const sides = 6;
var query = `query RollDice($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides)
}`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { dice, sides },
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));

*/
