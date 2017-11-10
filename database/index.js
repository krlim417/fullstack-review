const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repoId: {type: Number, index: {unique: true}},
  repoUrl: String,
  userId: Number,
  username: String,
  name: String,
  description: String,
  userForked: Boolean,
  forks: Number,
  repoUrl: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = body => {
  if (body) {
    body.forEach(repo => {
      var newRepo = {
        repoId: repo.id,
        repoUrl: repo.html_url,
        userId: repo.owner.id,
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
  };
};

var get = function(callback) {
  Repo.find({}).sort({'forks': 'descending'}).limit(25).exec((err, repos) => {
    callback(repos);
  });
  // Repo.find({}, (err, repos) => {
  //   callback(repos); 
  // });
};
  // Repo.find({}).limit(25).sort({forks: -1});

module.exports.save = save;
module.exports.get = get;