import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import ReadingProgress from '../../../components/news/ReadingProgress';
import ArticleHero from '../../../components/news/ArticleHero';
import ArticleFigure from '../../../components/news/ArticleFigure';
import ArticleBody from '../../../components/news/ArticleBody';
import ShareBar from '../../../components/news/ShareBar';
import ArticleCTA from '../../../components/news/ArticleCTA';
import RelatedNews from '../../../components/news/RelatedNews';
import { newsData } from '../../data/news';
import { getPublicImageSize } from '../../../lib/imageSize';
import {
  formatNewsDate,
  getNewsBySlug,
  getParagraphs,
  getReadingTime,
  getRelatedNews,
} from '../../../lib/news';

const SITE_URL = 'https://estudiomusicalmarapassos.com.br';

export async function generateStaticParams() {
  return newsData.map((news) => ({ slug: news.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) {
    return {};
  }

  const url = `${SITE_URL}/noticias/${news.slug}`;

  return {
    title: `${news.title} | Estúdio Mara Passos`,
    description: news.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: news.title,
      description: news.description,
      images: [{ url: news.image }],
      publishedTime: news.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: news.title,
      description: news.description,
      images: [news.image],
    },
  };
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  const paragraphs = getParagraphs(news);
  const readingTime = getReadingTime(news);
  const dateLabel = formatNewsDate(news.date);
  const related = getRelatedNews(news.slug);
  const imageSize = getPublicImageSize(news.image);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: news.title,
    description: news.description,
    image: [`${SITE_URL}${news.image}`],
    ...(news.date ? { datePublished: news.date, dateModified: news.date } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/noticias/${news.slug}`,
    },
    author: { '@type': 'Organization', name: 'Estúdio Musical Mara Passos' },
    publisher: {
      '@type': 'Organization',
      name: 'Estúdio Musical Mara Passos',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.webp` },
    },
  };

  return (
    <>
      <Navbar />
      <ReadingProgress />

      <main className="pt-28 md:pt-32 pb-20 md:pb-28 min-h-screen overflow-x-hidden">
        <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
          <article>
            <ArticleHero
              title={news.title}
              category={news.category}
              dateISO={news.date}
              dateLabel={dateLabel}
              readingTime={readingTime}
            />

            {/* Desktop: texto à esquerda, imagem numa coluna lateral mais estreita.
                Mobile: imagem primeiro (ordem do DOM), texto abaixo. */}
            <div className="mt-10 md:mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,345px)] lg:gap-12 lg:items-start">
              <div className="lg:col-start-2 lg:row-start-1 lg:sticky lg:top-28">
                <ArticleFigure
                  src={news.image}
                  alt={news.title}
                  caption={news.caption}
                  size={imageSize}
                />
              </div>

              <div className="lg:col-start-1 lg:row-start-1">
                <ArticleBody paragraphs={paragraphs} quote={news.quote} />
              </div>
            </div>

            <ShareBar
              title={news.title}
              description={news.description}
              instagramUrl={news.link}
            />
          </article>

          <ArticleCTA newsTitle={news.title} />
          <RelatedNews items={related} />
        </div>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
