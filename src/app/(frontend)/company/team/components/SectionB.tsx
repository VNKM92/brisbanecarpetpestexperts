// app/about/components/SectionB.tsx
import SubComponent1 from "./SectionB/SubComponent1";
import SubComponent2 from "./SectionB/SubComponent2";

export default function SectionB() {
  return (
    <section className="p-6 bg-white rounded-xl shadow space-y-3">
      <h2 className="text-xl font-semibold mb-3">Our Principles</h2>

      <SubComponent1 />
      <SubComponent2 />
    </section>
  );
}
