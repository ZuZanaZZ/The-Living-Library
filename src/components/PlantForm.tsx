import { useState } from 'react';
import { resizeImage } from '../storage';
import type { Light, Plant } from '../types';

type Props = { onSave: (plant: Plant) => void; onCancel: () => void };

export default function PlantForm({ onSave, onCancel }: Props) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [acquired, setAcquired] = useState(new Date().toISOString().slice(0, 10));
  const [light, setLight] = useState<Light>('medium');
  const [wateringDays, setWateringDays] = useState(7);
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState<string>();
  const [photoError, setPhotoError] = useState('');

  const onFile = async (file?: File) => {
    setPhotoError('');
    if (!file) return setPhoto(undefined);
    try {
      setPhoto(await resizeImage(file));
    } catch {
      setPhotoError('That file could not be read as an image.');
    }
  };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          id: crypto.randomUUID(),
          name: name.trim(),
          species: species.trim(),
          photo,
          acquired,
          light,
          wateringDays,
          notes: notes.trim(),
          status: 'alive',
        });
      }}
    >
      <h2>Add a plant</h2>
      <label htmlFor="name">Name</label>
      <input id="name" required value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="species">Species</label>
      <input id="species" value={species} onChange={(e) => setSpecies(e.target.value)} />

      <label htmlFor="acquired">Date acquired</label>
      <input id="acquired" type="date" required value={acquired} onChange={(e) => setAcquired(e.target.value)} />

      <label htmlFor="light">Light</label>
      <select id="light" value={light} onChange={(e) => setLight(e.target.value as Light)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="bright">Bright</option>
      </select>

      <label htmlFor="water">Water every (days)</label>
      <input
        id="water"
        type="number"
        min={1}
        required
        value={wateringDays}
        onChange={(e) => setWateringDays(Number(e.target.value))}
      />

      <label htmlFor="notes">Notes</label>
      <textarea id="notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />

      <label htmlFor="photo">Photo</label>
      <input id="photo" type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} />
      {photoError && <p role="alert">{photoError}</p>}
      {photo && <img className="preview" src={photo} alt="Preview of the selected photo" />}

      <div className="actions">
        <button type="submit">Save plant</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
