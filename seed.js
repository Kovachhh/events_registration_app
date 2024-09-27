const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  due_date: { type: Date, required: true },
  organizer: { type: String, required: true },
  users: { type: [String], required: true },
});

const Event = mongoose.model('Event', eventSchema);

const seedData = async () => {
  await connectMongoDB();

  const events = [
    {
      title: 'Web Development',
      description: 'Introduction to Web Development',
      due_date: new Date('2024-01-15'),
      organizer: 'John Smith',
      users: [],
    },
    {
      title: 'React',
      description: 'Advanced React Workshop',
      due_date: new Date('2024-02-10'),
      organizer: 'Sarah Connor',
      users: [],
    },
    {
      title: 'Node.js',
      description: 'Node.js for Beginners',
      due_date: new Date('2024-03-05'),
      organizer: 'Bruce Wayne',
      users: [],
    },
    {
      title: 'Data Science',
      description: 'Python Data Science Bootcamp',
      due_date: new Date('2024-04-20'),
      organizer: 'Diana Prince',
      users: [],
    },
    {
      title: 'DevOps',
      description: 'DevOps Essentials',
      due_date: new Date('2024-05-18'),
      organizer: 'Tony Stark',
      users: [],
    },
    {
      title: 'Mobile Development',
      description: 'Mobile App Development with Flutter',
      due_date: new Date('2024-06-25'),
      organizer: 'Steve Rogers',
      users: [],
    },
    {
      title: 'Fullstack Masterclass',
      description: 'Fullstack JavaScript Masterclass',
      due_date: new Date('2024-07-30'),
      organizer: 'Natasha Romanoff',
      users: [],
    },
    {
      title: 'Artificial Intelligence',
      description: 'Intro to Artificial Intelligence',
      due_date: new Date('2024-08-22'),
      organizer: 'Clark Kent',
      users: [],
    },
    {
      title: 'Cybersecurity',
      description: 'Cybersecurity Basics',
      due_date: new Date('2024-09-19'),
      organizer: 'Peter Parker',
      users: [],
    },
    {
      title: 'Machine Learning',
      description: 'Machine Learning with Python',
      due_date: new Date('2024-10-10'),
      organizer: 'Shuri Wakanda',
      users: [],
    },
    {
      title: 'Tech Innovations Conference 2024',
      description:
        'A global event discussing the latest innovations in technology with industry leaders.',
      due_date: new Date('2024-10-15'),
      organizer: 'TechWorld',
      users: [],
    },
    {
      title: 'Sustainable Energy Summit',
      description:
        'An event focused on advancements in sustainable energy and eco-friendly technologies.',
      due_date: new Date('2024-11-05'),
      organizer: 'GreenFuture',
      users: [],
    },
    {
      title: 'AI & Machine Learning Expo',
      description:
        'Explore the cutting-edge developments in artificial intelligence and machine learning.',
      due_date: new Date('2024-12-01'),
      organizer: 'AI Trends',
      users: [],
    },
    {
      title: 'HealthTech Innovations Workshop',
      description:
        'A hands-on workshop exploring how technology is transforming healthcare.',
      due_date: new Date('2024-09-20'),
      organizer: 'HealthTech Global',
      users: [],
    },
    {
      title: 'International Startup Pitch Night',
      description:
        'A platform for startups to pitch their ideas to international investors and VCs.',
      due_date: new Date('2024-10-30'),
      organizer: 'Venture Capital Alliance',
      users: [],
    },
    {
      title: 'Future of Blockchain Forum',
      description:
        'Discuss the future of blockchain technology and its applications across industries.',
      due_date: new Date('2024-11-15'),
      organizer: 'CryptoCon',
      users: [],
    },
    {
      title: 'Global Climate Change Conference',
      description:
        'A global summit addressing the impact of climate change and potential solutions.',
      due_date: new Date('2024-12-10'),
      organizer: 'ClimateAction',
      users: [],
    },
    {
      title: 'Women in Tech Leadership Summit',
      description:
        'A summit dedicated to empowering women leaders in the technology industry.',
      due_date: new Date('2024-11-22'),
      organizer: 'WomenInTech',
      users: [],
    },
    {
      title: 'Digital Marketing Strategies 2025',
      description:
        'An event focused on upcoming trends and strategies in digital marketing for 2025.',
      due_date: new Date('2024-12-05'),
      organizer: 'MarketingPro',
      users: [],
    },
    {
      title: 'Smart Cities and Urban Innovation Summit',
      description:
        'Exploring the future of smart cities and innovative urban planning solutions.',
      due_date: new Date('2024-10-18'),
      organizer: 'UrbanTech',
      users: [],
    },
    {
      title: 'Virtual Reality in Education Summit',
      description:
        'Exploring the potential of virtual reality technology in enhancing education.',
      due_date: new Date('2024-10-25'),
      organizer: 'EduTech Innovators',
      users: [],
    },
    {
      title: 'Global Health and Wellness Expo',
      description:
        'A comprehensive event showcasing the latest trends in health and wellness.',
      due_date: new Date('2024-11-12'),
      organizer: 'HealthLife',
      users: [],
    },
    {
      title: 'Cybersecurity Awareness Conference',
      description:
        'A gathering of experts to discuss best practices in cybersecurity.',
      due_date: new Date('2024-12-15'),
      organizer: 'CyberSafe',
      users: [],
    },
    {
      title: 'Creative Arts and Innovation Festival',
      description:
        'Celebrating creativity and innovation across various artistic disciplines.',
      due_date: new Date('2024-11-28'),
      organizer: 'Artistic Minds',
      users: [],
    },
    {
      title: 'Global Fintech Innovation Summit',
      description:
        'Discussing the latest innovations in financial technology and services.',
      due_date: new Date('2024-12-20'),
      organizer: 'Fintech Revolution',
      users: [],
    },
    {
      title: 'Smart Agriculture Technology Conference',
      description:
        'Exploring advancements in technology for sustainable agriculture practices.',
      due_date: new Date('2024-10-10'),
      organizer: 'AgriTech World',
      users: [],
    },
    {
      title: 'International Robotics Competition',
      description:
        'A global competition showcasing the best in robotics innovation and design.',
      due_date: new Date('2024-11-18'),
      organizer: 'Robotics League',
      users: [],
    },
    {
      title: 'E-Commerce Trends and Strategies Forum',
      description:
        'Analyzing current trends and strategies in the e-commerce landscape.',
      due_date: new Date('2024-12-02'),
      organizer: 'Ecom Insights',
      users: [],
    },
    {
      title: 'Urban Transportation Solutions Conference',
      description:
        'Discussing innovative transportation solutions for urban areas.',
      due_date: new Date('2024-11-15'),
      organizer: 'Urban Mobility',
      users: [],
    },
    {
      title: 'Food Sustainability and Innovation Summit',
      description:
        'Exploring sustainable practices and innovations in the food industry.',
      due_date: new Date('2024-10-30'),
      organizer: 'FoodTech Group',
      users: [],
    },
    {
      title: 'Digital Transformation in Business Forum',
      description:
        'A discussion on how digital transformation is reshaping businesses.',
      due_date: new Date('2024-11-05'),
      organizer: 'Business Innovators',
      users: [],
    },
    {
      title: 'Next-Gen Internet Technologies Conference',
      description:
        'Exploring the future of internet technologies and their impact.',
      due_date: new Date('2024-12-12'),
      organizer: 'Internet Future',
      users: [],
    },
    {
      title: 'AI in Healthcare Summit',
      description:
        'Discussing the role of artificial intelligence in transforming healthcare.',
      due_date: new Date('2024-10-20'),
      organizer: 'HealthTech Innovations',
      users: [],
    },
    {
      title: 'Global Startup Ecosystem Forum',
      description:
        'A platform for startups to connect and share insights on growth strategies.',
      due_date: new Date('2024-11-22'),
      organizer: 'Startup Network',
      users: [],
    },
    {
      title: 'Blockchain for Social Good Conference',
      description:
        'Exploring how blockchain technology can address social issues.',
      due_date: new Date('2024-12-05'),
      organizer: 'Blockchain for Humanity',
      users: [],
    },
    {
      title: 'Mobile App Development Bootcamp',
      description: 'A hands-on bootcamp for aspiring mobile app developers.',
      due_date: new Date('2024-10-15'),
      organizer: 'Dev Academy',
      users: [],
    },
    {
      title: 'Sustainable Fashion and Design Forum',
      description:
        'Discussing the future of sustainability in the fashion industry.',
      due_date: new Date('2024-11-10'),
      organizer: 'EcoFashion',
      users: [],
    },
    {
      title: 'Creative Writing and Storytelling Workshop',
      description:
        'An interactive workshop focusing on enhancing creative writing skills.',
      due_date: new Date('2024-12-08'),
      organizer: 'Writers Collective',
      users: [],
    },
    {
      title: 'Artificial Intelligence in Business Summit',
      description:
        'Examining how AI is transforming business operations and strategies.',
      due_date: new Date('2024-11-25'),
      organizer: 'AI Business Network',
      users: [],
    },
    {
      title: 'Innovations in Renewable Energy Forum',
      description:
        'A discussion on the latest innovations in renewable energy sources.',
      due_date: new Date('2024-12-18'),
      organizer: 'Renewable Energy Alliance',
      users: [],
    },
  ];

  try {
    await Event.deleteMany();
    await Event.insertMany(events);
    console.log('Data successfully written to database');
  } catch (error) {
    console.error('Error writing data to MongoDB', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
