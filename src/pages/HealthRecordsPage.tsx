import * as stylesModule from "./HealthRecordsPage.module.css";
import { resolveCssModule } from "../utils/resolveCssModule";

const styles = resolveCssModule(stylesModule);

type DocumentResource = {
  id: string;
  resourceType: string;
  title: string;
  subtitle: string;
  selected?: boolean;
};

type LabResult = {
  test: string;
  result: string;
  range: string;
  status: "Normal" | "High" | "Borderline";
  resourceType: string;
};

const documentResources: DocumentResource[] = [
  {
    id: "cbc",
    resourceType: "Observation",
    title: "Lab results - CBC",
    subtitle: "Apr 1, 2026"
  },
  {
    id: "cardiology",
    resourceType: "DiagnosticReport",
    title: "Cardiology report",
    subtitle: "Mar 18, 2026",
    selected: true
  },
  {
    id: "problem-list",
    resourceType: "Condition",
    title: "Problem list",
    subtitle: "Active"
  },
  {
    id: "immunization",
    resourceType: "Immunization",
    title: "Vaccination record",
    subtitle: "VCI format"
  },
  {
    id: "allergies",
    resourceType: "AllergyIntolerance",
    title: "Allergy list",
    subtitle: "3 active"
  },
  {
    id: "discharge",
    resourceType: "DocumentReference",
    title: "Discharge summary",
    subtitle: "Feb 2026"
  }
];

const labResults: LabResult[] = [
  {
    test: "Hemoglobin",
    result: "13.8 g/dL",
    range: "12.0-16.0",
    status: "Normal",
    resourceType: "Observation"
  },
  {
    test: "WBC count",
    result: "7.2 x10^3/uL",
    range: "4.5-11.0",
    status: "Normal",
    resourceType: "Observation"
  },
  {
    test: "Platelets",
    result: "188 x10^3/uL",
    range: "150-400",
    status: "Normal",
    resourceType: "Observation"
  },
  {
    test: "LDL cholesterol",
    result: "142 mg/dL",
    range: "<100",
    status: "High",
    resourceType: "Observation"
  },
  {
    test: "HbA1c",
    result: "5.9%",
    range: "<5.7",
    status: "Borderline",
    resourceType: "Observation"
  }
];

const reportTags = ["DiagnosticReport", "FHIR R4"];

const statusClassNames: Record<LabResult["status"], string> = {
  Normal: styles.statusNormal,
  High: styles.statusHigh,
  Borderline: styles.statusBorderline
};

const HealthRecordsPage = () => {
  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Health records</h2>
          <p className={styles.meta}>Connected to Epic | FHIR R4 | Last synced 7:42 AM</p>
        </div>

        <div className={styles.actionRow}>
          <button className={styles.secondaryButton} type="button">
            Share records
          </button>
          <button className={styles.primaryButton} type="button">
            Request records
          </button>
        </div>
      </header>

      <div className={styles.contentGrid}>
        <aside className={styles.documentsCard}>
          <div className={styles.cardHeader}>
            <span className={styles.kicker}>Documents</span>
            <p className={styles.cardMeta}>FHIR resource type</p>
          </div>

          <div className={styles.documentList}>
            {documentResources.map((documentResource) => (
              <article
                className={`${styles.documentItem} ${
                  documentResource.selected ? styles.documentItemSelected : ""
                }`.trim()}
                key={documentResource.id}
              >
                <span className={styles.resourceBadge}>{documentResource.resourceType}</span>
                <strong className={styles.documentTitle}>{documentResource.title}</strong>
                <span className={styles.documentSubtitle}>{documentResource.subtitle}</span>
              </article>
            ))}
          </div>
        </aside>

        <div className={styles.recordsColumn}>
          <article className={styles.summaryCard}>
            <div className={styles.summaryHeader}>
              <div>
                <h3 className={styles.summaryTitle}>Cardiology follow-up report</h3>
                <p className={styles.summaryMeta}>Dr. Raj Patel | Mar 18, 2026 | Epic EMR</p>
              </div>

              <div className={styles.tagRow}>
                {reportTags.map((tag) => (
                  <span className={styles.reportTag} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.summaryBody}>
              Patient presents for 6-month cardiovascular follow-up. Blood pressure well-controlled
              at 118/76 mmHg. Resting ECG within normal limits. Continue current antihypertensive
              regimen. Recommend repeat lipid panel in 3 months. Patient educated on dietary
              modifications and exercise targets.
            </div>
          </article>

          <article className={styles.tableCard}>
            <div className={styles.tableHeader}>
              Lab results | Complete blood count | Apr 1, 2026
            </div>

            <div className={styles.tableScroller}>
              <table className={styles.resultsTable}>
                <thead>
                  <tr>
                    <th scope="col">Test</th>
                    <th scope="col">Result</th>
                    <th scope="col">Reference range</th>
                    <th scope="col">Status</th>
                    <th scope="col">FHIR resource</th>
                  </tr>
                </thead>
                <tbody>
                  {labResults.map((labResult) => (
                    <tr key={labResult.test}>
                      <td>{labResult.test}</td>
                      <td>{labResult.result}</td>
                      <td>{labResult.range}</td>
                      <td>
                        <span
                          className={`${styles.statusPill} ${statusClassNames[labResult.status]}`.trim()}
                        >
                          {labResult.status}
                        </span>
                      </td>
                      <td>
                        <span className={styles.tableTag}>{labResult.resourceType}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default HealthRecordsPage;

