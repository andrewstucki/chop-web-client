import graphql from 'graphql.js';

let graph = graphql("/graphql");

const getStuff = graph(
    `query {
        hero {
          name
        }
      }`)

export getStuff;