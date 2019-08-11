import * as React from 'react';
import { CareEvent } from '@App/store/types';

interface EventProps {
    events: CareEvent[];
}

export class TaskView extends React.Component <EventProps> {
    constructor(props: EventProps) {
        super(props);
    }

    prettify(input: string) {
        let words = input.split('_');
        return words.map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
    }

    render () {
        const eventRows = this.props.events.map(event => (
            <tr key={event.id}>
                <td>
                    {new Date(event.timestamp).toString().split('(')[0].slice(4, 16)}
                </td>
                <td>
                    {new Date(event.timestamp).toString().split('(')[0].slice(16, 21)}
                </td>
                <td>
                    {event.task_definition_description}
                </td>
                <td>
                    {event.task_schedule_note ? event.task_schedule_note : 'No notes available'}
                </td>
                <td>
                    {event.note ? event.note : 'No notes available'}
                </td>
            </tr>
        )
        );
        return (
            <table className="u-full-width">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Task</th>
                        <th>Task Notes</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {eventRows}
                </tbody>
            </table>
        );
    }
}

export default TaskView;