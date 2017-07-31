Meteor.startup(function () {
  // code to run on server at startup
  //Streams.insert({name: "gps", application: "KwbQneYdx88cBS53p", fields: [latitude, longitude, accuracy, heading], privateKey: "", publicKey: ""});

});

Meteor.methods({
  resetApplicationSettings:function() {
     UXLab.settings.remove({});

     UXLab.settings.insert({name: "serverUrl", description: "Server URL", value: "localhost:8080", default: "localhost:8080", type:"url"});
  },
  updateApplicationSetting: function(_settingId, _settingValue) {

    var settingValue = _settingValue.trim();

    var originalSetting = UXLab.settings.findOne({_id: _settingId});

    if(originalSetting) {
      switch (originalSetting.type) {
        case "url":
          check(settingValue, String);
          if(settingValue.substring(0,7) != "http://" && settingValue.substring(0,8) != "https://") {
            settingValue = "http://"+settingValue;
          }
          if(settingValue.slice(-1) != "/") {
            settingValue = settingValue + "/";
          }
          break;
        default:

      }

      UXLab.settings.update({_id: _settingId}, {$set: {value: settingValue}});
    }
  },
  upgradeDatabase: function() {
    //Upgrade

    UXLab.data.streams.prototypes.find({}).forEach(function(proto) {
      if(proto.fields != undefined) {
        proto.fields.forEach(function(field) {
          UXLab.data.streams.fields.insert({name: field, stream: proto._id, default: "n/a", promote: false, application: proto.application});
          console.log("Create stream field: " + proto.name + ":" + field);
        });
      }
    });

    UXLab.data.streams.prototypes.update({}, {$unset: {fields: ""}},{multi: true});

    UXLab.data.subjects.find({}).forEach(function(subject) {
      UXLab.data.subjects.update({_id: subject._id}, {$set: {starttime: Date.parse(subject.starttime)}});
    });

    UXLab.data.devices.update({}, {$set: {promote: false}}, {multi: true});

    UXLab.data.streams.instances.find({}).forEach(function(_stream) {
      UXLab.data.streamData.update({stream: _stream._id}, {$set: {application: _stream.application}}, {multi: true});
    });
  }
});

Meteor.publish("application-settings", function () {
  return UXLab.settings.find({}); //
});

UXLab.settings.allow({
  update: function(userId, doc, fieldnames){
    return (Meteor.user() && fieldnames.length == 1 && fieldnames[0] == "value");
  }
});
