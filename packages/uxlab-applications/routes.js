Router.route("/applications", function() {
  this.layout("GlobalView");
  this.render("ApplicationListView");
});

Router.route("/applications/:_id", function() {
  this.layout("GlobalView");
  this.wait(Meteor.subscribe('stream-prototypes-fields', this.params._id));
  this.wait(Meteor.subscribe('stream-instances', this.params._id));
  this.render("ApplicationView", {
    data: function () { return UXLab.data.applications.findOne({_id: this.params._id}) }
  });
});
