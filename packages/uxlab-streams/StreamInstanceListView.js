Template.StreamInstanceListView.onCreated(function () {
  this.subscribe("applications");
  //if(Template.currentData())
  //  this.subscribe("subject-streams", Template.currentData()._id);
});

Template.StreamInstanceListView.helpers({
  subjectStreams: function() {
    if(Template.currentData()) {
        return UXLab.data.streams.instances.find({subject: Template.currentData()._id});
      }

      return null;
    }
});
