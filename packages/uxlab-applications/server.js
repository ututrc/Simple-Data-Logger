Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.methods({
  createApplication:function(_name){
    if(Meteor.user()) {
      UXLab.data.applications.insert({name: _name, running: 0});
    }
  },
  removeApplication:function(id){

    if(Meteor.user()) {
      UXLab.data.applications.remove({_id: id});
    }
  }
});

Meteor.publish("applications", function () {
  return UXLab.data.applications.find({});
});
