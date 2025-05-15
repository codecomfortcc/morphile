export const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/2 right-1/3 w-60 h-60 bg-teal-500/10 rounded-full filter blur-3xl animate-blob animation-delay-3000"></div>
      <div className="absolute top-3/4 left-1/3 w-56 h-56 bg-indigo-500/10 rounded-full filter blur-3xl animate-blob animation-delay-5000"></div>
    </div>
  );
};
