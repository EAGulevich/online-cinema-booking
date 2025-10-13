import { Helmet } from 'react-helmet-async';
import { APP_CONFIG } from '../../config.ts';
import type { FC } from 'react';

interface MetaConfig {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl: string;
}

interface MetaTagsProps {
  config: MetaConfig;
}

export const MetaTags: FC<MetaTagsProps> = ({ config }) => {
  return (
    <Helmet>
      <title>{config.title}</title>
      <meta property="og:title" content={config.ogTitle || config.title} />

      <meta name="description" content={config.description} />
      <meta
        property="og:description"
        content={config.ogDescription || config.description}
      />

      <meta
        property="og:image"
        content={config.ogImage || `${APP_CONFIG.baseUrl}/images/preview.jpg`}
      />

      <meta property="og:url" content={config.ogUrl} />
    </Helmet>
  );
};
