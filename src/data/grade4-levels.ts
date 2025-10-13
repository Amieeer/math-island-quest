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

export const grade4Levels: Level[] = [
  {
    id: "grade4-easy",
    title: "Gem Multiplication",
    difficulty: "easy",
    objective: "Basic two-digit by two-digit multiplication",
    problems: createProblems([
      { question: "45 × 23 = ?", options: ["1,035", "1,025", "1,135", "1,045"], answer: "1,035" },
      { question: "76 × 14 = ?", options: ["1,064", "1,074", "1,084", "1,094"], answer: "1,064" },
      { question: "38 × 50 = ?", options: ["1,800", "1,850", "1,900", "1,950"], answer: "1,900" },
      { question: "62 × 31 = ?", options: ["1,922", "1,832", "1,942", "1,862"], answer: "1,922" },
      { question: "54 × 22 = ?", options: ["1,188", "1,178", "1,198", "1,168"], answer: "1,188" },
      { question: "89 × 12 = ?", options: ["1,068", "1,078", "1,088", "1,098"], answer: "1,068" },
      { question: "43 × 25 = ?", options: ["1,075", "1,065", "1,085", "1,095"], answer: "1,075" },
      { question: "67 × 18 = ?", options: ["1,206", "1,196", "1,216", "1,186"], answer: "1,206" },
      { question: "55 × 34 = ?", options: ["1,870", "1,860", "1,880", "1,850"], answer: "1,870" },
      { question: "72 × 26 = ?", options: ["1,872", "1,862", "1,882", "1,852"], answer: "1,872" },
    ]),
  },
  {
    id: "grade4-medium",
    title: "Minecart Word Problems",
    difficulty: "medium",
    objective: "Word problems involving multiplication and division",
    problems: createProblems([
      { question: "Each minecart can hold 35 gems. If there are 15 minecarts, how many gems are there in total?", options: ["525", "515", "535", "505"], answer: "525" },
      { question: "A tunnel is 4,200 meters long. If a drill moves 100 meters a day, how many days will it take to finish?", options: ["42", "40", "44", "38"], answer: "42" },
      { question: "There are 18 crates with 24 crystals in each crate. How many crystals are there in total?", options: ["432", "422", "442", "412"], answer: "432" },
      { question: "A team collects 2,400 gold nuggets and needs to divide them equally among 8 miners. How many nuggets does each miner get?", options: ["300", "290", "310", "280"], answer: "300" },
      { question: "Each gem bag weighs 45 pounds. If you have 16 bags, what is the total weight?", options: ["720", "710", "730", "700"], answer: "720" },
      { question: "A conveyor belt can move 3,600 rocks in 12 hours. How many rocks does it move per hour?", options: ["300", "290", "310", "280"], answer: "300" },
      { question: "There are 27 mine shafts with 35 support beams each. How many support beams in total?", options: ["945", "935", "955", "925"], answer: "945" },
      { question: "A mine produces 5,400 gems in 9 days. How many gems are produced per day?", options: ["600", "590", "610", "580"], answer: "600" },
      { question: "Each storage chest holds 52 diamonds. If there are 19 chests, how many diamonds total?", options: ["988", "978", "998", "968"], answer: "988" },
      { question: "A 7,200-meter cave system is divided into 16 equal sections. How long is each section?", options: ["450", "440", "460", "430"], answer: "450" },
    ]),
  },
  {
    id: "grade4-hard",
    title: "The Four Operations Treasure",
    difficulty: "hard",
    objective: "Multi-step word problems involving all four operations",
    problems: createProblems([
      { question: "A team of 4 miners each finds 125 gold nuggets. They have to give 50 nuggets to the expedition leader. How many nuggets do they have left to share among themselves?", options: ["450", "460", "440", "470"], answer: "450" },
      { question: "You find 3 chests with 250 coins each. You spend 115 coins on supplies and then find another 45 coins. How many coins do you have now?", options: ["680", "690", "670", "700"], answer: "680" },
      { question: "A mine has 8 tunnels with 35 gems in each. After collecting all gems, the team loses 24 gems in a cave-in. How many gems remain?", options: ["256", "266", "246", "276"], answer: "256" },
      { question: "You have 5 bags with 48 crystals each. You give away 2 bags and then find 37 more crystals. How many crystals do you have?", options: ["181", "191", "171", "201"], answer: "181" },
      { question: "A treasure chest contains 12 rows of 45 gold pieces. You take half of them and then find 78 more. How many gold pieces do you have?", options: ["348", "358", "338", "368"], answer: "348" },
      { question: "There are 6 miners who each collect 74 gems. They combine them and then divide equally among 8 people. How many gems does each person get? (Round down)", options: ["55", "56", "54", "57"], answer: "55" },
      { question: "A cave system has 9 sections with 63 diamonds each. You extract all diamonds, give away 150, and then find 89 more. How many diamonds do you have?", options: ["506", "516", "496", "526"], answer: "506" },
      { question: "You start with 7 crates of 82 emeralds each. You sell 3 crates and then receive 2 more crates of 82 emeralds. How many emeralds do you have?", options: ["492", "502", "482", "512"], answer: "492" },
      { question: "A team finds 15 treasure boxes with 36 rubies each. They give 1/3 of the rubies to the museum. How many rubies do they keep?", options: ["360", "350", "370", "340"], answer: "360" },
      { question: "You have 8 bags with 95 sapphires each. You lose 2 bags in a storm and then find a chest with 125 sapphires. How many sapphires do you have?", options: ["695", "705", "685", "715"], answer: "695" },
    ]),
  },
];
