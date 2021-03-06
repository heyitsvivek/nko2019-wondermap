import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from './header'
import Footer from './footer'
export default ({ children, centered, title, profile }) => {
  const router = useRouter()
  const formattedTitle = title ? `${title} | WonderMap` : 'WonderMap'
  const url = `https://wondermap.now.sh${router.pathname}`

  return (<>
    <Head>
      <title>{formattedTitle}</title>
      <link href={url} rel='canonical' />=

      <link href='https://fonts.googleapis.com/css?family=Rubik:400,700&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Rubik:400i,700i&display=swap' rel='stylesheet' />
      <link href='/images/icon.png' rel='icon' />
      <link href='/images/icon.png' rel='shortcut icon' />
      <link href='/images/icon.png' rel='apple-touch-icon' />
      <link href='/manifest.json' rel='manifest' />

      <meta name='theme-color' content='#f15a22' />
      <meta name='description' content='WonderMap can help you calm the chaos of your amazing brain. Created for Node Knockout.' />
      <meta name='image' content='https://wondermap.now.sh/images/banner.png' />

      <meta itemProp='name' content={formattedTitle} />
      <meta itemProp='description' content='WonderMap can help you calm the chaos of your amazing brain. Created for Node Knockout.' />
      <meta itemProp='image' content='https://wondermap.now.sh/images/banner.png' />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title || 'WonderMap'} />
      <meta name='twitter:description' content='WonderMap can help you calm the chaos of your amazing brain. Created for Node Knockout.' />
      <meta name='twitter:image:src' content='https://wondermap.now.sh/images/banner.png' />

      <meta name='og:title' content={title || 'WonderMap'} />
      <meta name='og:description' content='WonderMap can help you calm the chaos of your amazing brain. Created for Node Knockout.' />
      <meta name='og:image' content='https://wondermap.now.sh/images/banner.png' />
      <meta name='og:url' content={url} />
      <meta name='og:site_name' content='WonderMap' />
      <meta name='og:locale' content='en_US' />
      <meta name='og:type' content='website' />
    </Head>

    <Header profile={profile} />

    <div className='min-h-screen relative'>
      <main className={centered ? 'h-screen flex flex-col justify-center content-center p-4' : 'p-4 pb-20 pt-48 sm:pt-32'}>
        <div className={centered ? '' : 'max-w-5xl mx-auto'}>
          {children}
        </div>
      </main>

      <Footer/>
    </div>
  </>)
}