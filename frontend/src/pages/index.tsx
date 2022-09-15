import { useQuery } from '@apollo/client';
import { getRestaurants } from 'api/getRestaurants';
import { gql } from 'apollo-boost';
import RestaurantList from 'components/RestaurantList';
import Search from 'components/Search';
import { NextPage } from 'next';
import { Row } from 'reactstrap';
import { useSearch } from 'utils/useSearch';

const HomePage: NextPage = () => {
  const { loading, error, data } = useQuery(getRestaurants);
  const { searchWord, onChangeWord } = useSearch();

  if (error) return <div>レストランの読み込みに失敗しました</div>;
  if (loading) return <div>Loading...</div>;

  if (!data?.restaurants && !data?.restaurants?.data?.length) {
    return <h1>レストランが見つかりませんでした</h1>;
  }

  const searchQuery = (word: string) => {
    if (!word) return data.restaurants.data;

    if (data.restaurants.data) {
      return data.restaurants.data.filter((r: any) =>
        r.attributes.name.toLowerCase().includes(word)
      );
    }
    return [];
  };

  return (
    <>
      <Search searchWord={searchWord} onChangeWord={onChangeWord} />

      <Row className="card-columns">
        {searchQuery(searchWord).map((restaurant: any, idx: number) => (
          <RestaurantList key={idx} restaurant={restaurant} />
        ))}
        <style jsx>{`
          .card-columns {
            display: flex;
            column-count: 3;
          }
        `}</style>
      </Row>
    </>
  );
};

export default HomePage;
