import Image from 'next/image';

import type { Company } from '@/types';

const AboutPage = async () => {
  const response = await fetch('http://localhost:4000/company', {
    cache: 'force-cache',
  });
  const company: Company = await response.json();
  const { name, description, image } = company;

  return (
    <div>
      <h1 className="text-[20px]">about</h1>
      <p>todo list about - SSG rendering</p>
      <div className="relative w-120 h-96 mx-auto">
        <Image src={image} alt="company image" fill className="object-cover" />
      </div>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default AboutPage;
