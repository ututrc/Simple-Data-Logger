UXLab.data.devices = new Mongo.Collection("devices");

UXLab.data.devices.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  description: {
    type: String,
    label: "Description"
  },
  deviceid: {
    type: String,
    label: "Device ID"
  },
  promote: {
    type: Boolean,
    label: "Promote"
  },
}));

//UXLab.data.devices.insert({name: "testi-ipad", deviceid: "q3hv7gnoifyhi", live: true});
