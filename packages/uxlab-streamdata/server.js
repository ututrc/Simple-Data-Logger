Meteor.startup(function () {
  // code to run on server at startup
  //UXLab.data.devices.insert({name: "testi-ipad", deviceid: "q3hv7gnoifyhi", live: true});

});

Meteor.methods({
  inputData: function(_streamId, _data) {

    var inputdata = {};

    var stream = UXLab.data.streams.instances.findOne({_id: _streamId});

    if(stream) {

      for(var field in _data) {
        if(_data.hasOwnProperty(field)) {
          var fieldValue = _data[field];
          if(stream.fields.indexOf(field) > -1) {
            inputdata[field] = _data[field];
          }
        }
      }

      inputdata._stream = _streamId;
      inputdata._timestamp = Date.now();
      inputdata._application = stream.application;

      UXLab.data.streamData.insert(inputdata, function() {

      });

      return true;

    }
  return false;

  }
});

Meteor.publish("streamdata", function (_streamId, _limit) {
  var lim = 0;
  if(_limit !== undefined && _limit > 0) {
    lim = _limit;
  }

  return UXLab.data.streamData.find({_stream: _streamId}, {sort: {_timestamp: -1}, limit: lim});
});

Meteor.publish("application-streamdata", function (_app) {
  return UXLab.data.streamData.find({}); //Template.currentData().application
});
