export function getAppointmentsForDay(state, day) {
  console.log("this is the state:", state)
  const filteredAppointments = [];
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.appointments.forEach(appointmentId => {
        filteredAppointments.push(state.appointments[appointmentId]);
      });
    }
  });
  return filteredAppointments;
}

export function getInterview(state, interview) {
  if(!interview) {
    return null;
  } else {
    let interviewer = state.interviewers[interview.interviewer];
    return {...interview, interviewer}
    //{ {student: "Archie Cohen", interviewer: 1}, {id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png"} }
  }
}

export function getInterviewersForDay(state, selectedDay) {
  const filteredAppointments = [];
  state.days.forEach(element => {
    if (element.name === selectedDay) {
      element.interviewers.forEach(id => {
        filteredAppointments.push(state.interviewers[id]);
      });
    }
  });
  return filteredAppointments;
} 