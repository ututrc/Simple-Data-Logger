Meteor.startup(function () {
  // code to run on server at startup

});

Meteor.methods({
  createStreamPrototype:function(_name, _app){
    if(Meteor.user()) {
      UXLab.data.streams.prototypes.insert({name: _name, description: "Stream description", application: _app});
    }
  },
  removeStreamPrototype:function(id){
    if(Meteor.user()) {
      UXLab.data.streams.prototypes.remove({_id: id});
    }
  },
  addStreamField:function(_name, _streamId){
    if(Meteor.user()) {

      var app = UXLab.data.streams.prototypes.findOne({_id: _streamId}).application;


      UXLab.data.streams.fields.insert({name: _name, stream: _streamId, default: "n/a", promote: false, application: app});

      }
  },
  removeStreamField:function(_name, _streamId){

    if(Meteor.user()) {

      UXLab.data.streams.fields.remove({name: _name, stream: _streamId});

      }
  },
  createStreamInstance:function(_streamPrototype, _instanceId, _privateKey, _subjectId, _deviceid) {

    var fieldList = [];

    UXLab.data.streams.fields.find({stream: _streamPrototype._id}).forEach(function(field) {
      fieldList.push(field.name);
    });

    UXLab.data.streams.instances.insert({_id: _instanceId, name: _streamPrototype.name, application: _streamPrototype.application, description: _streamPrototype.description, device: _deviceid, subject: _subjectId, privateKey: _privateKey, fields: fieldList});

    return true;
  },
  exportStream:function(_subjectId, _streamId) {
    this.unblock();

    var subject = UXLab.data.subjects.findOne({_id: _subjectId});

    var subject_headings = ["Start time", "Description", "Stream", "Device"];

    var device = UXLab.data.devices.findOne({_id: subject.device});

    var stream = UXLab.data.streams.instances.findOne({_id: _streamId});

    var subject_data = [subject.starttime, subject.description, stream.name, device.name];

    var final_data_cursor = UXLab.data.streamData.find({_stream: _streamId}, {sort: {timestamp: 1}});

    var csv_format_data = [];

    var data_order = [];

    final_data_cursor.forEach(function(doc, index, cursor) {

      var fields = Object.keys(doc);

      var instance_data = [];

      fields.forEach(function(field, i) {
        if(data_order.indexOf(field) == -1) {
          data_order.push(field);
        }
        if(data_order.indexOf(field) != -1) {
          instance_data[data_order.indexOf(field)] = doc[field];
        }
      });


      csv_format_data.push(instance_data);
    });

    var response_data = [];
    response_data.push(subject_headings);
    response_data.push(subject_data);
    response_data.push([]);
    response_data.push(data_order);
    csv_format_data.forEach(function(row, i) {
      response_data.push(row);
    });

    var data = {};
    data.response = response_data;
    data.filename = subject.starttime + "_" + stream.name + ".csv";
    
    console.log("Filtered data sent");

    return data;

  }
});

Meteor.publish("stream-prototypes", function (_app) {
  return UXLab.data.streams.prototypes.find({application: _app});
});

Meteor.publish("stream-instances", function (_subject) {
  return UXLab.data.streams.instances.find({subject: _subject});
});

Meteor.publish("application-stream-instances", function (app) {
  return UXLab.data.streams.instances.find({application: _app});
});

Meteor.publish("streams-prototypes-fields", function(_app){
  return UXLab.data.streams.fields.find({application: _app});
});

UXLab.data.streams.fields.allow({
  update: function(userId, doc, fieldnames){
    return (Meteor.user() && fieldnames.length == 1 && fieldnames[0] == "promote");
  }
});
