Template.StreamPrototypeListView.onCreated(function () {
  this.subscribe("applications");
  this.subscribe("stream-prototypes", Template.currentData()._id);
  this.subscribe("streams-prototypes-fields", Template.currentData()._id);
});

Template.StreamPrototypeListView.helpers({
  prototypeStreams: function() {return UXLab.data.streams.prototypes.find({application: Template.currentData()._id});}
});

Template.StreamPrototypeListView.events({
  "click button.create-stream": function (event, template) {

    var nameInputElement=template.find("input.stream-name");

    var inputValue = nameInputElement.value.trim();

    var streams = inputValue.split(" ");


    streams.forEach(function(name) {
      if(name.length > 0) {
        Meteor.call("createStreamPrototype", name, Template.currentData()._id, function(error, result) {
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
  }
});

Template.StreamPrototypeListItem.onCreated(function () {
});

Template.StreamPrototypeListItem.helpers({
  fields: function() {
    return UXLab.data.streams.fields.find({stream: Template.currentData()._id});
  }
});
