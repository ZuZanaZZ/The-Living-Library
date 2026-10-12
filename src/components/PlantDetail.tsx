import { useState } from 'react';
import type { Plant } from '../types';

type Props = {
  plant: Plant;
  onBack: () => void;
  onDie: (cause: string) => void;
  onRestore: () => void;
};

export default function PlantDetail({ plant, onBack, onDie, onRestore }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [cause, setCause] = useState('');
  const dead = plant.status === 'dead';

  return (
    <article className="detail">
      <button type="button" onClick={onBack}>← Back</button>
      <h2>{plant.name}</h2>
      <p className="species">{plant.species}</p>
      {plant.photo && <img src={plant.photo} alt={`${plant.name} (${plant.species})`} />}
      <dl>
        <dt>Acquired</dt><dd>{plant.acquired}</dd>
        <dt>Light</dt><dd>{plant.light}</dd>
        <dt>Watering</dt><dd>Every {plant.wateringDays} days</dd>
        <dt>Notes</dt><dd>{plant.notes || '—'}</dd>
        {dead && (
          <>
            <dt>Status</dt><dd>🪦 Died {plant.diedOn}</dd>
            <dt>Cause</dt><dd>{plant.causeOfDeath || 'Unknown'}</dd>
          </>
        )}
      </dl>
      {dead ? (
        <button type="button" onClick={onRestore}>Bring back to collection</button>
      ) : confirming ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onDie(cause.trim());
          }}
        >
          <label htmlFor="cause">Cause of death (optional)</label>
          <input id="cause" value={cause} onChange={(e) => setCause(e.target.value)} autoFocus />
          <button type="submit">Move to graveyard</button>
          <button type="button" onClick={() => setConfirming(false)}>Cancel</button>
        </form>
      ) : (
        <button type="button" onClick={() => setConfirming(true)}>Mark as dead</button>
      )}
    </article>
  );
}
