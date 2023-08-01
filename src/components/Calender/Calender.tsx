/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, Fragment } from "react";
import { Modal } from "react-bootstrap";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Button } from "@material-ui/core";
import { DAYS_SHORT, MONTHS, SAMPLE_META, Loader } from "./CalenderOptions";
import { Navigation } from "./CalenderNavigation";
import { Grid } from "./GridCalender";
import EventForm from "./EventForm";
import Event from "./Event";
import { Feedback } from "./Feedback";




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






// The "main" component, our actual calendar
const Calendar = ({ month, year, preloadedEvents = [], mydata }: any) => {


  console.log('mydata', mydata)

  // const activities = mydata?.map((item: any) => ({
  // completed: item.completed,
  // in_progress: item.in_progress,
  // next: item.next,
  // due_date_for_next: item.due_date_for_next,
  // next_week_tasks: item.next_week_tasks,
  // issues: item.issues,
  // blockers: item.blockers
  // }));

  const activities = mydata?.map((item: any) => ({
    id: item?.id,
    name: item?.employee_name,
    dateFrom: item?.time_in,
    dateTo: item?.time_in,
    meta: item?.employee_name,
    type: "clock in",
  }));

  console.log('activities', mydata)

  const selectedDate = new Date(year, month - 1);
  const [date, setDate] = useState(selectedDate);
  const [viewingEvent, setViewingEvent] = useState(false);
  const [showingEventForm, setShowingEventForm] = useState({ visible: false });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>();

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
        MONTHS={MONTHS}
      />
      {/* @ts-ignore */}
      <DayLabels />
      <Grid
        date={date}
        events={events}
        setShowingEventForm={setShowingEventForm}
        setViewingEvent={setViewingEvent}
        actualDate={date}
        toStartOfDay={toStartOfDay}
        findEventsForDate={findEventsForDate}
        MiniEvent={MiniEvent}
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
          toStartOfDay={toStartOfDay}
          dateToInputFormat={dateToInputFormat}
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


const preloadedEvents = [

  {
    id: 1,
    name: "Good Friday",
    dateFrom: "2023-04-10",
    dateTo: "2023-04-10",
    meta: "Commemorates the crucifixion of Jesus Christ.",
    type: "Holiday",
  },
  {
    id: 2,
    name: "Easter Monday",
    dateFrom: "2023-04-13",
    dateTo: "2023-04-13",
    meta: "Celebrates the resurrection of Jesus Christ.",
    type: "Holiday",
  },
  {
    id: 3,
    name: "Workers' Day (Labour Day)",
    dateFrom: "2023-05-01",
    dateTo: "2023-05-01",
    meta: "Honors workers and laborers' contributions.",
    type: "Holiday",
  },
  {
    id: 10,
    name: "Democracy Day",
    dateFrom: "2023-06-12",
    dateTo: "2023-06-12",
    meta: "Celebrates Nigeria's return to democratic rule in 1999.",
    type: "Holiday",
  },
  {
    id: 4,
    name: "Eid al-Fitr (End of Ramadan)",
    dateFrom: "2023-05-24",
    dateTo: "2023-05-24",
    meta: "Marks the end of Ramadan, the Islamic holy month of fasting.",
    type: "Holiday",
  },
  {
    id: 5,
    name: "Eid al-Adha (Festival of Sacrifice)",
    dateFrom: "2023-07-31",
    dateTo: "2023-07-31",
    meta: "Commemorates Ibrahim's willingness to sacrifice his son as an act of obedience to God.",
    type: "Holiday",
  },
  {
    id: 6,
    name: "Independence Day",
    dateFrom: "2023-10-01",
    dateTo: "2023-10-01",
    meta: "Marks Nigeria's independence from British colonial rule in 1960.",
    type: "Holiday",
  },
  {
    id: 7,
    name: "Id el Maulud (Birth of the Prophet)",
    dateFrom: "2023-10-29",
    dateTo: "2023-10-29",
    meta: "Celebrates the birth of Prophet Muhammad.",
    type: "Holiday",
  },
  {
    id: 8,
    name: "Christmas Day",
    dateFrom: "2023-12-25",
    dateTo: "2023-12-25",
    meta: "Commemorates the birth of Jesus Christ.",
    type: "Holiday",
  },
  {
    id: 9,
    name: "Boxing Day",
    dateFrom: "2023-12-26",
    dateTo: "2023-12-26",
    meta: "Traditionally observed as a day of giving to the less fortunate.",
    type: "Holiday",
  }
]



export const Calendars = ({ date, setDate, mydata }: any) => (


  <div className="contain-Calendar">
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
      mydata={mydata}
    />

  </div>
);
