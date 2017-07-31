Template.StreamPrototypeFieldListView.onCreated(function () {
  this.subscribe("streams-prototypes-fields", Template.currentData().application);
});


Template.StreamPrototypeFieldListView.helpers({
  fields: function() {
    return UXLab.data.streams.fields.find({stream: Template.currentData()._id});
  }
});

Template.StreamPrototypeFieldListItem.helpers({
  fieldId: function() {
    return "edit_"+Template.currentData()._id;
  }
});
