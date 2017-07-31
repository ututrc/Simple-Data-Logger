Template.ExamineView.onCreated(function () {
  this.subscribe("subjects", Session.get("currentApplication"));
});

Template.ExamineView.events({
  "click #search": function() {
    Meteor.call("queryData",{application: Session.get("currentApplication")}, function(error, data) {
      var csv = Papa.unparse(data);
      downloadLocalResource(csv, "data.csv");
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
