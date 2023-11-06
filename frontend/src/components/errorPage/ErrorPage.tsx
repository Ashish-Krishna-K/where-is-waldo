import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const rawError = useRouteError();
  console.error(rawError);

  // extracting the error message
  let error;
  if (rawError instanceof Error) {
    error = rawError.message;
  } else if (typeof rawError === 'object' && rawError !== null) {
    error = JSON.stringify(rawError);
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <i>{error}</i>
    </div>
  );
}
