// This page should never be reached because middleware redirects first
// But Next.js requires a page.tsx at the root level

export default function RootPage() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'monospace'
    }}>
      <div>
        <h1>Loading...</h1>
        <p>If you see this, the middleware did not run. Redirecting manually...</p>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Fallback redirect in case middleware fails
            const host = window.location.host;
            const isDe = host.includes('.de');
            const locale = isDe ? 'de' : 'en';
            window.location.href = '/' + locale;
          `
        }} />
      </div>
    </div>
  );
}
