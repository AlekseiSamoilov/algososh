import { render } from "@testing-library/react";
import { Circle } from "./circle"
import { ElementStates } from "../../../types/element-states";


describe('Circle component', () => {
    test('renders correctly without letter', () => {
        const { asFragment } = render(<Circle />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders correctly with letter', () => {
        const { asFragment } = render(<Circle letter={"A"} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders correctly with head', () => {
        const { asFragment } = render(<Circle head={'A'} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders correctly with react-element in head', () => {
        const reactElement = <div>Element</div>
        const { asFragment } = render(<Circle head={reactElement} />);
        expect(asFragment()).toMatchSnapshot();
    });
    
    test('renders correctly with tail', () => {
        const { asFragment } = render(<Circle tail={'A'} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders correctly with react-element in tail', () => {
        const reactElement = <div>Element</div>
        const { asFragment } = render(<Circle tail={reactElement} />);
        expect(asFragment()).toMatchSnapshot();
    });
    
    test('renders correctly with index', () => {
        const { asFragment } = render(<Circle index={4} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders correctly with isSmall prop', () => {
        const { asFragment } = render(<Circle isSmall={true} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders correctly whith Default state', () => {
        const { asFragment } = render(<Circle state={ElementStates.Default} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders correctly whith Changing state', () => {
        const { asFragment } = render(<Circle state={ElementStates.Changing} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders correctly whith Modified state', () => {
        const { asFragment } = render(<Circle state={ElementStates.Modified} />);
        expect(asFragment()).toMatchSnapshot();
    });
})