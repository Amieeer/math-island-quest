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

export const grade6Levels: Level[] = [
  {
    id: "grade6-easy",
    title: "Visual Ratios",
    difficulty: "easy",
    objective: "Identify and write ratios from visual information",
    problems: createProblems([
      { question: "A screen shows 5 blue stars and 3 red moons. What is the ratio of stars to moons?", options: ["5:3", "3:5", "5:8", "8:5"], answer: "5:3" },
      { question: "Simplify the ratio 6:9", options: ["2:3", "3:2", "1:3", "6:9"], answer: "2:3" },
      { question: "Are the ratios 2:3 and 4:6 equivalent?", options: ["Yes", "No"], answer: "Yes" },
      { question: "There are 8 circles and 12 squares. What is the ratio of circles to total shapes in simplest form?", options: ["2:5", "8:12", "4:10", "8:20"], answer: "2:5" },
      { question: "Simplify the ratio 15:25", options: ["3:5", "5:3", "15:25", "1:5"], answer: "3:5" },
      { question: "In a group of 10 robots, 4 are green and 6 are silver. What is the ratio of green to silver robots?", options: ["2:3", "4:6", "3:2", "4:10"], answer: "2:3" },
      { question: "Are the ratios 3:4 and 9:12 equivalent?", options: ["Yes", "No"], answer: "Yes" },
      { question: "Simplify the ratio 18:24", options: ["3:4", "9:12", "6:8", "18:24"], answer: "3:4" },
      { question: "A box contains 7 red crystals and 14 blue crystals. What is the ratio of red to blue in simplest form?", options: ["1:2", "7:14", "2:1", "7:21"], answer: "1:2" },
      { question: "Are the ratios 5:8 and 10:16 equivalent?", options: ["Yes", "No"], answer: "Yes" },
    ]),
  },
  {
    id: "grade6-medium",
    title: "Unit Rate Calculations",
    difficulty: "medium",
    objective: "Solve unit rate problems",
    problems: createProblems([
      { question: "A spaceship travels 3,000 kilometers in 5 hours. What is its speed in kilometers per hour?", options: ["600", "500", "700", "550"], answer: "600" },
      { question: "If 4 energy crystals cost $20, what is the cost per crystal?", options: ["$5", "$4", "$6", "$8"], answer: "$5" },
      { question: "A robot can assemble 144 parts in 6 hours. How many parts per hour?", options: ["24", "20", "28", "30"], answer: "24" },
      { question: "You buy 8 kilograms of space food for $64. What is the price per kilogram?", options: ["$8", "$7", "$9", "$10"], answer: "$8" },
      { question: "A printer prints 450 pages in 9 minutes. How many pages per minute?", options: ["50", "45", "55", "60"], answer: "50" },
      { question: "A car travels 336 miles on 12 gallons of fuel. How many miles per gallon?", options: ["28", "26", "30", "32"], answer: "28" },
      { question: "If 7 identical items cost $91, what is the cost of one item?", options: ["$13", "$12", "$14", "$15"], answer: "$13" },
      { question: "A machine produces 540 widgets in 9 hours. How many widgets per hour?", options: ["60", "55", "65", "70"], answer: "60" },
      { question: "You pay $96 for 8 movie tickets. What is the price per ticket?", options: ["$12", "$11", "$13", "$10"], answer: "$12" },
      { question: "A runner completes 400 meters in 80 seconds. What is the speed in meters per second?", options: ["5", "4", "6", "8"], answer: "5" },
    ]),
  },
  {
    id: "grade6-hard",
    title: "Proportion & Percentage Puzzles",
    difficulty: "hard",
    objective: "Solve multi-step ratio and percentage problems",
    
    problems: createProblems([
      { question: "A fuel mixture needs 3 parts liquid oxygen for every 5 parts rocket fuel. If you have 45 liters of rocket fuel, how much liquid oxygen do you need?", options: ["27", "25", "30", "35"], answer: "27" },
      { question: "A spacesuit is on sale for 20% off its original price of $500. What is the sale price?", options: ["$400", "$450", "$380", "$420"], answer: "$400" },
      { question: "A recipe uses butter and flour in a ratio of 2:7. If you use 14 cups of flour, how many cups of butter do you need?", options: ["4", "3", "5", "6"], answer: "4" },
      { question: "A store marks up products by 25%. If an item costs the store $80, what is the selling price?", options: ["$100", "$95", "$105", "$110"], answer: "$100" },
      { question: "Paint mixing requires red and blue in a 4:9 ratio. If you use 36 ounces of blue, how much red do you need?", options: ["16", "14", "18", "20"], answer: "16" },
      { question: "A population of 600 bacteria increases by 15%. What is the new population?", options: ["690", "700", "680", "710"], answer: "690" },
      { question: "A garden has roses and tulips in a 5:8 ratio. If there are 40 tulips, how many roses are there?", options: ["25", "20", "30", "35"], answer: "25" },
      { question: "A jacket originally costs $120. It goes on sale for 30% off. What is the sale price?", options: ["$84", "$80", "$90", "$88"], answer: "$84" },
      { question: "Concrete mix uses cement and sand in a 1:3 ratio. If you have 27 kilograms of sand, how much cement do you need?", options: ["9", "8", "10", "12"], answer: "9" },
      { question: "A shirt is marked up 40% from its cost of $25. What is the selling price?", options: ["$35", "$30", "$40", "$33"], answer: "$35" },
    ]),
  },
];
