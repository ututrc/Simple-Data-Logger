Template.StreamDataTableView.onCreated(function () {
  this.subscribe("streamdata", Template.currentData()._id, 100);
});

Template.StreamDataTableView.helpers({
  inputData: function() {


    return UXLab.data.streamData.find({}, {sort: {_timestamp: -1}});
  },
  streamFields:  function() {

    var fields = Template.currentData().fields;

    fields.push("Received");

    return fields;
  }
});

Template.StreamDataTableRow.helpers({
    dataFields:  function() {

      var stream = UXLab.data.streams.instances.findOne({_id: Template.currentData()._stream});
      var data = [];

      if(stream) {

        stream.fields.forEach(function(field) {
          data.push(Template.currentData()[field]);
        });

        data.push(Template.currentData()._timestamp);

      }

      return data;
    },
});
