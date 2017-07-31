Template.StreamPrototypeView.onCreated(function () {
  if(Template.currentData()) {
    this.subscribe("stream-prototypes", Template.currentData().application);
  }
  this.subscribe("applications");
});

Template.StreamPrototypeView.events({
  "click .remove-stream": function() {
    var app = Template.currentData().application;
    Meteor.call("removeStreamPrototype", Template.currentData()._id, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
      }
    });
    Router.go("/application/"+app);
  },
  "click button.create-streamfield": function (event, template) {

    var nameInputElement=template.find("input.streamfield-name");

    var inputValue = nameInputElement.value.trim();

    var fields = inputValue.split(" ");


    fields.forEach(function(name) {
      if(name.length > 0) {
        Meteor.call("addStreamField", name, Template.currentData()._id, function(error, result) {
          if(error){
            console.log("error", error);
          }
          if(result){

          }
        });
      }
    });


    nameInputElement.value="";
    return false;
  },
  "click button.remove-streamfield": function (event, template) {

    var field = event.target.dataset.fieldname;

    Meteor.call("removeStreamField", field, Template.currentData()._id, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });

    return false;
  }
});
