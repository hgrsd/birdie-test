import * as React from 'react';

import { CareEvent } from '@App/store/types';
import { extractTime, extractDate } from '@App/utils';

interface EventProps {
    events: CareEvent[];
}

export class NoMedsObservationReceivedView extends React.Component <EventProps> {
    constructor(props: EventProps) {
        super(props);
    }

    render () {
        const eventRows = this.props.events.map(event => (
            <tr key={event.id}>
                <td>
                    {extractDate(event.timestamp)}
                </td>
                <td>
                    {extractTime(event.timestamp)}
                </td>
                <td>
                    {event.medication_type ? event.medication_type : 'No context specified'}
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
                        <th>Context</th>
                    </tr>
                </thead>
                <tbody>
                    {eventRows}
                </tbody>
            </table>
        );
    }
}

export default NoMedsObservationReceivedView;