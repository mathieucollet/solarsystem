export default ({ app }) => {
  const cookieRes = app.$cookies.get('favorites')
  if (!cookieRes) {
    app.$cookies.set(
      'favorites',
      { ids: [] },
      {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      }
    )
  }
}
