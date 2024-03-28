import NoteGrid from '../components/NoteGrid/NoteGrid';

interface GridProps {
  gridView: boolean;
}

const Home = ({ gridView }: GridProps) => {
  const mobileLayout = () => {
    return (
      <div className='home'>
        <NoteGrid gridView={gridView} />
      </div>
    );
  };
  return mobileLayout();
};

export default Home;
