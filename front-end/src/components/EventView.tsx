import * as React from 'react';
import { Event } from '@App/store/types';

interface EventProp {
    data: Event;
}

export class EventView extends React.Component <EventProp> {
    constructor(props: EventProp) {
        super(props);
    }
    public render () {
        const elements = Object.keys(this.props.data).map(
            key => <li key={key}>{key}: {this.props.data[key]}</li>
        );
        return (
            <div><ul>{elements}</ul></div>
        );
    }
}
