import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullSushi: React.FC = () => {
  const [sushi, setsushi] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchsushi() {
      try {
        const { data } = await axios.get('https://6501507e736d26322f5b7c6c.mockapi.io/items/' + id);
        setsushi(data);
      } catch (error) {
        alert('Ошибка при получении ролл!');
        navigate('/');
      }
    }

    fetchsushi();
  }, []);

  if (!sushi) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={sushi.imageUrl} alt="Sushi"/>
      <h2>{sushi.title}</h2>
      <h4>{sushi.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullSushi;
