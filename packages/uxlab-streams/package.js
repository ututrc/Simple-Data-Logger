Package.describe({
  name: 'ututrc:uxlab-streams',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('mongo');
  api.use('templating');
  api.use('http');

  api.use('iron:router@1.0.7');
  api.use('alanning:roles@1.2.13');
  api.use('nimble:restivus@0.6.6');

  api.use('aldeed:collection2@2.3.1');
  api.use('aldeed:autoform@5.3.0');

  api.use('harrison:papa-parse@1.1.0');

  api.use('ututrc:uxlab-main');

  api.addFiles('StreamInstanceView.html');
  api.addFiles('StreamInstanceListView.html');
  api.addFiles('StreamInstanceFieldListView.html');

  api.addFiles('StreamPrototypeView.html');
  api.addFiles('StreamPrototypeListView.html');
  api.addFiles('StreamPrototypeFieldListView.html');
  api.addFiles('styles.css');

  api.addFiles('Collections.js');
  api.addFiles('server.js',"server");

  api.addFiles('StreamInstanceListView.js',"client");
  api.addFiles('StreamInstanceView.js',"client");

  api.addFiles('StreamPrototypeListView.js',"client");
  api.addFiles('StreamPrototypeFieldListView.js',"client");
  api.addFiles('StreamPrototypeView.js',"client");

  api.addFiles('routes.js',"client");
});
