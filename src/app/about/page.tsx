import Image from 'next/image';

const AboutPage = async () => {
  const response = await fetch('http://localhost:4000/companyInfo', {
    cache: 'force-cache',
  });
  const { name, desctiption, image } = await response.json();

  return (
    <div>
      <h1>about</h1>
      <div className="relative w-120 h-96 mx-auto">
        <Image src={image} alt="company image" fill className="object-cover" />
      </div>
      <h2>{name}</h2>
      <p>{desctiption}</p>
    </div>
  );
};

export default AboutPage;
