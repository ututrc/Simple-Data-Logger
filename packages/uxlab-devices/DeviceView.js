Template.DeviceView.onCreated(function () {
  this.subscribe("devices");
});

Template.DeviceView.events({
  "click .remove-device": function() {
    Meteor.call("removeDevice", Template.currentData()._id, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
      }
        Router.go("/devices");
    });
  }
});

Template.DeviceView.helpers({
  isPromoted: function() {return (Template.currentData().promote == true) ? "Yes" : "No"}
});
