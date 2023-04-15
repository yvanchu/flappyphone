import { useData } from "../util/firebase";

function Leaderboard() {
  const [cloud_count, loading, error] = useData("/count");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div className="App">
      <header className="App-header">
        <p>Leaderboard</p>
        <p>{Number(cloud_count)}</p>
      </header>
    </div>
  );
}

export default Leaderboard;
