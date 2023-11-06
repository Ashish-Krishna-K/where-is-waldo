import { ActionFunction, redirect } from 'react-router-dom';

const action: ActionFunction = async ({ request, params }) => {
  try {
    const gameId = params.gameId;
    const formData = Object.fromEntries(await request.formData());
    const apiUrl = `${import.meta.env.VITE_BASE_URI}/api/${gameId}/leaderboard`;
    const opts: RequestInit = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(apiUrl, opts);
    if (!response.ok) {
      const data = (await response.json()) as Record<string, string>;
      throw new Error(data.error);
    }
    return redirect(`/leaderboards/${gameId}`);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) throw new Error(error.message);
    else if (typeof error === 'object' && error !== null) throw new Error(JSON.stringify(error));
    else throw new Error('Something went wrong');
  }
};

export default action;
