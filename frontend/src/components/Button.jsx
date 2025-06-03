

function Button({ label, onClick, disabled = false }) {
  return (
    <button
      onClick={() => onClick()}
      disabled={disabled}
      className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xl font-bold shadow-lg transition-colors outline outline-black/5 dark:bg-slate-800 dark:hover:bg-slate-700 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
    >
      {label}
    </button>
  );
}

export default Button;