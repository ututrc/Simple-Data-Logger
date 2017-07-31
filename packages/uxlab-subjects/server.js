Meteor.startup(function () {
  // code to run on server at startup
  //UXLab.data.subjects.insert({starttime: "2015-05-28 12:12:12", live: true, application: "KwbQneYdx88cBS53p", device: "zfmur8xSpPzPsGiAF"});
});

Meteor.methods({
  createSubject:function(_subjectId, _time, _live, _app, _device){

    if(_live) {
        UXLab.data.subjects.update({device: _device}, {$set: {live: false}}, {multi: true});
    }

    UXLab.data.subjects.insert({_id: _subjectId, starttime: _time, live: _live, application: _app, device: _device, description: "Test started on "+Date().toLocaleString()});
  },
  removeSubject:function(id){
    if(Meteor.user()) {
      UXLab.data.subjects.remove({_id: id});
    }
  }
});

Meteor.publish("subjects", function (applicationId) {
  return UXLab.data.subjects.find({application: applicationId}, {sort: {starttime: -1}});
});


UXLab.data.subjects.allow({
  update: function(userId, doc, fieldnames){
    return (Meteor.user() && fieldnames.length == 1 && fieldnames[0] == "description");
  }
});
