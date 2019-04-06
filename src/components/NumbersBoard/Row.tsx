import * as React from "react";
import _isEqual from "lodash/isEqual";
import { ReactElement } from "react";
import styled from "styled-components";
import {CellProps} from "./CellPropsType";

const BaseRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

class Row extends React.Component<{ children: ReactElement<CellProps>[] }> {

    getOnProp = (c: any) => c.props.on;
    shouldComponentUpdate(nextProps: any) {
        return !_isEqual(
            nextProps.children.map(this.getOnProp),
            this.props.children.map(this.getOnProp)
        );
    }

    render() {
        const { children } = this.props;
        return <BaseRow>{children}</BaseRow>;
    }
}
export default Row;
