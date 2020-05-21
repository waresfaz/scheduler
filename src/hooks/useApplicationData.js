import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {

  function bookInterview(id, interview) {
    console.log(interview)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview}).then(() =>
      setState({
        ...state,
        appointments
      })
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
      // console.log(response.data)
      // setDays(response.data)
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