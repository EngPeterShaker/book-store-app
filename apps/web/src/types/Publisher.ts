export interface Publisher {
  name: string;
  description: string;
  founded?: string;
  website?: string;
  location?: string;
}

// Mock publisher data
export const PUBLISHERS: Record<string, Publisher> = {
  "Charles Scribner's Sons": {
    name: "Charles Scribner's Sons",
    description: "Charles Scribner's Sons was a New York publishing house that published a broad range of titles, including works by Ernest Hemingway, F. Scott Fitzgerald, and Thomas Wolfe.",
    founded: "1846",
    location: "New York, USA",
  },
  "J.B. Lippincott & Co.": {
    name: "J.B. Lippincott & Co.",
    description: "J.B. Lippincott & Co. was an American publishing house founded in Philadelphia in 1836. Known for publishing medical and literary works.",
    founded: "1836",
    location: "Philadelphia, USA",
  },
  "Secker & Warburg": {
    name: "Secker & Warburg",
    description: "Secker & Warburg is a British publishing house known for publishing George Orwell's works, including Animal Farm and Nineteen Eighty-Four.",
    founded: "1936",
    location: "London, UK",
  },
  "Penguin Books": {
    name: "Penguin Books",
    description: "Penguin Books is a British publishing house founded in 1935. It was co-founded by Sir Allen Lane as a line of the publishers The Bodley Head.",
    founded: "1935",
    location: "London, UK",
  },
  "HarperCollins": {
    name: "HarperCollins",
    description: "HarperCollins Publishers LLC is one of the Big Five English-language publishing companies, headquartered in New York City.",
    founded: "1989",
    location: "New York, USA",
  },
};
