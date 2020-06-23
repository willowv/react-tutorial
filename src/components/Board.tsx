import * as React from "react";
import { Winner } from "../calculateWinner";
import { Square } from "./Square"

export interface BoardProps {
    winner: Winner | null;
    squares: string[];
    onClick: (i : number) => void;
}

export class Board extends React.Component<BoardProps, {}> {
    renderSquare(i : number) : JSX.Element {
      const winner = this.props.winner;
      const value = this.props.squares[i];
      let isWinningMove = false;
      if(winner && winner.line){
        for(var j=0; j < winner.line.length; j++) {
          if(winner.line[j] === value)
            isWinningMove = true;
        }
      }

      return (
        <Square
            key={i}
            index={i}
            isWinningMove={isWinningMove}
            value={value}
            onClick={()=>this.props.onClick(i)}
        />
      );
    }
  
    render() {
      const cRows = 3;
      const cCols = 3;
      const rows : JSX.Element[] = Array(cRows);
      for(var i = 0; i < cRows; i++) {
        const cols : JSX.Element[] = Array(cCols);
        for(var j = 0; j < cCols; j++) {
          const square = i * 3 + j;
          cols[j] = this.renderSquare(square);
        }
        rows[i] = <div key={i} className="board-row">{cols}</div>
      }
    return <div>{rows}</div>;
    }
  }