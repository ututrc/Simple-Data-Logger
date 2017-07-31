UXLab.data.streams = {};
UXLab.data.streams.instances = new Mongo.Collection("stream-instances");
UXLab.data.streams.prototypes = new Mongo.Collection("stream-prototypes");

UXLab.data.streams.fields = new Mongo.Collection("stream-fields");
UXLab.data.streams.fields.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  stream: {
    type: String,
    label: "Stream ID"
  },
  application: {
    type: String,
    label: "Application ID"
  },
  default: {
    type: String,
    label: "Default value"
  },
  promote: {
    type: Boolean,
    label: "Promote"
  },
}));
