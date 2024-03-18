export const GET = async (
  request: Request,
  { params }: { params: unknown }
) => {
  try {
    const url = new URL(request.url);

    console.log('user : ', url.searchParams.get('user'));
    console.log('oauth_verifier :', url.searchParams.get('oauth_verifier'));
    console.log('oauthtoken: ', url.searchParams.get('oauth_token'));

    return Response.redirect(
      new URL(
        `/admin/dashboard?oauth_verifier=${url.searchParams.get(
          'oauth_verifier'
        )}&oauth_token=${url.searchParams.get('oauth_token')}`,
        request.url
      )
    );
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
