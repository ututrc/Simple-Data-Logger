Package.describe({
  name: 'ututrc:uxlab-subjects',
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
  api.use('tracker');

  api.use('iron:router@1.0.7');
  api.use('alanning:roles@1.2.13');
  api.use('nimble:restivus@0.6.6');
  api.use('mrt:moment@2.8.1');
  api.use('copleykj:livestamp@1.1.5');

  api.use('ututrc:uxlab-main');
  api.use('ututrc:uxlab-streams');

  api.addFiles('SubjectView.html');
  api.addFiles('SubjectListView.html');
  api.addFiles('LiveSubjectsView.html','client');
  api.addFiles('styles.css', 'client');

  api.addFiles('Collections.js');
  api.addFiles('server.js',"server");
  api.addFiles('LiveSubjectsView.js','client');
  api.addFiles('SubjectListView.js',"client");
  api.addFiles('SubjectView.js',"client");

  api.addFiles('routes.js',"client");
});
