import type { View } from '../App';

type Props = { view: View; onChange: (v: View) => void; aliveCount: number; deadCount: number };

export default function Nav({ view, onChange, aliveCount, deadCount }: Props) {
  const item = (v: View, label: string) => (
    <button type="button" aria-current={view === v ? 'page' : undefined} onClick={() => onChange(v)}>
      {label}
    </button>
  );
  return (
    <nav aria-label="Main">
      {item('collection', `Collection (${aliveCount})`)}
      {item('graveyard', `Graveyard (${deadCount})`)}
      {item('add', '+ Add plant')}
    </nav>
  );
}
