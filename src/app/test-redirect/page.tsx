export default function TestRedirect() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Test Redirect Page</h1>
      <p>If you see this page at /test-redirect, the middleware did NOT run.</p>
      <p>The middleware should have redirected you to /de/test-redirect or /en/test-redirect</p>
    </div>
  );
}
