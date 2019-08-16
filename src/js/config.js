/*
MIT License
Copyright (c) 2018 Cybozu
https://github.com/kintone/SAMPLE-Show-DoW-plug-in/blob/master/LICENSE
*/

jQuery.noConflict();
(function($, PLUGIN_ID) {
  'use strict';
  // Get configuration settings

  var CONF = kintone.plugin.app.getConfig(PLUGIN_ID);
  var $form = $('.js-submit-settings');
  var $cancelButton = $('.js-cancel-button');
  var $date = $('select[name="js-select-date-field"]');
  var $sun = $('input[name="js-sun-text"]');
  var $mon = $('input[name="js-mon-text"]');
  var $tue = $('input[name="js-tue-text"]');
  var $wed = $('input[name="js-wed-text"]');
  var $thu = $('input[name="js-thu-text"]');
  var $fri = $('input[name="js-fri-text"]');
  var $sat = $('input[name="js-sat-text"]');

  function escapeHtml(htmlstr) {
    return htmlstr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function setDropDown() {
    // Retrieve field information, then set dropdown
    return KintoneConfigHelper.getFields('DATE').then(function(resp) {
      var $dateDropDown = $date;
      var days;
      resp.forEach(function(respField) {
        var $option = $('<option></option>');
        switch (respField.type) {
          case 'DATE':
            $option.attr('value', respField.code);
            $option.text(escapeHtml(respField.label));
            $dateDropDown.append($option.clone());
            break;
          default:
            break;
        }
      });

      // Set default values
      $date.val(CONF.date_field);
      if (CONF.name_of_days === undefined) {
        return; // Return if config is not set.
      }
      days = JSON.parse(CONF.name_of_days);
      $sun.val(days[0]);
      $mon.val(days[1]);
      $tue.val(days[2]);
      $wed.val(days[3]);
      $thu.val(days[4]);
      $fri.val(days[5]);
      $sat.val(days[6]);
    }, function() {
      return alert('Failed to retrieve field(s) information');
    });
  }

  $(document).ready(function() {
    // Set dropdown list
    setDropDown();
    // Set input values when 'Save' button is clicked
    $form.on('submit', function(e) {
      var config = [];
      var days = [];
      var date = $date.val();
      var sun = $sun.val();
      var mon = $mon.val();
      var tue = $tue.val();
      var wed = $wed.val();
      var thu = $thu.val();
      var fri = $fri.val();
      var sat = $sat.val();
      e.preventDefault();
      days.push(sun, mon, tue, wed, thu, fri, sat);
      config.date_field = date;
      config.name_of_days = JSON.stringify(days);
      kintone.plugin.app.setConfig(config, function() {
        alert('The plug-in settings have been saved. Please update the app!');
        window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId();
      });
    });
    // Process when 'Cancel' is clicked
    $cancelButton.on('click', function() {
      window.location.href = '/k/admin/app/' + kintone.app.getId() + '/plugin/';
    });
  });
})(jQuery, kintone.$PLUGIN_ID);
