import React, { Component } from 'react';

interface ComponentProps {
    prop1: string,
    prop2: boolean,
    props3: 'one' | 'two' | 'three'
}

interface ComponentState {
    state1: string,
    state2: boolean
}

//
// 'type up' component props and state
//
class ReactComponent extends Component<ComponentProps, ComponentState> {
    state = {
        state1: 'foo',
        state2: false
    }

    // componentDidMount() {
        // this.setState({
        //
        // })
    // }

    render() {
        const { prop1 } = this.props

        return (
            <section>
                <h1>headding</h1>
                <p>
                    paragraph
                </p>
            </section>
        )
    }
}

/*
<ReactComponent />
*/

/*
export interface Props {
    name: string;
}

//
// component with defaultProps
//
export class Greet extends React.Component<Props> {
    render() {
        const { name } = this.props;
        return <div>Hello ${name.toUpperCase()}!</div>;
    }
    static defaultProps = { name: "world"};
}

// Type-checks! No type assertions needed!
let el = <Greet  />
*/
