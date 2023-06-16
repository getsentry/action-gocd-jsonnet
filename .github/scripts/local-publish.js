const publish = require('./publish.js');
const { Octokit } = require("@octokit/rest");

process.env.VERSION = 'v0.0.2';

publish({
  context: {
    repo: {
      owner: 'getsentry',
      repo: 'action-gocd-jsonnet',
    }
  },
  octokit: new Octokit({ auth: process.env.GITHUB_TOKEN }),
})
