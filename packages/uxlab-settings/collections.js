UXLab.settings = new Mongo.Collection("application-settings");

UXLab.settings.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Setting"
  },
  description: {
    type: String,
    label: "Description"
  },
  value: {
    type: String,
    label: "Value"
  },
  default: {
    type: String,
    label: "Default"
  },
}));
