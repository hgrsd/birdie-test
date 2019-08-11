import * as React from 'react';
import { connect } from 'react-redux';
import { CareEvent } from '@App/store/types';

interface EventProp {
    events: CareEvent[];
    currentType: string;
}

export class EventView extends React.Component <EventProp> {
    constructor(props: EventProp) {
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
                    {event.event_type}
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
                        <th>Type</th>
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

const mapStateToProps = (state) => {
    return {
      currentType: state.eventsState.currentType,
    };
};

export default connect(mapStateToProps)(EventView);