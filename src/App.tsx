import { useEffect, useState } from 'react';
import Graveyard from './components/Graveyard';
import Nav from './components/Nav';
import PlantCard from './components/PlantCard';
import PlantDetail from './components/PlantDetail';
import PlantForm from './components/PlantForm';
import { loadPlants, savePlants } from './storage';
import type { Plant } from './types';

export type View = 'collection' | 'graveyard' | 'add';

export default function App() {
  const [plants, setPlants] = useState<Plant[]>(loadPlants);
  const [view, setView] = useState<View>('collection');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);

  useEffect(() => {
    setSaveFailed(!savePlants(plants));
  }, [plants]);

  const alive = plants.filter((p) => p.status === 'alive');
  const dead = plants.filter((p) => p.status === 'dead');
  const selected = plants.find((p) => p.id === selectedId) ?? null;

  const update = (id: string, changes: Partial<Plant>) =>
    setPlants((all) => all.map((p) => (p.id === id ? { ...p, ...changes } : p)));

  const go = (next: View) => {
    setSelectedId(null);
    setView(next);
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <h1>The Living Library</h1>
        <Nav view={view} onChange={go} aliveCount={alive.length} deadCount={dead.length} />
      </header>
      <main id="main" tabIndex={-1}>
        {saveFailed && (
          <p role="alert" className="notice">
            Your browser could not save the latest changes (storage may be full). Try a smaller photo.
          </p>
        )}
        {selected ? (
          <PlantDetail
            plant={selected}
            onBack={() => setSelectedId(null)}
            onDie={(cause) =>
              update(selected.id, {
                status: 'dead',
                diedOn: new Date().toISOString().slice(0, 10),
                causeOfDeath: cause,
              })
            }
            onRestore={() =>
              update(selected.id, { status: 'alive', diedOn: undefined, causeOfDeath: undefined })
            }
          />
        ) : view === 'add' ? (
          <PlantForm
            onSave={(plant) => {
              setPlants((all) => [plant, ...all]);
              go('collection');
            }}
            onCancel={() => go('collection')}
          />
        ) : view === 'graveyard' ? (
          <Graveyard plants={dead} onOpen={setSelectedId} />
        ) : (
          <section aria-labelledby="collection-title">
            <h2 id="collection-title">My collection</h2>
            {alive.length === 0 ? (
              <p>No living plants yet. Add your first one!</p>
            ) : (
              <ul className="grid">
                {alive.map((p) => (
                  <li key={p.id}>
                    <PlantCard plant={p} onOpen={setSelectedId} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
    </>
  );
}
