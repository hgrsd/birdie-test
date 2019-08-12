import * as React from 'react';

import { CareEvent } from '@App/store/types';
import { extractTime, extractDate } from '@App/utils';

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
                    {extractDate(event.timestamp)}
                </td>
                <td>
                    {extractTime(event.timestamp)}
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