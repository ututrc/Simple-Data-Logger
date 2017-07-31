var Api = new Restivus({
    useDefaultAuth: false,
    prettyJson: true
});

// Maps to: /api/posts/:id
Api.addRoute('subject/application/:_app/device/:_device/', {authRequired: false}, {
  get: function () {
    var app = UXLab.data.applications.findOne({_id: this.urlParams._app});
    if (app) {

      var device = UXLab.data.devices.findOne({deviceid: this.urlParams._device});

      var deviceFound = true;

      if(!device) {
        deviceFound = false;
        Meteor.call("createDevice", this.urlParams._device);
        device = UXLab.data.devices.findOne({deviceid: this.urlParams._device});
      }

      var currentDate = new Date();

      var subjectId = Random.id(8);
      while(UXLab.data.subjects.findOne({_id: subjectId})) {
        subjectId = Random.id();
      }

      Meteor.call("createSubject", subjectId, Date.now(), true, this.urlParams._app, device._id);

      var prototypes = UXLab.data.streams.prototypes.find({application: this.urlParams._app});

      var instances = [];

      var apiEndpoint = UXLab.settings.findOne({name: "serverUrl"}).value;

      prototypes.forEach(function(stream) {

        var instanceId = Random.id();
        while(UXLab.data.streams.instances.findOne({_id: instanceId})) {
          instanceId = Random.id();
        }

        var privateKey = Random.id();

        Meteor.call("createStreamInstance", stream, instanceId, privateKey, subjectId, device._id);
        var streamDetails = {name: stream.name, server: apiEndpoint, keys: {public: instanceId, private: privateKey}};


        var fieldList = [];

        UXLab.data.streams.fields.find({stream: stream._id}).forEach(function(field) {
          fieldList.push(field.name);
        });

        streamDetails.fields = fieldList;
        instances.push(streamDetails);
      });

      var returnData = {};

      returnData.success = "true";
      returnData.id = subjectId;
      returnData.new_device = !deviceFound;
      returnData.streams = instances;

      return returnData;
    }

    return {
      statusCode: 404,
      body: {success: 'false', message: 'Application not found'}
    };
  }
});

Api.addRoute('subject/:_id', {authRequired: false}, {
  get: function () {
    var subject = UXLab.data.subjects.findOne({_id: this.urlParams._id});
    if (subject) {

      var dataStreams = UXLab.data.streams.instances.find({subject: this.urlParams._id});

      var inputStreams = [];

      var serverURL = UXLab.settings.findOne({name: "serverUrl"}).value;

      dataStreams.forEach(function(stream) {
        var inputDetails = {name: stream.name, server: serverURL, keys: {public: stream._id, private: stream.privateKey}};
        inputStreams.push(inputDetails);
      });

      var returnData = {};

      returnData.success = "true";
      returnData.id = this.urlParams._id;
      returnData.streams = inputStreams;

      return returnData;
    }

    return {
      statusCode: 404,
      body: {success: 'false', message: 'Subject not found'}
    };
  }
});

Api.addRoute('input/:_id', {authRequired: false}, {
  get: function () {
    var streamId = this.urlParams._id;

    var privateKey = this.queryParams.private_key;

    if(streamId && privateKey) {
      var stream = UXLab.data.streams.instances.findOne({_id: streamId});
      if(stream) {

        if(stream.privateKey == privateKey) {
          if(Meteor.call("inputData", streamId, this.queryParams)) {
            return {statusCode: 200, body: "1 success"};
          } else {
              return {statusCode: 404, body: "0 Field error"};
          }
        } else {
            return {statusCode: 404, body: "0 Stream key mismatch"};
        }
      } else {
          return {statusCode: 404, body: "0 Stream not found"};
      }
    }

    return {statusCode: 404, body: "0 Insufficient data provided"};
  }
});
