Template.SubjectView.onCreated(function () {
  this.subscribe("subjects", Session.get("currentApplication"));
  this.subscribe("devices");
  this.subscribe("stream-instances");
});

Template.SubjectView.helpers({
  deviceName: function() {
    if(Template.currentData()) {
      var device = UXLab.data.devices.findOne({_id: Template.currentData().device});

      if(device)
        return device.name;
    }

    return "not found";

  }
});

Template.SubjectView.events({
  "click .remove-subject": function() {
    Meteor.call("removeSubject", Template.currentData()._id, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
      }
        Router.go("/subjects");
    });
  }
});
