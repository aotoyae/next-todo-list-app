import Image from 'next/image';

const AboutPage = async () => {
  const response = await fetch('http://localhost:4000/companyInfo', {
    cache: 'force-cache',
  });
  const { name, desctiption, image } = await response.json();

  if (!name) return <h1>loading</h1>;

  return (
    <div>
      <h1>about</h1>
      <Image src={image} alt="company image" width={400} height={400} />
      <h2>{name}</h2>
      <p>{desctiption}</p>
    </div>
  );
};

export default AboutPage;
