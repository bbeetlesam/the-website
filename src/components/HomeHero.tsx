import heroIcon from "../assets/hero-icon.png";

function HomeHero() {
  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden mb-7">
      <div className="absolute z-0">
        <img src={heroIcon} alt="Background" className="object-cover w-full h-full" />
      </div>
      <div className="relative z-10 p-8 text-center">
        <h1 className="text-5xl font-bold text-[#006493] bg-[#f8f7f3]">Welcome back my friends, to the show that never ends</h1>
        <p className="mt-0 text-lg bg-[#f8f7f3]">I can't see my future. Can you?</p>
      </div>
    </section>
  );
}

export default HomeHero;