
$(document).ready(function() {
  const timeBlocksContainer = $('.container-lg');
  const dateContainer = $('#currentDay');

  // Create and append time blocks for each hour of the day
  for (let i = 0; i <= 23; i++) {
    const timeBlock = $('<div>').attr('id', 'hour-' + i).addClass('row time-block');

    // Added appropriate class for past, present, or future time
    if (i < dayjs().hour()) {
      timeBlock.addClass('past');
    } else if (i === dayjs().hour()) {
      timeBlock.addClass('present');
    } else {
      timeBlock.addClass('future');
    }

    // Added hour text
    const hour = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(dayjs().hour(i).format('hA'));
    timeBlock.append(hour);

    // Added textarea
    const description = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');

    // Get saved text from local storage, if any
    const savedText = localStorage.getItem('hour-' + i);
    if (savedText) {
      description.val(savedText);
    }

    timeBlock.append(description);

    // Added save button
    const button = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');

    // Save text to local storage when button is clicked
    button.on('click', function() {
      const text = description.val();
      localStorage.setItem('hour-' + i, text);
    });

    const icon = $('<i>').addClass('fas fa-save').attr('aria-hidden', true);
    button.append(icon);
    timeBlock.append(button);

    timeBlocksContainer.append(timeBlock);
  }

  // Update date/time every second
  let updateDateTime = function() {
    const now = dayjs();
    const timeString = now.format('h:mm:ss A');
    const dateString = now.format('MMM DD, YYYY');
    dateContainer.text(dateString + ' ' + timeString);
  }
  setInterval(updateDateTime, 1000);
});
