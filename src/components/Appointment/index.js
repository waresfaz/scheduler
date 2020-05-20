import React from 'react'
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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

  function deleteInterview(interviewer, name) {
    const interview ={
      student: name,
      interviewer
    };
    transition(DELETING)
    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">

      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={ () => transition(CONFIRM) }
          onEdit={ () => transition(EDIT) }
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

      {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
        />
      )}

      {mode === CONFIRM && ( <Confirm message="Are you sure you would like to delete?" onConfirm={deleteInterview} onCancel={() => back()} /> )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}

    </article>
  )
}; 