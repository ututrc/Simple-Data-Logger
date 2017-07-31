Router.route("/devices", function() {
  this.layout("GlobalView");
  this.render("DeviceListView");
});

Router.route("/devices/:_id", function() {
  this.layout("GlobalView");
  this.render("DeviceView", {
    data: function () { return UXLab.data.devices.findOne({_id: this.params._id}) }
  });
});
