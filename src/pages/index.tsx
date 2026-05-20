import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={`hero hero--primary ${styles.heroBanner}`}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/Backend/overview">
            Backend Docs
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/Frontend/overview">
            Frontend Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureCards() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row" style={{justifyContent: 'center', gap: '2rem'}}>
          <div className="col col--4">
            <div className={styles.card}>
              <Heading as="h3">How to Use</Heading>
              <p>Step-by-step guides for creating templates, building flows, and running automations.</p>
              <Link className="button button--primary button--sm" to="/docs/how_to_use">
                Read Guide
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.card}>
              <Heading as="h3">Frontend</Heading>
              <p>React application architecture, components, state management, and routing.</p>
              <Link className="button button--primary button--sm" to="/docs/Frontend/overview">
                Read Guide
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.card}>
              <Heading as="h3">Backend</Heading>
              <p>Laravel API, automation engine, queue system, and database schema.</p>
              <Link className="button button--primary button--sm" to="/docs/Backend/overview">
                Read Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <FeatureCards />
      </main>
    </Layout>
  );
}
