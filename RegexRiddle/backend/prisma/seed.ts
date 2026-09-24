import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('Pulizia del database in corso...');
  
  // Wipe all existing data to start fresh (useful to clear random test accounts)
  await prisma.attempt.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding database...');
  
  const passwordHash = await argon2.hash('Password123!', { type: argon2.argon2id });

  const userMarco = await prisma.user.create({
    data: { username: 'marco_verdi', password: passwordHash }
  });

  const userGiulia = await prisma.user.create({
    data: { username: 'giulia_neri', password: passwordHash }
  });

  const userAlessandro = await prisma.user.create({
    data: { username: 'alessandro_russo', password: passwordHash }
  });

  const challenges = [
    {
      title: 'Numeri Interi',
      description: 'Scrivi una regex che accetti solo una stringa composta unicamente da numeri interi (da 1 a N cifre). Non deve accettare lettere o simboli.',
      secretRegex: '^\\d+$',
      examplePositive: '12345',
      exampleNegative: '123a',
      positiveChecks: ['1', '99', '1234567890'],
      negativeChecks: ['a', '12 34', '1.2', '-5'],
      creatorId: userMarco.id,
      difficulty: 'Facile'
    },
    {
      title: 'Cerca la Vocale',
      description: 'Scrivi una regex che intercetti qualsiasi stringa che contenga almeno una vocale (a, e, i, o, u) maiuscola o minuscola.',
      secretRegex: '[aeiouAEIOU]',
      examplePositive: 'Regex',
      exampleNegative: 'Rghz',
      positiveChecks: ['A', 'Ciao', 'bce', 'UUU'],
      negativeChecks: ['bcd', '123', '!', ''],
      creatorId: userGiulia.id,
      difficulty: 'Facile'
    },
    {
      title: 'Targa Auto Italiana',
      description: 'Valida il formato moderno delle targhe auto italiane: 2 lettere, 3 numeri, 2 lettere (es. AB123CD). Tutto maiuscolo, senza spazi.',
      secretRegex: '^[A-Z]{2}\\d{3}[A-Z]{2}$',
      examplePositive: 'AB123CD',
      exampleNegative: 'A123BCD',
      positiveChecks: ['ZZ999ZZ', 'AA000AA', 'XY456WK'],
      negativeChecks: ['ab123cd', 'A B123CD', 'ABC12CD', '123ABCD'],
      creatorId: userAlessandro.id,
      difficulty: 'Medio'
    },
    {
      title: 'Formato Orario (HH:MM)',
      description: 'Valida un orario nel formato 24 ore (da 00:00 a 23:59).',
      secretRegex: '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$',
      examplePositive: '14:30',
      exampleNegative: '25:10',
      positiveChecks: ['00:00', '09:59', '23:59', '12:00'],
      negativeChecks: ['24:00', '9:30', '12:60', '00:0', 'abc'],
      creatorId: userMarco.id,
      difficulty: 'Medio'
    },
    {
      title: 'Validatore Codice Fiscale',
      description: 'Valida un Codice Fiscale italiano standard: 6 lettere, 2 numeri, 1 lettera, 2 numeri, 1 lettera, 3 numeri, 1 lettera. Tutto maiuscolo.',
      secretRegex: '^[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]$',
      examplePositive: 'RSSMRA85M20F205Z',
      exampleNegative: 'RSSMRA85M20F205',
      positiveChecks: ['BNCGCM80A01H501U', 'VRDMRC90E41H501O'],
      negativeChecks: ['bncgcm80a01h501u', 'RSSMRA85M20F205Z1', '12345685M20F205Z', 'RSSMRA85M20F205'],
      creatorId: userGiulia.id,
      difficulty: 'Difficile'
    },
    {
      title: 'Indirizzo IP (Semplificato)',
      description: 'Verifica se la stringa è un indirizzo IPv4 valido composto da 4 blocchi di numeri (da 1 a 3 cifre ciascuno) separati da un punto. Ignora il controllo matematico < 256, basta il formato base.',
      secretRegex: '^\\d{1,3}(\\.\\d{1,3}){3}$',
      examplePositive: '192.168.1.1',
      exampleNegative: '192.168.1',
      positiveChecks: ['0.0.0.0', '999.999.999.999', '10.0.2.15'],
      negativeChecks: ['192.168.1.', '192.168', 'a.b.c.d', '1.2.3.4.5'],
      creatorId: userAlessandro.id,
      difficulty: 'Difficile'
    }
  ];

  for (const c of challenges) {
    await prisma.challenge.create({ data: c });
  }

  console.log('Seeding completato con successo!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });