import { Level, Problem } from "./grade1-levels";

const createProblems = (questions: Array<{ question: string; options: string[]; answer: string }>): Problem[] => {
  return questions.map((q, index) => ({
    id: (index + 1).toString(),
    question: q.question,
    type: "multiple_choice" as const,
    options: q.options,
    answer: q.answer,
  }));
};

export const grade5Levels: Level[] = [
  {
    id: "grade5-easy",
    title: "Common Denominator Crash Course",
    difficulty: "easy",
    objective: "Add and subtract fractions where one denominator is a multiple of the other",
    problems: createProblems([
      { question: "1/3 + 1/6 = ?", options: ["1/2", "2/9", "1/3", "2/6"], answer: "1/2" },
      { question: "3/4 - 1/8 = ?", options: ["5/8", "2/4", "4/8", "6/8"], answer: "5/8" },
      { question: "2/5 + 3/10 = ?", options: ["7/10", "5/15", "1/2", "5/10"], answer: "7/10" },
      { question: "5/6 - 1/3 = ?", options: ["1/2", "4/9", "2/3", "4/6"], answer: "1/2" },
      { question: "1/4 + 3/8 = ?", options: ["5/8", "4/12", "1/2", "4/8"], answer: "5/8" },
      { question: "7/10 - 1/5 = ?", options: ["1/2", "6/15", "3/5", "5/10"], answer: "1/2" },
      { question: "1/2 + 1/4 = ?", options: ["3/4", "2/6", "1/3", "2/4"], answer: "3/4" },
      { question: "5/8 - 1/4 = ?", options: ["3/8", "4/12", "1/4", "2/8"], answer: "3/8" },
      { question: "2/3 + 1/6 = ?", options: ["5/6", "3/9", "1/2", "4/6"], answer: "5/6" },
      { question: "9/10 - 2/5 = ?", options: ["1/2", "7/15", "3/5", "5/10"], answer: "1/2" },
    ]),
  },
  {
    id: "grade5-medium",
    title: "Unlike Denominator Dash",
    difficulty: "medium",
    objective: "Add and subtract fractions with any unlike denominators",
    problems: createProblems([
      { question: "2/3 + 3/5 = ?", options: ["19/15", "5/8", "1", "17/15"], answer: "19/15" },
      { question: "1/2 - 1/7 = ?", options: ["5/14", "6/14", "0/5", "3/9"], answer: "5/14" },
      { question: "4/5 - 1/3 = ?", options: ["7/15", "3/8", "3/2", "11/15"], answer: "7/15" },
      { question: "3/4 + 2/5 = ?", options: ["23/20", "5/9", "1", "21/20"], answer: "23/20" },
      { question: "5/6 - 2/9 = ?", options: ["11/18", "3/15", "7/15", "13/18"], answer: "11/18" },
      { question: "1/3 + 3/7 = ?", options: ["16/21", "4/10", "13/21", "10/21"], answer: "16/21" },
      { question: "7/8 - 1/6 = ?", options: ["17/24", "6/14", "19/24", "13/24"], answer: "17/24" },
      { question: "2/5 + 4/9 = ?", options: ["38/45", "6/14", "32/45", "40/45"], answer: "38/45" },
      { question: "5/7 - 1/4 = ?", options: ["13/28", "4/11", "17/28", "15/28"], answer: "13/28" },
      { question: "3/8 + 5/12 = ?", options: ["19/24", "8/20", "17/24", "21/24"], answer: "19/24" },
    ]),
  },
  {
    id: "grade5-hard",
    title: "Mixed Number Meteors",
    difficulty: "hard",
    objective: "Word problems involving adding and subtracting mixed numbers with unlike denominators",
    
    problems: createProblems([
      { question: "A recipe needs 2 1/2 cups of flour. You only have 1 1/3 cups. How much more flour do you need?", options: ["1 1/6", "1 1/5", "1 2/5", "1 1/4"], answer: "1 1/6" },
      { question: "An asteroid travels 5 1/4 miles in one minute and 3 1/2 miles the next. How far did it travel in total?", options: ["8 3/4", "8 1/2", "8 2/3", "9"], answer: "8 3/4" },
      { question: "A rope is 7 2/3 feet long. You cut off 2 1/4 feet. How much rope is left?", options: ["5 5/12", "5 1/3", "5 7/12", "5 1/4"], answer: "5 5/12" },
      { question: "You walk 3 3/5 miles in the morning and 2 1/3 miles in the afternoon. How many miles did you walk total?", options: ["5 14/15", "6", "5 4/8", "5 13/15"], answer: "5 14/15" },
      { question: "A container holds 6 1/2 liters of water. You pour out 1 3/4 liters. How much water remains?", options: ["4 3/4", "4 1/2", "5", "4 2/3"], answer: "4 3/4" },
      { question: "A board is 9 5/8 inches long. You need to cut it to 5 1/3 inches. How much will you cut off?", options: ["4 7/24", "4 1/4", "4 5/24", "4 1/2"], answer: "4 7/24" },
      { question: "You run 4 2/5 kilometers and then 3 3/10 kilometers. What is your total distance?", options: ["7 7/10", "7 1/2", "7 5/10", "8"], answer: "7 7/10" },
      { question: "A tank contains 8 5/6 gallons of fuel. You use 3 2/9 gallons. How much fuel is left?", options: ["5 11/18", "5 3/5", "5 13/18", "6"], answer: "5 11/18" },
      { question: "You have 10 3/4 pounds of apples. You give away 4 1/6 pounds. How many pounds do you have left?", options: ["6 7/12", "6 1/2", "6 5/12", "7"], answer: "6 7/12" },
      { question: "A journey takes 5 2/3 hours by car and then 2 3/8 hours by train. What is the total travel time?", options: ["8 1/24", "8", "7 23/24", "8 5/24"], answer: "8 1/24" },
    ]),
  },
];
