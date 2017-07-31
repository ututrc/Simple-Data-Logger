Meteor.startup(function () {
  // code to run on server at startup
  //UXLab.data.devices.insert({name: "testi-ipad", deviceid: "q3hv7gnoifyhi", live: true});

});

Meteor.methods({
  createDevice:function(_deviceid){
    UXLab.data.devices.insert({name: "unknown", deviceid: _deviceid, running: 0, description: "Unknown device", promote: false});
  },
  removeDevice:function(id){

    if(Meteor.user()) {
      UXLab.data.devices.remove({_id: id});
    }
  }
});

Meteor.publish("devices", function () {
  return UXLab.data.devices.find({});
});

UXLab.data.devices.allow({
  update: function(userId, doc, fieldnames){
    return (Meteor.user() && fieldnames.length == 1 && (fieldnames[0] == "name" || fieldnames[0] == "promote") );
  }
});
