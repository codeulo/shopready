import DiyPricing from "./diy-pricing";
import DfyPricing from "./dfy-pricing";

export default function Pricing() {
  return (
    <section id="pricing">
      <div>
        {/* DIY */}
        <DiyPricing />

        {/* DFY */}
        <DfyPricing />
      </div>
    </section>
  );
}
