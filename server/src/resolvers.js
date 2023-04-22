const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: (_, __, {dataSources}) => {
        //trackAPI: lowercase here as it's the instance of our TrackAPI class extending RESTDataSource
        return dataSources.trackAPI.getTracksForHome(); 
    },
  },
  //Add another key to our resolvers object called Track, indicating that it's for the Track type in our schema. 
  //Inside that Track key will be another object with an author field, where we'll define our resolver.
  Track: {
    //The parent argument contains data returned by our tracksForHome resolver, and because tracksForHome returns a list, Apollo Server iterates through that list and calls the author resolver once for each track. It passes the current track as the value of parent, enabling us to extract the authorId
    //parent: trae toda la informacion obtenida sobre 'track', en este caso solo necesitamos authorId para averiguar la información del autor, esto sucede en cada iteración, para cada uno de los 'track' de la lista de 'tracks'
    author: ({authorId}, _, {dataSources}) => {
        return dataSources.trackAPI.getAuthor(authorId);
    },
  },
};

module.exports = resolvers;
