const API_URL = 'https://apiadmin.tindin.com.br/login';

export default function USER_POST(body) {
  return {
    url: API_URL,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}
