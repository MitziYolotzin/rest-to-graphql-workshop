const fetch = require("node-fetch");
const { ApolloServer, gql } = require("apollo-server");



// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    character(id: ID!): Character
    characters: [Character]
  }

  enum CharacterStatus {
    Alive
    Dead
    unknown
  }
  
  type Character {
    name: String
    image: String
    id: ID
    status: String
    episodes: [String]
  }





`;



// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    
    characters: () => fetchCharacters(),
    character: (parent, args) => {
      const { id } = args
      return fetchCharacter({id})
    }
  }
};

const fetchCharacter = ({id}) => {
  return fetch (`https://rickandmortyapi.com/api/character/${id}`)
  .then (res => res.json())
  //.then (json => json.results)
}

// const fetchCharacters = () => {
//   return fetch ('https://rickandmortyapi.com/api/character/')
//   .then (res => res.json())
//   .then (json => json.results)
// }

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// mock data for characters
const characters = [
  {
    name: "Rick Sanchez",
    id: 1,
    status: "Alive",
    episodes: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2"
    ]
  },
  {
    name: "Morty Smith",
    id: 2,
    status: "Alive",
    episodes: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/3"
    ]
  }
];

// mock data for episodes
const episodes = [
  {
    name: "Pilot",
    id: 1
  },
  {
    name: "Lawnmower Dog",
    id: 2
  }
];

function fetchEpisodes() {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch("https://rickandmortyapi.com/api/episode/")
    .then(res => res.json())
    .then(json => json.results);
}

function fetchEpisodeById(id) {
  return fetch("https://rickandmortyapi.com/api/episode/" + id)
    .then(res => res.json())
    .then(json => json);
}

function fetchEpisodeByUrl(url) {
  return fetch(url)
    .then(res => res.json())
    .then(json => json);
}

function fetchCharacters() {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch("https://rickandmortyapi.com/api/character/")
    .then(res => res.json())
    .then(json => json.results);
}

function fetchCharacterById(id) {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch("https://rickandmortyapi.com/api/character/" + id)
    .then(res => res.json())
    .then(json => json);
}

function fetchCharacterByUrl(url) {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch(url)
    .then(res => res.json())
    .then(json => json);
}
