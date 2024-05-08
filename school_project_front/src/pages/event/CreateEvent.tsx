import React from "react";
import CreateEventForm from "../../components/forms/event/CreateEventForm.tsx";

const CreateEvent: React.FC = () => {
    return (
        <div>
            <h1>Create Event</h1>
            <CreateEventForm />
        </div>
    );
}

export default CreateEvent;