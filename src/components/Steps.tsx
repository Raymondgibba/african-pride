import Reveal from './Reveal';

export default function Steps({ items, stagger = 0.12 }: { items: [string, string][]; stagger?: number }) {
  return (
    <div className="steps">
      {items.map(([title, text], i) => (
        <Reveal key={title} className="step" delay={i * stagger}>
          <em>0{i + 1}</em>
          <b>{title}</b>
          <span>{text}</span>
        </Reveal>
      ))}
    </div>
  );
}
