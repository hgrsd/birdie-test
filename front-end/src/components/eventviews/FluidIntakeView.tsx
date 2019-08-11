import * as React from 'react';
import { CareEvent } from '@App/store/types';

interface EventProps {
    events: CareEvent[];
}

export class FluidIntakeView extends React.Component <EventProps> {
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