Router.route("/subjects", function() {
  this.layout("GlobalView");
  this.wait(Meteor.subscribe('devices'));
  if (this.ready()) {
    this.render("SubjectListView");
  }
});

Router.route("/subjects/:_id", function() {
  this.layout("GlobalView");
  this.wait(Meteor.subscribe('stream-instances', this.params._id));
  this.wait(Meteor.subscribe('devices'));
  if (this.ready()) {
    this.render("SubjectView", {
      data: function () { return UXLab.data.subjects.findOne({_id: this.params._id}) }
    });
  }
});
