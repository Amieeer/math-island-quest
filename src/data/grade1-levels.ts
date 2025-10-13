export interface Problem {
  id: string;
  question: string;
  type: "multiple_choice" | "input" | "true_false";
  options?: string[];
  answer: string;
  visual?: string;
}

export interface Level {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  title: string;
  objective: string;
  problems: Problem[];
}

export const grade1Levels: Level[] = [
  {
    id: "grade1-easy",
    difficulty: "easy",
    title: "Counting Shells",
    objective: "Basic addition within 10 with strong visual aids",
    problems: [
      {
        id: "1",
        question: "2 + 3 = ?",
        type: "multiple_choice",
        options: ["3", "5", "6", "4"],
        answer: "5",
        visual: "shells"
      },
      {
        id: "2",
        question: "4 + 1 = ?",
        type: "multiple_choice",
        options: ["4", "5", "6", "3"],
        answer: "5",
        visual: "shells"
      },
      {
        id: "3",
        question: "5 + 5 = ?",
        type: "multiple_choice",
        options: ["9", "10", "11", "8"],
        answer: "10",
        visual: "ten-frame"
      },
      {
        id: "4",
        question: "3 + 2 = ?",
        type: "multiple_choice",
        options: ["4", "5", "6", "7"],
        answer: "5",
        visual: "shells"
      },
      {
        id: "5",
        question: "1 + 6 = ?",
        type: "multiple_choice",
        options: ["5", "6", "7", "8"],
        answer: "7",
        visual: "shells"
      },
      {
        id: "6",
        question: "4 + 4 = ?",
        type: "multiple_choice",
        options: ["6", "7", "8", "9"],
        answer: "8",
        visual: "shells"
      },
      {
        id: "7",
        question: "2 + 5 = ?",
        type: "multiple_choice",
        options: ["6", "7", "8", "9"],
        answer: "7",
        visual: "shells"
      },
      {
        id: "8",
        question: "3 + 3 = ?",
        type: "multiple_choice",
        options: ["5", "6", "7", "8"],
        answer: "6",
        visual: "shells"
      },
      {
        id: "9",
        question: "1 + 8 = ?",
        type: "multiple_choice",
        options: ["7", "8", "9", "10"],
        answer: "9",
        visual: "shells"
      },
      {
        id: "10",
        question: "6 + 3 = ?",
        type: "multiple_choice",
        options: ["8", "9", "10", "11"],
        answer: "9",
        visual: "shells"
      }
    ]
  },
  {
    id: "grade1-medium",
    difficulty: "medium",
    title: "Coconut Math",
    objective: "Addition and subtraction word problems within 20",
    problems: [
      {
        id: "1",
        question: "There are 8 coconuts on a tree. 5 more fall down. How many coconuts are there now?",
        type: "multiple_choice",
        options: ["11", "12", "13", "14"],
        answer: "13"
      },
      {
        id: "2",
        question: "You have 12 bananas. You eat 4. How many are left?",
        type: "multiple_choice",
        options: ["6", "7", "8", "9"],
        answer: "8"
      },
      {
        id: "3",
        question: "Find the missing number: 9 + ? = 15",
        type: "multiple_choice",
        options: ["4", "5", "6", "7"],
        answer: "6"
      },
      {
        id: "4",
        question: "There are 7 birds on a branch. 6 more join them. How many birds are there now?",
        type: "multiple_choice",
        options: ["11", "12", "13", "14"],
        answer: "13"
      },
      {
        id: "5",
        question: "You find 14 shells. You give away 8. How many do you have left?",
        type: "multiple_choice",
        options: ["4", "5", "6", "7"],
        answer: "6"
      },
      {
        id: "6",
        question: "Find the missing number: 11 - ? = 5",
        type: "multiple_choice",
        options: ["4", "5", "6", "7"],
        answer: "6"
      },
      {
        id: "7",
        question: "There are 9 fish in a pond. 8 more swim in. How many fish are there now?",
        type: "multiple_choice",
        options: ["15", "16", "17", "18"],
        answer: "17"
      },
      {
        id: "8",
        question: "You have 16 apples. You eat 7. How many are left?",
        type: "multiple_choice",
        options: ["7", "8", "9", "10"],
        answer: "9"
      },
      {
        id: "9",
        question: "Find the missing number: 8 + ? = 14",
        type: "multiple_choice",
        options: ["4", "5", "6", "7"],
        answer: "6"
      },
      {
        id: "10",
        question: "There are 13 flowers. You pick 9. How many are left?",
        type: "multiple_choice",
        options: ["2", "3", "4", "5"],
        answer: "4"
      }
    ]
  },
  {
    id: "grade1-hard",
    difficulty: "hard",
    title: "Jungle Equations",
    objective: "Three-number addition and finding equality within 20",
    problems: [
      {
        id: "1",
        question: "6 + 4 + 7 = ?",
        type: "multiple_choice",
        options: ["15", "16", "17", "18"],
        answer: "17"
      },
      {
        id: "2",
        question: "Is 5 + 6 the same as 7 + 4?",
        type: "true_false",
        options: ["True", "False"],
        answer: "True"
      },
      {
        id: "3",
        question: "Solve: 18 - 9 = 5 + ?",
        type: "multiple_choice",
        options: ["2", "3", "4", "5"],
        answer: "4"
      },
      {
        id: "4",
        question: "3 + 5 + 8 = ?",
        type: "multiple_choice",
        options: ["14", "15", "16", "17"],
        answer: "16"
      },
      {
        id: "5",
        question: "Is 9 + 3 the same as 8 + 5?",
        type: "true_false",
        options: ["True", "False"],
        answer: "False"
      },
      {
        id: "6",
        question: "Solve: 15 - 7 = 4 + ?",
        type: "multiple_choice",
        options: ["2", "3", "4", "5"],
        answer: "4"
      },
      {
        id: "7",
        question: "2 + 7 + 6 = ?",
        type: "multiple_choice",
        options: ["13", "14", "15", "16"],
        answer: "15"
      },
      {
        id: "8",
        question: "Is 6 + 7 the same as 5 + 8?",
        type: "true_false",
        options: ["True", "False"],
        answer: "True"
      },
      {
        id: "9",
        question: "Solve: 20 - 12 = 3 + ?",
        type: "multiple_choice",
        options: ["3", "4", "5", "6"],
        answer: "5"
      },
      {
        id: "10",
        question: "4 + 6 + 5 = ?",
        type: "multiple_choice",
        options: ["13", "14", "15", "16"],
        answer: "15"
      }
    ]
  }
];
