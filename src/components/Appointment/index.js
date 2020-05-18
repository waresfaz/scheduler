import React, { Fragment } from 'react'
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from "./Form"
import Status from "./Status"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(interviewer, name) {
    console.log(name)
    const interview = {
      student: interviewer,
      interviewer: name
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  return (
    <article className="appointment">

      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}

      {mode === CREATE && (
        <Form
          // name={props.interview.student}
          // interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}

    </article>
  )
}; 