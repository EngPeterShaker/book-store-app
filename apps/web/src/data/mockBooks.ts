import { Book } from '../types/Book';

// Mock books data for demonstration
export const MOCK_BOOKS: Book[] = [
  // Hachette Book Group Books
  {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    publisher: 'Hachette Book Group',
    description: 'A novel about life choices and alternate realities.',
    isbn: '978-0525559474',
    price: 26.00,
    stock: 15,
    genre: 'Fiction',
    publishedDate: '2020-08-13',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    publisher: 'Hachette Book Group',
    description: 'An easy & proven way to build good habits & break bad ones.',
    isbn: '978-0735211292',
    price: 27.00,
    stock: 22,
    genre: 'Self-Help',
    publishedDate: '2018-10-16',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },

  // HarperCollins Publishers Books
  {
    id: 3,
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    publisher: 'HarperCollins Publishers',
    description: 'A mystery about a young woman who raised herself in the marshes.',
    isbn: '978-0735219090',
    price: 18.00,
    stock: 8,
    genre: 'Fiction',
    publishedDate: '2018-08-14',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    title: 'Educated',
    author: 'Tara Westover',
    publisher: 'HarperCollins Publishers',
    description: 'A memoir about a woman who grows up in a survivalist family.',
    isbn: '978-0399590504',
    price: 19.99,
    stock: 12,
    genre: 'Memoir',
    publishedDate: '2018-02-20',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },

  // Macmillan Publishers Books
  {
    id: 5,
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    publisher: 'Macmillan Publishers',
    description: 'A reclusive Hollywood icon finally tells her story.',
    isbn: '978-1250093452',
    price: 17.00,
    stock: 18,
    genre: 'Fiction',
    publishedDate: '2017-06-13',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },

  // Penguin Random House Books
  {
    id: 6,
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    publisher: 'Penguin Random House',
    description: 'A counterintuitive approach to living a good life.',
    isbn: '978-0062457714',
    price: 24.99,
    stock: 20,
    genre: 'Self-Help',
    publishedDate: '2016-09-13',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 7,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    publisher: 'Penguin Random House',
    description: 'The groundbreaking international bestseller.',
    isbn: '978-0062316097',
    price: 24.99,
    stock: 16,
    genre: 'History',
    publishedDate: '2014-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },

  // Oxford University Press Books
  {
    id: 8,
    title: 'The Oxford English Dictionary',
    author: 'Oxford University Press',
    publisher: 'Oxford University Press',
    description: 'The definitive record of the English language.',
    isbn: '978-0199212604',
    price: 195.00,
    stock: 3,
    genre: 'Reference',
    publishedDate: '2005-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 9,
    title: 'Oxford Advanced Learner\'s Dictionary',
    author: 'Oxford University Press',
    publisher: 'Oxford University Press',
    description: 'The world\'s bestselling advanced-level dictionary.',
    isbn: '978-0194799003',
    price: 45.00,
    stock: 10,
    genre: 'Reference',
    publishedDate: '2015-03-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },

  // Cambridge University Press Books
  {
    id: 10,
    title: 'English Grammar in Use',
    author: 'Raymond Murphy',
    publisher: 'Cambridge University Press',
    description: 'The world\'s best-selling grammar book.',
    isbn: '978-0521189064',
    price: 35.00,
    stock: 14,
    genre: 'Education',
    publishedDate: '2012-02-23',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 11,
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    publisher: 'Cambridge University Press',
    description: 'The authoritative introduction to algorithms.',
    isbn: '978-0262033848',
    price: 89.99,
    stock: 6,
    genre: 'Technology',
    publishedDate: '2009-07-31',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },

  // Wiley Books
  {
    id: 12,
    title: 'Fundamentals of Physics',
    author: 'David Halliday',
    publisher: 'Wiley',
    description: 'The classic textbook for physics students.',
    isbn: '978-0470469118',
    price: 75.00,
    stock: 8,
    genre: 'Science',
    publishedDate: '2013-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 13,
    title: 'Business Statistics',
    author: 'David F. Groebner',
    publisher: 'Wiley',
    description: 'A comprehensive introduction to business statistics.',
    isbn: '978-0134496498',
    price: 65.00,
    stock: 9,
    genre: 'Business',
    publishedDate: '2017-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },

  // Elsevier Books
  {
    id: 14,
    title: 'Gray\'s Anatomy',
    author: 'Henry Gray',
    publisher: 'Elsevier',
    description: 'The definitive textbook of human anatomy.',
    isbn: '978-0702052309',
    price: 125.00,
    stock: 4,
    genre: 'Medical',
    publishedDate: '2015-09-25',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 15,
    title: 'Robbins Basic Pathology',
    author: 'Vinay Kumar',
    publisher: 'Elsevier',
    description: 'A comprehensive textbook of pathology.',
    isbn: '978-0323353175',
    price: 95.00,
    stock: 7,
    genre: 'Medical',
    publishedDate: '2017-04-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },

  // Pearson Books
  {
    id: 16,
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    publisher: 'Pearson',
    description: 'The leading calculus textbook for students.',
    isbn: '978-0538498876',
    price: 85.00,
    stock: 11,
    genre: 'Mathematics',
    publishedDate: '2011-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 17,
    title: 'Psychology',
    author: 'David G. Myers',
    publisher: 'Pearson',
    description: 'The world\'s bestselling psychology textbook.',
    isbn: '978-1464140815',
    price: 78.00,
    stock: 13,
    genre: 'Psychology',
    publishedDate: '2014-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },

  // McGraw-Hill Education Books
  {
    id: 18,
    title: 'Campbell Biology',
    author: 'Lisa A. Urry',
    publisher: 'McGraw-Hill Education',
    description: 'The world\'s most successful majors biology textbook.',
    isbn: '978-0134093413',
    price: 92.00,
    stock: 5,
    genre: 'Biology',
    publishedDate: '2016-10-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 19,
    title: 'Chemistry: The Central Science',
    author: 'Theodore E. Brown',
    publisher: 'McGraw-Hill Education',
    description: 'The authoritative introduction to chemistry.',
    isbn: '978-0134414232',
    price: 88.00,
    stock: 9,
    genre: 'Chemistry',
    publishedDate: '2017-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },

  // Bloomsbury Publishing Books
  {
    id: 20,
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    publisher: 'Bloomsbury Publishing',
    description: 'The first book in the Harry Potter series.',
    isbn: '978-0747532699',
    price: 12.99,
    stock: 25,
    genre: 'Fantasy',
    publishedDate: '1997-06-26',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 21,
    title: 'A Room with a View',
    author: 'E.M. Forster',
    publisher: 'Bloomsbury Publishing',
    description: 'A classic novel of manners and romance.',
    isbn: '978-0141183049',
    price: 9.99,
    stock: 12,
    genre: 'Fiction',
    publishedDate: '1908-10-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Helper function to get books by publisher
export const getBooksByPublisher = (publisherName: string): Book[] => {
  return MOCK_BOOKS.filter(book =>
    book.publisher?.toLowerCase() === publisherName.toLowerCase()
  );
};
