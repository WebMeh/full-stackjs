export function TextContent({ text, points, className = '' }) {
  if (points?.length) {
    return <ul className={`learning-points ${className}`.trim()}>
      {points.map((point, index) => <li key={`${index}-${point}`}>{point}</li>)}
    </ul>;
  }
  return <p className={className}>{text}</p>;
}
