import React from "react";
import CreateEventForm from "../../components/forms/event/CreateEventForm.tsx";
import '../css/createEvent.css';

const CreateEvent: React.FC = () => {
    return (
        <div className={"form-container-create"}>
            <h1 className={"neuly"}>Create Event</h1>
            <CreateEventForm />
        </div>
    );
}

export default CreateEvent;