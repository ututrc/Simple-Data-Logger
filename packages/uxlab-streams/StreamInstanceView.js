Template.StreamInstanceView.onCreated(function () {
  if(Template.currentData()) {
    this.subscribe("stream-instances", Template.currentData().subject);
  }
  this.subscribe("subjects");
  this.subscribe("application-settings");
});


Template.StreamInstanceView.events({
  "click #export": function() {
    Meteor.call("exportStream",Template.currentData().subject, Template.currentData()._id, function(error, data) {
      var csv = Papa.unparse(data.response);
      downloadLocalResource(csv, data.filename);
    });
  }
});

downloadLocalResource = function(data, filename, mimeType) {
  filename = filename || "download";
  mimeType = mimeType || "application/octet-stream";
  var bb = new Blob([data], { type: mimeType });
  var link = document.createElement("a");
  link.download = filename;
  link.href= window.URL.createObjectURL(bb);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

Template.StreamInstanceView.helpers({
  serverURL: function(){
     return UXLab.settings.findOne({name: "serverUrl"}).value;
  }
});
