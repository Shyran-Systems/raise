import React from 'react';
import Layout from '../components/Layout';
import InvestingPage from '../components/InvestingPage';
import SEO from '../components/SEO';
import TagManager from '../components/TagManager';
import 'semantic-ui-css/semantic.min.css';

const InvestPage = ({ pageContext: { data, press } }: any) => {
  const investSections = data.allButterPage.nodes[0];
  const { articles } = press.allButterPage.edges[0].node;

  const flattenedArticles = articles.map((article: any) => article.press_release);

  return (
    <Layout>
      <div>
        <SEO />
        <TagManager />
        <InvestingPage data={investSections} articles={flattenedArticles} />
      </div>
    </Layout>
  );
};

export default InvestPage;
