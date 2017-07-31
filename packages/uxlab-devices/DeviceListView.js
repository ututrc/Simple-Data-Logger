Template.DeviceListView.onCreated(function () {
  this.subscribe("devices");
});

Template.DeviceListView.helpers({
  devices: function() {return UXLab.data.devices.find({});}
});
