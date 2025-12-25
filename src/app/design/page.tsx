import styles from "./design.module.css";

export default function DesignSystemPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Design System</h1>
          <p className={styles.subtitle}>
            Tokens and patterns powering my portfolio site
          </p>
        </header>

        {/* 01 — Colors */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>01</span>
            <h2 className={styles.sectionTitle}>Colors</h2>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Neutrals</h3>
            <div className={styles.colorGrid}>
              <ColorSwatch name="--color-bg" hex="#fafaf9" />
              <ColorSwatch name="--color-bg-subtle" hex="#f5f5f4" />
              <ColorSwatch name="--color-border" hex="#e7e5e4" />
              <ColorSwatch name="--color-border-strong" hex="#d6d3d1" />
              <ColorSwatch name="--color-text" hex="#1c1917" dark />
              <ColorSwatch name="--color-text-secondary" hex="#57534e" dark />
              <ColorSwatch name="--color-text-muted" hex="#a8a29e" />
            </div>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Accent</h3>
            <div className={styles.colorGrid}>
              <ColorSwatch name="--color-accent" hex="#2563eb" dark />
              <ColorSwatch name="--color-accent-hover" hex="#1d4ed8" dark />
              <ColorSwatch name="--color-accent-light" hex="#dbeafe" />
              <ColorSwatch name="--color-accent-subtle" hex="#eff6ff" />
            </div>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Semantic</h3>
            <div className={styles.colorGrid}>
              <ColorSwatch name="--color-success" hex="#16a34a" dark />
              <ColorSwatch name="--color-warning" hex="#ca8a04" dark />
              <ColorSwatch name="--color-error" hex="#dc2626" dark />
            </div>
          </div>
        </section>

        {/* 02 — Typography */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>02</span>
            <h2 className={styles.sectionTitle}>Typography Scale</h2>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Modular Scale</h3>
            <div className={styles.typeList}>
              <TypeSample name="--text-xs" size="0.64rem" px="10.24px" />
              <TypeSample name="--text-sm" size="0.8rem" px="12.8px" />
              <TypeSample name="--text-base" size="1rem" px="16px" />
              <TypeSample name="--text-lg" size="1.25rem" px="20px" />
              <TypeSample name="--text-xl" size="1.563rem" px="25px" />
              <TypeSample name="--text-2xl" size="1.953rem" px="31.25px" />
              <TypeSample name="--text-3xl" size="2.441rem" px="39px" />
              <TypeSample name="--text-4xl" size="3.052rem" px="48.8px" />
              <TypeSample name="--text-5xl" size="3.815rem" px="61px" />
            </div>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Fluid Headings</h3>
            <p className={styles.note}>
              These scale smoothly between viewport sizes using clamp()
            </p>
            <div className={styles.headingList}>
              <HeadingSample level="h1" range="39px → 61px" />
              <HeadingSample level="h2" range="31px → 49px" />
              <HeadingSample level="h3" range="25px → 39px" />
              <HeadingSample level="h4" range="20px → 25px" />
              <HeadingSample level="h5" range="16px → 20px" />
              <HeadingSample level="h6" range="14px → 16px" />
            </div>
          </div>
        </section>

        {/* 03 — Spacing */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>03</span>
            <h2 className={styles.sectionTitle}>Spacing Scale</h2>
          </div>

          <div className={styles.spacingList}>
            <SpacingBar name="--space-1" value="4px" />
            <SpacingBar name="--space-2" value="8px" />
            <SpacingBar name="--space-3" value="12px" />
            <SpacingBar name="--space-4" value="16px" />
            <SpacingBar name="--space-5" value="20px" />
            <SpacingBar name="--space-6" value="24px" />
            <SpacingBar name="--space-8" value="32px" />
            <SpacingBar name="--space-10" value="40px" />
            <SpacingBar name="--space-12" value="48px" />
            <SpacingBar name="--space-16" value="64px" />
            <SpacingBar name="--space-20" value="80px" />
            <SpacingBar name="--space-24" value="96px" />
            <SpacingBar name="--space-32" value="128px" />
          </div>
        </section>

        {/* 04 — Containers */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>04</span>
            <h2 className={styles.sectionTitle}>Containers</h2>
          </div>

          <div className={styles.containerDemo}>
            <div className={styles.containerWide}>
              <span className={styles.containerLabel}>
                .container-wide — 1440px
              </span>
              <div className={styles.containerDefault}>
                <span className={styles.containerLabel}>
                  .container — 1280px
                </span>
                <div className={styles.containerNarrow}>
                  <span className={styles.containerLabel}>
                    .container-narrow — 720px
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ===== Sub-components ===== */

function ColorSwatch({
  name,
  hex,
  dark = false,
}: {
  name: string;
  hex: string;
  dark?: boolean;
}) {
  return (
    <div className={styles.colorSwatch}>
      <div
        className={styles.swatchColor}
        style={{ backgroundColor: `var(${name})` }}
      >
        {dark && <span className={styles.swatchDot} />}
      </div>
      <div className={styles.swatchInfo}>
        <code className={styles.swatchName}>{name}</code>
        <span className={styles.swatchHex}>{hex}</span>
      </div>
    </div>
  );
}

function TypeSample({
  name,
  size,
  px,
}: {
  name: string;
  size: string;
  px: string;
}) {
  return (
    <div className={styles.typeSample}>
      <span className={styles.typeText} style={{ fontSize: `var(${name})` }}>
        The quick brown fox
      </span>
      <div className={styles.typeMeta}>
        <code className={styles.typeName}>{name}</code>
        <span className={styles.typeSize}>
          {size} ({px})
        </span>
      </div>
    </div>
  );
}

function HeadingSample({ level, range }: { level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; range: string }) {
  const Tag = level;
  return (
    <div className={styles.headingSample}>
      <Tag
        className={styles.headingText}
        style={{ fontSize: `var(--text-${level})` }}
      >
        Heading {level.toUpperCase()}
      </Tag>
      <div className={styles.headingMeta}>
        <code className={styles.typeName}>--text-{level}</code>
        <span className={styles.typeSize}>{range}</span>
      </div>
    </div>
  );
}

function SpacingBar({ name, value }: { name: string; value: string }) {
  return (
    <div className={styles.spacingRow}>
      <div className={styles.spacingMeta}>
        <code className={styles.spacingName}>{name}</code>
        <span className={styles.spacingValue}>{value}</span>
      </div>
      <div
        className={styles.spacingBar}
        style={{ width: `var(${name})` }}
      />
    </div>
  );
}
