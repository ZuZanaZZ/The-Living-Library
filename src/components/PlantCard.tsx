import type { Plant } from '../types';

type Props = { plant: Plant; onOpen: (id: string) => void; dead?: boolean };

export default function PlantCard({ plant, onOpen, dead }: Props) {
  return (
    <article className={`card${dead ? ' card-dead' : ''}`}>
      {plant.photo && <img src={plant.photo} alt={`${plant.name} (${plant.species})`} />}
      <div className="card-body">
        <h3>
          <button type="button" className="link" onClick={() => onOpen(plant.id)}>
            {dead && <span aria-hidden="true">🪦 </span>}
            {plant.name}
          </button>
        </h3>
        <p className="species">{plant.species}</p>
        {dead ? (
          <p>Died {plant.diedOn}{plant.causeOfDeath ? ` – ${plant.causeOfDeath}` : ''}</p>
        ) : (
          <p>💧 Water every {plant.wateringDays} days</p>
        )}
      </div>
    </article>
  );
}
