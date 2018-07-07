// <!-- Global site tag (gtag.js) - Google Analytics -->
export default ({ app }) => {
  /*
  ** Only run on client-side and only in production mode
  */
  if (process.env.NODE_ENV !== 'production') return;

  const gaId = process.env.gaId;

  const script = document.createElement('script');
  const firstScript = document.getElementsByTagName('script')[0];
  script.async = 1;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  firstScript.parentNode.insertBefore(script, firstScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', gaId);
};
