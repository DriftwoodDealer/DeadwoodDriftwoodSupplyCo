import styles from "./treatment-process.module.css";

const steps = [
  { number: "01", title: "Power washed", detail: "River silt and loose material are removed while preserving the wood’s earned patina." },
  { number: "02", title: "Heat treated", detail: "Pieces for bioactive use are heated to 275° for 4+ hours." },
  { number: "03", title: "Cataloged", detail: "Each piece enters the archive with its treatment details and a record of its character." }
];

export function TreatmentProcess() {
  return (
    <section className={styles.section} aria-labelledby="treatment-heading">
      <div className={styles.intro}>
        <p className="eyebrow">The Treatment Room</p>
        <h2 id="treatment-heading">Prepared for the life that gathers around it.</h2>
        <p>Every habitat-bound piece is handled with a simple, considered process before it enters the catalog.</p>
      </div>
      <ol className={styles.steps}>
        {steps.map((step) => (
          <li key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
