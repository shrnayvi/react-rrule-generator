import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateTime from 'react-datetime';
import 'moment/min/locales';

import { DATE_TIME_FORMAT, DATE_WITH_TIME_FORMAT } from '../../constants/index';
import translateLabel from '../../utils/translateLabel';

const StartOnDate = ({
  id,
  onDate: {
    date,
    options,
  },
  handleChange,
  translations,
  needTimeFormat,
}) => {
  const CustomCalendar = options.calendarComponent;
  const locale = options.weekStartsOnSunday ? 'en-ca' : 'en-gb';
  const resultingDateTimeFormat = needTimeFormat ? DATE_WITH_TIME_FORMAT : DATE_TIME_FORMAT;
  const calendarAttributes = {
    'aria-label': translateLabel(translations, 'start.tooltip'),
    value: date,
    dateFormat: DATE_TIME_FORMAT,
    locale,
    readOnly: true,
  };

  return (
    <div className="col-6 col-sm-3">
      {
        CustomCalendar
          ? <CustomCalendar
            key={`${id}-calendar`}
            {...calendarAttributes}
            onChange={(event) => {
              const editedEvent = {
                target: {
                  value: event.target.value,
                  name: 'start.onDate.date',
                },
              };

              handleChange(editedEvent);
            }}
          />
          : <DateTime
            ariaLabel={translateLabel(translations, 'start.tooltip')}
            value={moment(date)}
            dateFormat={DATE_TIME_FORMAT}
            locale={locale}
            readOnly
            inputProps={
              {
                id: `${id}-datetime`,
                name: 'start.onDate.date',
                readOnly: true,
              }
            }
            locale={translateLabel(translations, 'locale')}
            timeFormat={needTimeFormat}
            viewMode="days"
            closeOnSelect
            closeOnTab
            required
            onChange={(inputDate) => {
              const editedEvent = {
                target: {
                  value: moment(inputDate).format(resultingDateTimeFormat),
                  name: 'start.onDate.date',
                },
              };

              handleChange(editedEvent);
            }}
          />
      }
    </div>
  );
};

StartOnDate.propTypes = {
  id: PropTypes.string.isRequired,
  onDate: PropTypes.shape({
    date: PropTypes.string.isRequired,
    options: PropTypes.shape({
      weekStartsOnSunday: PropTypes.bool,
      calendarComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    }).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  translations: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default StartOnDate;
