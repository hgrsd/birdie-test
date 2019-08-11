import * as React from 'react';
import { CareEvent } from '@App/store/types';

interface EventProp {
    events: CareEvent[];
}

export class MoodView extends React.Component <EventProp> {
    constructor(props: EventProp) {
        super(props);
    }

    render () {
        const moodRows = this.props.events.map(event => (
            <tr key={event.id}>
                <td>
                    {new Date(event.timestamp).toString().split('(')[0].slice(4, 16)}
                </td>
                <td>
                    {new Date(event.timestamp).toString().split('(')[0].slice(16, 21)}
                </td>
                <td>
                    {event.mood ? event.mood : 'No mood recorded'}
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
                        <th>Mood</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {moodRows}
                </tbody>
            </table>
        );
    }
}

export default MoodView;