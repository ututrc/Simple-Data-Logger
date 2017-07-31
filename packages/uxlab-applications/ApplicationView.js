Template.ApplicationView.onCreated(function () {
  this.subscribe("applications");
});

Template.ApplicationView.events({
  "click .remove-application": function() {
    Meteor.call("removeApplication", Template.currentData()._id, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
      }
        Router.go("/");
    });
  }
});
