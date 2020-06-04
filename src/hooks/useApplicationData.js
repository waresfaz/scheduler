import { useState, useEffect } from "react";
import axios from "axios";

import { getAppointmentsForDay } from "helpers/selectors";
import Appointment from "components/Appointment";

export default function useApplicationData(props) {

  function bookInterview(id, interview) {

     // force rejects promise if validation is not met (either value is left empty)
     if (!interview.student || !interview.interviewer) {
      return Promise.reject()
    }
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const newState = {
      ...state,
      appointments
    }
    // this updates the spots count
    const appointmentsForDay = getAppointmentsForDay(newState, newState.day);

    const count = appointmentsForDay.filter(appointment => {
      return appointment.interview
    }).length
    console.log(count)

    newState.days = state.days.map(day => {
      if (day.name === state.day) {
      day.spots = appointmentsForDay.length - count;
      }
      return day
    });

    return axios.put(`/api/appointments/${id}`, {interview}).then(() =>
      setState(newState)
    );
  } 

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const updateSpots = state.days.forEach(day => {
      if (day.name === state.day) {
      day.spots++;
    }
    return day;
  });
    return axios.delete(`/api/appointments/${id}`, {appointment}).then(() =>
      setState({
        ...state,
        appointments
      })
    );
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  
  
  useEffect(() => {
    axios.get(`/api/days`).then(response => {
      Promise.all([
        Promise.resolve(axios.get(`/api/days`)),
        Promise.resolve(axios.get(`/api/appointments`)),
        Promise.resolve(axios.get(`/api/interviewers`))
      ]).then(all => {
        console.log(all[0]); // first
        console.log(all[1]); // second
        const [first, second, third] = all;
        console.log(first.data, second.data, third.data);

        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      });
    })
  }, [])

  console.log(state.interviewers);
  return { cancelInterview, bookInterview, state, setDay };
}