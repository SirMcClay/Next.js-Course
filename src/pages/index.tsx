import { GetServerSideProps } from 'next';
// import math from '../lib/math';
import { Title } from '@/styles/pages/Home';
import SEO from '@/components/SEO';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  async function handleSum() {
    console.log(process.env.NEXT_PUBLIC_API_URL);

    const math = (await import('../lib/math')).default;

    alert(math.sum(3,5));
  }

  return (
    <div>
      <SEO 
        title="DevCommerce, your best e-commerce!"
        image="laughman.png"
        shouldExcludeTitleSuffix
      />

      <Title>Hello Clayton!</Title>

      <section>
        <Title>Products</Title>

        <ul>
            {recommendedProducts.map(recommendedProduct => {
              return (
                <li key={recommendedProduct.id}>
                  {recommendedProduct.title}
                </li>
              )
            })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`)
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    }
  }
}