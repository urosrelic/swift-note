import Notes from '../../components/Notes/Notes';
import { GridProps } from '../../utils/GridProps';
const Home = ({ gridView }: GridProps) => {
  return (
    <div className='home'>
      <Notes gridView={gridView} />
    </div>
  );
};

export default Home;
