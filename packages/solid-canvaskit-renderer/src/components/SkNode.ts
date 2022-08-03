export interface SkBase {
    initialize: () => void;
    render: () => void;

    props: Map<string, any>;
    setProp: (name: string, value: any) => void;
    getProp: (name: string) => void;
}

export class SkNode implements SkBase {
    initialize() {};
    render() {};

    // Component props (aka React/Solid props)
    props: Map<string, any> = new Map();
    setProp(name: string, value: any) {
        this.props.set(name, value);
    };
    getProp(name: string) {
        this.props.get(name);
    };
}