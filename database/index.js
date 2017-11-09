const mongoose = require('mongoose');
Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repoId: {type: Number, index: {unique: true}},
  username: String,
  name: String,
  description: String,
  userForked: Boolean,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = body => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  body.forEach(repo => {

    var newRepo = {
      repoId: repo.id,
      username: repo.owner.login,
      name: repo.name,
      description: repo.description,
      userForked: repo.fork,
      forks: repo.forks
    };
    var repo = new Repo(newRepo);

    repo.save((err, repo) => {
      if (err) {
        console.log(`There's already an entry with the same repoId.`);
      } else {
        console.log('The data was successfully added to the database.');  
      }
    });

  });
}

module.exports.save = save;