/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, Fragment } from "react";
import { Modal } from "react-bootstrap";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Button } from "@material-ui/core";
import { DAYS_SHORT, MONTHS, SAMPLE_META, preloadedEvents } from "./CalenderOptions";

// Sample events calendar build, explained and detailed over at
// https://justacoding.blog/react-calendar-component-example-with-events/

// Some config for convenience
const MOCK_LOADING_TIME = 1000;





const toStartOfDay = (date: string | number | Date) => {
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};

const pad = (input: string | number) => {
  // @ts-ignore
  return input < 10 ? "0" + input : input;
};

// I'm using default <input type="datepick-local">,
// so a specific date format is required
const dateToInputFormat = (date: { getMonth: () => number; getDate: () => any; getHours: () => any; getMinutes: () => any; getFullYear: () => any; }) => {
  if (!date) {
    return null;
  }

  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}`;
};

// Could be used to filter out invalid events data also
// (ie. missing properties) or events that can't be parsed
// to contain valid to/from dates
const parseEvents = (events: any[]) => {
  return events.map((event: { dateFrom: string | number | Date; dateTo: string | number | Date; }) => {
    const from = new Date(event.dateFrom);
    const to = new Date(event.dateTo);

    return {
      ...event,
      from,
      to,
    };
  });
};

const findEventsForDate = (events: any[], date: Date) => {
  const dateTime = date.getTime();

  return events.filter((event: { from: any; to: any; }) => {
    const eventFromTime = toStartOfDay(event.from).getTime();
    const eventToTime = toStartOfDay(event.to).getTime();

    return dateTime >= eventFromTime && dateTime <= eventToTime;
  });
};

// Top bar, contains the month/year combo as well as back/forward links
const Navigation = ({ date, setDate, setShowingEventForm }: any) => {
  return (
    <div className="navigation">
      <div
        className="back"
        onClick={() => {
          const newDate = new Date(date);
          newDate.setMonth(newDate.getMonth() - 1);
          setDate(newDate);
        }}>
        {<MdArrowBackIos size={20} />}{" "}
        {MONTHS[date.getMonth() === 0 ? 11 : date.getMonth() - 1]}
      </div>

      <div className="monthAndYear">
        {MONTHS[date.getMonth()]} {date.getFullYear()}
        <a
          // eslint-disable-next-line no-script-url
          href="javascript:;"
          onClick={() => setShowingEventForm({ visible: true })}>
          +
        </a>
      </div>

      <div
        className="forward"
        onClick={() => {
          const newDate = new Date(date);
          newDate.setMonth(newDate.getMonth() + 1);
          setDate(newDate);
        }}>
        {MONTHS[date.getMonth() === 11 ? 0 : date.getMonth() + 1]}{" "}
        {<MdArrowForwardIos size={20} />}
      </div>
    </div>
  );
};

// Week day headers: Mon, Tue, Wed etc
const DayLabels = () => {
  return DAYS_SHORT.map((dayLabel, index) => {
    return (
      <div className="dayLabel cell" key={index}>
        {dayLabel}
      </div>
    );
  });
};

// An individual event displayed within the calendar grid itself
// can be clicked to open the main event view
const MiniEvent = ({ event, setViewingEvent }: any) => {
  return (
    <div
      className={`miniEvent ${event.type ? event.type.toLowerCase() : "standard"
        }`}
      onClick={() => setViewingEvent(event)}>
      {event.name}
    </div>
  );
};

// The main event view, opens in a modal and contains all information
// about the event in question
const Event = ({
  event,
  setViewingEvent,
  setShowingEventForm,
  deleteEvent,
}: any) => {
  return (
    <Modals
      onClose={() => setViewingEvent(null)}
      title={`${event.name} (${event.type})`}
      className="eventModal">
      <p>
        From <b>{event.dateFrom}</b> to <b>{event.dateTo}</b>
      </p>
      <p>{event.meta}</p>

      <button
        className="button-green"
        // @ts-ignore
        // eslint-disable-next-line no-script-url
        href="javascript:;"
        onClick={() => {
          setViewingEvent(null);
          setShowingEventForm({ visible: true, withEvent: event });
        }}>
        Change this event
      </button>

      <button
        className="button-red"
        // @ts-ignore
        // eslint-disable-next-line no-script-url
        href="javascript:;"
        onClick={() => deleteEvent(event)}>
        Delete this event
      </button>

      <a
        className="close"
        // eslint-disable-next-line no-script-url
        href="javascript:;"
        onClick={() => setViewingEvent(null)}>
        Back to calendar
      </a>
    </Modals>
  );
};

// Form to add new events or edit existing events
// In a real implementation, we'd have some frontend
// validation and also the equivalent in our
// backend service...
const EventForm = ({
  setShowingEventForm,
  addEvent,
  editEvent,
  withEvent,
  setViewingEvent,
  preselectedDate,
}: any) => {
  const newEvent = withEvent || {};
  if (!withEvent && !!preselectedDate) {
    newEvent.dateFrom = dateToInputFormat(preselectedDate);
  }
  const [event, setEvent] = useState(newEvent);

  return (
    <Modals
      onClose={() => setShowingEventForm({ visible: false })}
      title={`${withEvent ? "Edit event" : "Add a new event"}`}>
      <div className="form">
        <label>
          Name
          <input
            type="text"
            placeholder="ie. My Event"
            defaultValue={event.name}
            onChange={(e) => setEvent({ ...event, name: e.target.value })}
          />
        </label>

        <label>
          Date from
          <input
            type="datetime-local"
            defaultValue={event.dateFrom || dateToInputFormat(preselectedDate)}
            onChange={(e) => setEvent({ ...event, dateFrom: e.target.value })}
          />
        </label>

        <label>
          Date to
          <input
            type="datetime-local"
            defaultValue={event.dateTo}
            onChange={(e) => setEvent({ ...event, dateTo: e.target.value })}
          />
        </label>

        <label>
          Type
          <select
            value={event.type ? event.type.toLowerCase() : "standard"}
            onChange={(e) => setEvent({ ...event, type: e.target.value })}>
            <option value="standard">Standard</option>
            <option value="busy">Busy</option>
            <option value="holiday">Holiday</option>
          </select>
        </label>

        <label>
          Description
          <input
            type="text"
            placeholder="Describe the event"
            defaultValue={event.meta}
            onChange={(e) => setEvent({ ...event, meta: e.target.value })}
          />
        </label>

        {withEvent ? (
          <Fragment>
            <button onClick={() => editEvent(event)}>Edit event</button>
            <a
              className="close"
              // eslint-disable-next-line no-script-url
              href="javascript:;"
              onClick={() => {
                setShowingEventForm({ visible: false });
                setViewingEvent(event);
              }}>
              Cancel (go back to event view)
            </a>
          </Fragment>
        ) : (
          <Fragment>
            <button onClick={() => addEvent(event)}>
              Add event to calendar
            </button>
            <a
              className="close"
              // eslint-disable-next-line no-script-url
              href="javascript:;"
              onClick={() => setShowingEventForm({ visible: false })}>
              Cancel (go back to calendar)
            </a>
          </Fragment>
        )}
      </div>
    </Modals>
  );
};

// Generic component - modal to present children within
const Modals = ({ children, onClose, title, className }: any) => {
  return (
    // @ts-ignore
    <Modal show={true} size="md">
      <Fragment>
        <div className="overlay" onClick={onClose} />
        <div className={`modal-calender ${className}`}>
          <h3>{title}</h3>
          <div className="inner">{children}</div>
        </div>
      </Fragment>
    </Modal>
  );
};

// Generic component - a nicely animated loading spinner
const Loader = () => {
  return (
    <Fragment>
      <div className="overlay" />
      <div className="loader">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Fragment>
  );
};

// Generic component - simple feedback after an action has taken place
const Feedback = ({ message, type }: any) => {
  return <div className={`feedback ${type}`}>{message}</div>;
};

// The grid of days, renders a month's worth of days and
// also populates the events on the relevant dates
const Grid = ({
  date,
  events,
  setViewingEvent,
  setShowingEventForm,
  actualDate,
}: any) => {
  const ROWS_COUNT = 6;
  const currentDate = toStartOfDay(new Date());

  // Finds the closest Monday relative to the first day of
  // the target month/year combination
  // Then increment upon this day until we have a full set
  // of date objects to work with
  const startingDate = new Date(date.getFullYear(), date.getMonth(), 1);
  startingDate.setDate(startingDate.getDate() - (startingDate.getDay() - 1));

  const dates = [];
  for (let i = 0; i < ROWS_COUNT * 7; i++) {
    const date = new Date(startingDate);
    dates.push({ date, events: findEventsForDate(events, date) });
    startingDate.setDate(startingDate.getDate() + 1);
  }

  return (
    <Fragment>
      {dates.map((date, index) => {
        return (
          <div
            key={index}
            className={`cell ${date.date.getTime() === currentDate.getTime() ? "current" : ""
              } ${date.date.getMonth() !== actualDate.getMonth() ? "otherMonth" : ""
              }`}>
            <div className="date">
              {date.date.getDate()}
              <a
                // eslint-disable-next-line no-script-url
                href="javascript:;"
                className="addEventOnDay"
                onClick={() =>
                  setShowingEventForm({
                    visible: true,
                    preselectedDate: date.date,
                  })
                }>
                +
              </a>
            </div>
            {date.events.map((event: any, index: React.Key | null | undefined) => (
              <MiniEvent
                key={index}
                event={event}
                setViewingEvent={setViewingEvent}
              />
            ))}
          </div>
        );
      })}
    </Fragment>
  );
};

// The "main" component, our actual calendar
const Calendar = ({ month, year, preloadedEvents = [] }: any) => {
  const selectedDate = new Date(year, month - 1);

  const [date, setDate] = useState(selectedDate);
  const [viewingEvent, setViewingEvent] = useState(false);
  const [showingEventForm, setShowingEventForm] = useState({ visible: false });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState();

  const parsedEvents = parseEvents(preloadedEvents);
  const [events, setEvents] = useState(parsedEvents);

  useEffect(() => {
    // You could retrieve fresh events data here
    // So whenever the calendar month is toggled,
    // make a request and populate `events` with the
    // new results

    // Would be better to cache these results so you
    // don't make needless network requests
    // So you could maintain an array of `date`s
    // and simply consult this before you fire off
    // any new network requests
    console.log("Date has changed... Let's load some fresh data");
  }, [date]);

  const addEvent = (event: any) => {
    setIsLoading(true);
    setShowingEventForm({ visible: false });

    // These timeouts are to imitate HTTP requests
    // So in a real impementation, you'd interact
    // with your backend service here and handle
    // the result accordingly...
    // Likewise for `editEvent` and `deleteEvent`
    // below
    setTimeout(() => {
      const parsedEvents = parseEvents([event]);

      const updatedEvents = [...events];
      updatedEvents.push(parsedEvents[0]);

      setEvents(updatedEvents);
      setIsLoading(false);
      showFeedback({ message: "Event created successfully", type: "success" });
    }, MOCK_LOADING_TIME);
  };

  const editEvent = (event: { id: any; }) => {
    setIsLoading(true);
    setShowingEventForm({ visible: false });

    setTimeout(() => {
      const parsedEvent = parseEvents([event]);

      const updatedEvents = [...events].map((updatedEvent) => {
        // @ts-ignore
        return updatedEvent.id === event.id ? parsedEvent[0] : updatedEvent;
      });

      setEvents(updatedEvents);
      setIsLoading(false);
      showFeedback({ message: "Event edited successfully", type: "success" });
    }, MOCK_LOADING_TIME);
  };

  const deleteEvent = (event: { id: any; }) => {
    setIsLoading(true);
    // @ts-ignore
    setViewingEvent(null);

    setTimeout(() => {
      const updatedEvents = [...events].filter(
        // @ts-ignore
        (finalEvent) => finalEvent.id !== event.id
      );

      setEvents(updatedEvents);
      setIsLoading(false);
      showFeedback({ message: "Event deleted successfully", type: "success" });
    }, MOCK_LOADING_TIME);
  };

  const showFeedback = ({ message, type, timeout = 2500 }: any) => {
    // @ts-ignore
    setFeedback({ message, type });
    setTimeout(() => {
      // @ts-ignore
      setFeedback(null);
    }, timeout);
  };

  return (
    <div className="calendar">
      {isLoading && <Loader />}
      {/* @ts-ignore */}
      {feedback && <Feedback message={feedback.message} type={feedback.type} />}
      <Navigation
        date={date}
        setDate={setDate}
        setShowingEventForm={setShowingEventForm}
      />
      {/* @ts-ignore */}
      <DayLabels />
      <Grid
        date={date}
        events={events}
        setShowingEventForm={setShowingEventForm}
        setViewingEvent={setViewingEvent}
        actualDate={date}
      />
      {viewingEvent && (
        <Event
          event={viewingEvent}
          setShowingEventForm={setShowingEventForm}
          setViewingEvent={setViewingEvent}
          deleteEvent={deleteEvent}
        />
      )}
      {showingEventForm && showingEventForm.visible && (

        <EventForm
          // @ts-ignore
          withEvent={showingEventForm.withEvent}
          // @ts-ignore
          preselectedDate={showingEventForm.preselectedDate}
          setShowingEventForm={setShowingEventForm}
          addEvent={addEvent}
          editEvent={editEvent}
          setViewingEvent={setViewingEvent}
        />
      )}
    </div>
  );
};

// Get current date
const dateToday = new Date();

// Get current month in javascript
const currentMonth = dateToday.getMonth() + 1;
const currentYear = dateToday.getFullYear();


export const Calendars = ({ date, setDate }: any) => (
  <div>
    {/* <div className="DashboardCalender-top-btn">
      <div className="Calender-top-btn-sup"> */}
    {/* <div
          className="back"
          onClick={() => {
            const newDate = new Date(date);
            newDate.setMonth(newDate.getMonth() - 1);
            setDate(newDate);
          }}>
          <MdArrowBackIos size={20} />
        </div> */}
    {/* </div>
      <div>
        <Button variant="contained" className="Create-event-Calender">
          Add event
        </Button>
      </div>
    </div> */}
    <Calendar
      month={currentMonth}
      year={currentYear}
      preloadedEvents={preloadedEvents}
    />
    ,
  </div>
);
