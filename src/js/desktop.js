/*
 * This sample code displays the day of the week next to the Date field.
 * Copyright (c) 2018 Cybozu
 *
 * Licensed under the MIT License
 */
(function(PLUGIN_ID) {
  'use strict';

  // Get plug-in configuration settings
  var CONFIG = kintone.plugin.app.getConfig(PLUGIN_ID);
  var DATE;
  // Get each settings
  if (!CONFIG) {
    return false;
  }

  DATE = CONFIG.date_field; // Field code of Date field

  kintone.events.on(['app.record.detail.show'], function(event) {
    var record = event.record;

    var weekchars = JSON.parse(CONFIG.name_of_days);
    var date = new Date(record[DATE].value);
    var day = weekchars[date.getUTCDay()];
    var dayEl = document.createElement('span');
    var dateEl = kintone.app.record.getFieldElement(DATE);

    dayEl.textContent = ' (' + day + ')';
    dateEl.appendChild(dayEl);

    return event;
  });
})(kintone.$PLUGIN_ID);
