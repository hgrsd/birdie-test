import * as React from 'react';

import { CareEvent } from '@App/store/types';
import { extractTime, extractDate } from '@App/utils';

interface EventProps {
    events: CareEvent[];
}

export class FluidIntakeView extends React.Component <EventProps> {
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
                    {event.fluid}
                </td>
                <td>
                    {event.observed ? 'Yes' : 'No'}
                </td>
                <td>
                    {event.consumed_volume_ml ? event.consumed_volume_ml.toString() : 'Unknown'}
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
                        <th>Fluid Type</th>
                        <th>First-hand Observation</th>
                        <th>Volume (ml)</th>
                    </tr>
                </thead>
                <tbody>
                    {eventRows}
                </tbody>
            </table>
        );
    }
}

export default FluidIntakeView;