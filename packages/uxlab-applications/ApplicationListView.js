Template.ApplicationListView.onCreated(function () {
  this.subscribe("applications");
});

Template.ApplicationListView.helpers({
  applications: function() {return UXLab.data.applications.find({});}
});

Template.ApplicationListView.events({
  "click button.create-application": function (event, template) {
    var nameInput=template.find("input.application-name");

    Meteor.call("createApplication", nameInput.value, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });

    nameInput.value="";
    return false;
  },
  "click #select-application-list a.list-group-item": function (event, template) {
    var appId = event.target.dataset.appid;

    Session.setPersistent("currentApplication",appId);
  }
});
