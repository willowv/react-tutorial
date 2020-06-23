import * as React from "react";

export interface SquareProps {
    index: number;
    value: string;
    isWinningMove: boolean;
    onClick: () => void;
}

export const Square = (props: SquareProps) => {
    return (
        <button
            data-cy={'square '+props.index}
            className={props.isWinningMove ? "win-square" : "square"}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    )
}