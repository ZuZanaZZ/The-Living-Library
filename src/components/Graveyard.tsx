import type { Plant } from '../types';
import PlantCard from './PlantCard';

type Props = { plants: Plant[]; onOpen: (id: string) => void };

export default function Graveyard({ plants, onOpen }: Props) {
  return (
    <section aria-labelledby="graveyard-title">
      <h2 id="graveyard-title">Graveyard</h2>
      {plants.length === 0 ? (
        <p>Nothing here. Every plant is thriving.</p>
      ) : (
        <ul className="grid">
          {plants.map((p) => (
            <li key={p.id}>
              <PlantCard plant={p} onOpen={onOpen} dead />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
