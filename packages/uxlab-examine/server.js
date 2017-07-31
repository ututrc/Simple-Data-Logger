Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.methods({
  queryData: function(filterChain) {

    this.unblock();

    var final_data_cursor = UXLab.data.streamData.find({answer: {$exists: true, $nin: ["excludeAnswer1", "excludeAnswer2"]}, _application: filterChain.application}); //Sample

    var final_data = {};

    var data_order = [];

    final_data_cursor.map(function(document, index, cursor) {

      if(final_data[document._stream] == undefined)
        final_data[document._stream] = [];

      if(data_order.indexOf(document.question) == -1) {
        data_order.push(document.question);
      }

      final_data[document._stream][data_order.indexOf(document.question)] = document.answer;
    });


    var csv_format_data = [];
    for(var value in final_data) {
      csv_format_data.push(final_data[value]);
    }

    csv_format_data.sort(function(a,b) {
      if(a.length < b.length)
        return 1;
      if(a.length > b.length)
        return -1;

      return 0;
    });

    csv_format_data.unshift(data_order);

    console.log("Filtered data sent");
    return csv_format_data;

  }
});
