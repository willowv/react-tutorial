
export interface Winner {
    player: string;
    line: string[] | null;
}

export function calculateWinner(squares : string[]) : Winner | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // What defines a draw? When every possible line has both players represented in it
    // We are in draw unless there is a line that still only has one player in it
    let draw = true;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].map((square) => squares[square]);
      const [a, b, c] = line;
      if (a && a === b && a === c) {
        return {
          player: a,
          line: line
        }
      }
      // we know it's not a win, is it still valid? if so, set draw to false
      let lineValid = true;
      let player = null;
      for(let j = 0; j < line.length; j++) {
        // if this square is non-null, is there already a different player?
        const square = line[j];
        if(square) {
          if(!player)
            player = square
          else if(square !== player)
            lineValid = false;
        }
      }
      if(lineValid)
        draw = false;
    }
    if(draw) {
      return {
        player: 'draw',
        line: null
      }
    }
    return null;
  }