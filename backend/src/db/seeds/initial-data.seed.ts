import { DataSource } from 'typeorm';
import { Comic } from '../../comics/entities/comic.entity';
import { Episode } from '../../comics/entities/episode.entity';
import { Page } from '../../comics/entities/page.entity';
import { User } from '../../users/entities/user.entity';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt'; 

export const runSeed = async (dataSource: DataSource) => { 

  const userRepo = dataSource.getRepository(User);
  const comicRepo = dataSource.getRepository(Comic);
  const episodeRepo = dataSource.getRepository(Episode);
  const pageRepo = dataSource.getRepository(Page);

  await pageRepo.query('DELETE FROM pages');
  await episodeRepo.query('DELETE FROM episodes');
  await comicRepo.query('DELETE FROM comics');
  await userRepo.query('DELETE FROM users');

  console.log('👥 Encriptando contraseñas y creando usuarios de sistema...');
  
  const saltRounds = 10;

  const staticUsers = [
    {
      username: 'admin',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('admin123', saltRounds), 
      role: 'admin' as any,
    },
    {
      username: 'reader_user',
      email: 'user@gmail.com',
      password: await bcrypt.hash('user123', saltRounds), 
      role: 'reader' as any,
    }
  ];

  for (const userData of staticUsers) {
    const user = userRepo.create(userData);
    await userRepo.save(user);
  }

  const authors: User[] = [];
  const defaultAuthorPassword = await bcrypt.hash('password123', saltRounds);

  for (let i = 0; i < 3; i++) {
    const user = userRepo.create({
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: defaultAuthorPassword,
      role: 'author' as any,
    });
    const savedUser = await userRepo.save(user);
    authors.push(savedUser);
  }
  
  for (let i = 0; i < 5; i++) {
    const comic = comicRepo.create({
      title: faker.book.title(),
      description: faker.lorem.paragraph(),
      genre: faker.helpers.arrayElement(['Acción', 'Romance', 'Terror', 'Comedia']),
      author: faker.helpers.arrayElement(authors),
      coverImage: `https://picsum.photos/400/600?random=${faker.number.int()}`
    });
    const savedComic = await comicRepo.save(comic);

    const numEpisodes = faker.number.int({ min: 3, max: 6 });
    for (let j = 1; j <= numEpisodes; j++) {
      const episode = episodeRepo.create({
        title: `Capítulo ${j}: ${faker.lorem.words(3)}`,
        number: j,
        description: `<h1>${faker.lorem.sentence()}</h1><p>${faker.lorem.paragraphs(2)}</p>`,
        isFree: j <= 2, 
        comic: savedComic,
      });
      const savedEpisode = await episodeRepo.save(episode);

      const pages = Array.from({ length: 8 }).map((_, idx) => 
        pageRepo.create({
          imageUrl: `https://picsum.photos/800/1200?random=${faker.number.int()}`,
          order: idx + 1,
          episode: savedEpisode,
        })
      );
      await pageRepo.save(pages);
    }
  }

  console.log('✅ Base de datos inicializada:');
  console.log('   - Admin: admin@gmail.com / admin123');
  console.log('   - User: user@gmail.com / user123');
  console.log('   - 5 Cómics con múltiples episodios y páginas.');
};