export default function FloatingNotes() {
  // Valores fixos pré-calculados (parecem aleatórios, mas são estáticos).
  // Assim o servidor e o cliente renderizam a mesma coisa na hora! Zero erros.
  const floatingElements = [
    { id: 1, symbol: "♪", left: "10%", duration: "18s", delay: "2s", size: "1.8rem" },
    { id: 2, symbol: "♫", left: "85%", duration: "25s", delay: "0s", size: "2.5rem" },
    { id: 3, symbol: "♩", left: "25%", duration: "20s", delay: "5s", size: "1.5rem" },
    { id: 4, symbol: "♬", left: "70%", duration: "22s", delay: "1s", size: "2.0rem" },
    { id: 5, symbol: "♭", left: "45%", duration: "19s", delay: "7s", size: "2.2rem" },
    { id: 6, symbol: "♮", left: "90%", duration: "28s", delay: "3s", size: "1.6rem" },
    { id: 7, symbol: "♪", left: "15%", duration: "24s", delay: "8s", size: "2.1rem" },
    { id: 8, symbol: "♫", left: "60%", duration: "21s", delay: "4s", size: "1.9rem" },
    { id: 9, symbol: "♩", left: "35%", duration: "26s", delay: "9s", size: "2.4rem" },
    { id: 10, symbol: "♬", left: "80%", duration: "23s", delay: "6s", size: "1.7rem" },
    { id: 11, symbol: "♭", left: "5%",  duration: "27s", delay: "2.5s", size: "2.3rem" },
    { id: 12, symbol: "♮", left: "55%", duration: "17s", delay: "0.5s", size: "1.8rem" },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-40" aria-hidden="true">
      {floatingElements.map((el) => (
        <div
          key={el.id}
          className="note-float"
          style={{
            left: el.left,
            fontSize: el.size,
            animationDuration: el.duration,
            animationDelay: el.delay,
          }}
        >
          {el.symbol}
        </div>
      ))}
    </div>
  );
}