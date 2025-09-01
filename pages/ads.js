impoimport Navbar from "../components/Navbar";

export default function Ads() {
  const adCards = [
    { title: "Ad One", desc: "Special promotion goes here" },
    { title: "Ad Two", desc: "Partner campaign details" },
    { title: "Ad Three", desc: "Another banner or ad" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header className="w-full max-w-4xl text-center py-10">
        <h1 className="text-3xl font-bold text-gray-800">Advertising Space</h1>
        <p className="text-gray-500 mt-2">
          Discover promotions, campaigns, and partner ads
        </p>
      </header>

      {/* Hero Banner */}
      <section className="w-full max-w-4xl px-6">
        <div className="bg-blue-600 text-white rounded-2xl p-10 text-center shadow">
          <h2 className="text-2xl font-bold">🔥 Big Banner Promotion 🔥</h2>
          <p className="mt-2">This space is reserved for a featured campaign</p>
        </div>
      </section>

      {/* Ad Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl px-6 mt-10">
        {adCards.map((ad, idx) => (
          <div
            key={idx}
            className="p-6 bg-white shadow rounded-2xl text-center hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">{ad.title}</h3>
            <p className="text-gray-500 mt-2">{ad.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
        }
