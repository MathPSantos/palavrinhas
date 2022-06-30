import { WORD_LENGTH } from "../constants";

interface LineProps {
  line: string;
  isFinal?: boolean;
  solution: string;
}

export function Line({ line, isFinal = false, solution }: LineProps) {
  const tile = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = line[i] ?? "";
    let className = "";

    if(isFinal) {
      console.log(letter, solution[i])
      if (letter === solution[i]) {
        className = "bg-green-500 text-white";
      } else if (solution.includes(letter)) {
        console.log('Aqui');
        className = "bg-yellow-500 text-white";
      } else {
        className="bg-gray-200";
      }
    }

    tile.push(<div key={i} className={`flex items-center justify-center text-xl font-bold uppercase w-10 h-10 border border-gray-300 ${className}`}>{letter}</div>);
  }
  
  return(
    <div className="flex items-center gap-1">
      {tile}
    </div>
  )
}