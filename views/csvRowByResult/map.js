(function(doc) {
  var bySubtest, datetimeCount, datetimeSuffix, exportValue, exportValueMap, i, item, label, linearOrder, metaData, metaKey, metaKeys, monthData, months, observationData, observations, optionKey, optionValue, orderMap, pair, prototype, rawIndex, row, startTime, subtest, subtestIndex, surveyValue, surveyVariable, variableName, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _results;
  if (doc.collection === "result") {
    exportValueMap = {
      "correct": 1,
      "checked": 1,
      "incorrect": "0",
      "unchecked": "0",
      "missing": ".",
      "not_asked": ".",
      "skipped": 999
    };
    metaKeys = ["enumerator", "start_time", "order_map"];
    exportValue = function(databaseValue) {
      if (databaseValue == null) {
        databaseValue = "no_record";
      }
      if (exportValueMap[databaseValue] != null) {
        return exportValueMap[databaseValue];
      } else {
        return String(databaseValue);
      }
    };
    pair = function(key, value) {
      var o;
      if (value === void 0) {
        value = "no_record";
      }
      o = {};
      o[key] = value;
      return o;
    };
    metaData = [];
    for (_i = 0, _len = metaKeys.length; _i < _len; _i++) {
      metaKey = metaKeys[_i];
      if (doc[metaKey] != null) {
        metaData.push(pair(metaKey, doc[metaKey]));
      }
    }
    startTime = doc['starttime'] || doc['start_time'];
    metaData.push(pair("start_time", startTime));
    metaData.push(pair("order_map", doc['order_map'] != null ? doc['order_map'].join(",") : "no_record"));
    bySubtest = [metaData];
    datetimeCount = 0;
    linearOrder = (function() {
      _results = [];
      for (var _j = 0, _ref = doc.subtestData.length - 1; 0 <= _ref ? _j <= _ref : _j >= _ref; 0 <= _ref ? _j++ : _j--){ _results.push(_j); }
      return _results;
    }).apply(this);
    orderMap = doc["order_map"] != null ? doc["order_map"] : doc["orderMap"] ? doc["orderMap"] : linearOrder;
    for (_k = 0, _len1 = linearOrder.length; _k < _len1; _k++) {
      rawIndex = linearOrder[_k];
      row = [];
      subtestIndex = orderMap.indexOf(rawIndex);
      subtest = doc.subtestData[subtestIndex];
      if (subtest == null) {
        log("skipped empty subtest");
        log(doc);
        continue;
      }
      prototype = subtest.prototype;
      if (prototype === "id") {
        row.push(pair("id", subtest.data.participant_id));
      } else if (prototype === "location") {
        _ref1 = subtest.data.labels;
        for (i = _l = 0, _len2 = _ref1.length; _l < _len2; i = ++_l) {
          label = _ref1[i];
          row.push(pair(label, subtest.data.location[i]));
        }
      } else if (prototype === "datetime") {
        months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        if (~months.indexOf(subtest.data.month.toLowerCase())) {
          monthData = months.indexOf(subtest.data.month.toLowerCase()) + 1;
        } else {
          monthData = subtest.data.month;
        }
        datetimeSuffix = datetimeCount > 0 ? "_" + datetimeCount : "";
        row.push(pair("year" + datetimeSuffix, subtest.data.year));
        row.push(pair("month" + datetimeSuffix, monthData));
        row.push(pair("date" + datetimeSuffix, subtest.data.day));
        row.push(pair("assess_time" + datetimeSuffix, subtest.data.time));
        datetimeCount++;
      } else if (prototype === "consent") {
        row.push(pair("consent", subtest.data.consent));
      } else if (prototype === "grid") {
        variableName = subtest.data.variable_name;
        row.push(pair("" + variableName + "_auto_stop", subtest.data.auto_stop));
        row.push(pair("" + variableName + "_time_remain", subtest.data.time_remain));
        row.push(pair("" + variableName + "_attempted", subtest.data.attempted));
        row.push(pair("" + variableName + "_item_at_time", subtest.data.item_at_time));
        row.push(pair("" + variableName + "_time_intermediate_captured", subtest.data.time_intermediate_captured));
        _ref2 = subtest.data.items;
        for (i = _m = 0, _len3 = _ref2.length; _m < _len3; i = ++_m) {
          item = _ref2[i];
          row.push(pair("" + variableName + (i + 1), exportValue(item.itemResult)));
        }
      } else if (prototype === "survey") {
        _ref3 = subtest.data;
        for (surveyVariable in _ref3) {
          surveyValue = _ref3[surveyVariable];
          if (surveyValue === Object(surveyValue)) {
            for (optionKey in surveyValue) {
              optionValue = surveyValue[optionKey];
              row.push(pair("" + surveyVariable + "_" + optionKey, exportValue(optionValue)));
            }
          } else {
            row.push(pair(surveyVariable, exportValue(surveyValue)));
          }
        }
      } else if (prototype === "observation") {
        _ref4 = subtest.data.surveys;
        for (i = _n = 0, _len4 = _ref4.length; _n < _len4; i = ++_n) {
          observations = _ref4[i];
          observationData = observations.data;
          for (surveyVariable in observationData) {
            surveyValue = observationData[surveyVariable];
            if (surveyValue === Object(surveyValue)) {
              for (optionKey in surveyValue) {
                optionValue = surveyValue[optionKey];
                row.push(pair("" + surveyVariable + "_" + optionKey + "_" + (i + 1), exportValue(optionValue)));
              }
            } else {
              row.push(pair("" + surveyVariable + "_" + (i + 1), exportValue(surveyValue)));
            }
          }
        }
      } else if (prototype === "gps") {
        row.push(pair("latitude", subtest.data.lat));
        row.push(pair("longitude", subtest.data.long));
        row.push(pair("accuracy", subtest.data.acc));
        row.push(pair("altitude", subtest.data.alt));
        row.push(pair("altitudeAccuracy", subtest.data.altAcc));
        row.push(pair("heading", subtest.data.heading));
        row.push(pair("speed", subtest.data.speed));
        row.push(pair("timestamp", subtest.data.timestamp));
      } else if (prototype === "complete") {
        row.push(pair("additional_comments", subtest.data.comment));
        row.push(pair("end_time", subtest.data.end_time));
      }
      row.push(pair("time_stamp_" + (rawIndex + 1), subtest.timestamp));
      bySubtest.push(row);
    }
    return emit(doc.assessmentId, bySubtest);
  }
});