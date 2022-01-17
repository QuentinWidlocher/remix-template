interface HomePageProps {
  item: string;
}

export default function Home({ item }: HomePageProps) {
  return <span className="px-1">{item}</span>;
}
