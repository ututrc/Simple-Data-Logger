Template.LiveSubjectsView.onCreated(function () {
  this.subscribe("subjects", Session.get("currentApplication"));
  this.subscribe("devices");
});

Template.LiveSubjectsView.helpers({
  liveSubjects: function(){
    var subjects = [];
    UXLab.liveSubjects.forEach(function(subject) {
      var device = UXLab.data.devices.findOne({_id: subject.device});
      if(device) {
        if(device.promote)
          subjects.push(subject);
      }
    });
    return subjects;
  }
});

Tracker.autorun(function () {
  UXLab.liveSubjects = UXLab.data.subjects.find({live: true});
});

Template.LiveSubjectPreview.helpers({
  ago: function() {
    return new Date(Template.currentData().starttime).toString();
  },
  previewData: function() {

    var returnData = [];

    return returnData;
  }
});
