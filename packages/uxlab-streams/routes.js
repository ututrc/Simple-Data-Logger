Router.route("/applications/:_app/streams", function() {
  this.layout("GlobalView");
  this.wait(Meteor.subscribe('stream-prototypes-fields', this.params._app));
  this.render("PrototypeStreamListView", {
    data: function () { return UXLab.data.applications.findOne({_id: this.params._app}) }
  });
});

Router.route("/applications/:_app/streams/:_id", function() {
  this.layout("GlobalView");
  this.wait(Meteor.subscribe('stream-prototypes', this.params._app));
  this.wait(Meteor.subscribe('stream-prototypes-fields', this.params._app));
  this.render("StreamPrototypeView", {
    data: function () { return UXLab.data.streams.prototypes.findOne({_id: this.params._id}) }
  });
});

Router.route("/subjects/:_subject/streams", function() {
  this.layout("GlobalView");
  this.render("StreamInstanceListView", {
    data: function () { return UXLab.data.subjects.findOne({_id: this.params._app}) }
  });
});

Router.route("/subjects/:_subject/streams/:_id", function() {
  this.layout("GlobalView");
  this.wait(Meteor.subscribe('stream-instances', this.params._subject));
  this.wait(Meteor.subscribe('subjects'), Session.get("currentApplication"));
  if (this.ready()) {
    this.render("StreamInstanceView", {
      data: function () { return UXLab.data.streams.instances.findOne({_id: this.params._id}) }
    });
  }
});
