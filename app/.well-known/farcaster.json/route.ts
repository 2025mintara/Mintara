export async function GET() {
  return Response.json({
    accountAssociation: {
      header: "eyJmaWQiOjEzOTY0NjIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg3MUI4RkU1NGI5ZGI5ODE0RjY1QzBDOWNBRDNkYzQwZTg4M0E2NUU3In0",
      payload: "eyJkb21haW4iOiJtaW50YXJhLnh5eiJ9",
      signature: "ZYezOFmles+Y29PLQgrNhnoj/FzVIAzbKD+Edw0X8LZT5hl/chrTcuu9QHmF3XD5wNTryErkCJLGZaw8yr5jdxw=",
    },
    // diğer alanlarınız...
  });
}