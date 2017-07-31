Template.SubjectListView.onCreated(function () {
  this.subscribe("subjects", Session.get("currentApplication"));
  this.subscribe("devices");
});

Template.SubjectListView.helpers({
  subjects: function() {return UXLab.data.subjects.find({}, {sort: {starttime: -1}});}
});

Template.SubjectListItem.onCreated(function () {
  this.subscribe("devices");
});

Template.SubjectListItem.helpers({
  isLive: function() {return (Template.currentData().live == true)},
  deviceName: function() {
    if(Template.currentData()) {

      var device = UXLab.data.devices.findOne({_id: Template.currentData().device});

      if(device)
        return device.name;
    }

    return "n/a";

  },
  time: function() {
    return new Date(Template.currentData().starttime).toLocaleString();
  }
});
