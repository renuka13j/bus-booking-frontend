const colors = [
  'bg-rose-500/20 text-rose-400',
  'bg-blue-500/20 text-blue-400',
  'bg-emerald-500/20 text-emerald-400',
  'bg-amber-500/20 text-amber-400',
  'bg-violet-500/20 text-violet-400',
  'bg-cyan-500/20 text-cyan-400',
];

function getColorForName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function OperatorAvatar({ name, size = 'md' }) {
  const sizeClasses = size === 'lg' ? 'w-12 h-12 text-base' : 'w-10 h-10 text-sm';

  return (
    <div
      className={`${sizeClasses} ${getColorForName(name)} rounded-lg flex items-center justify-center font-bold shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
}

export default OperatorAvatar;