export default async function (contex) {
  try {
    await contex.store.dispatch('currentUser')
    const currentUser = contex.store.state.currentUser
    if (!currentUser) {
      contex.redirect('autrh', '/auth')
    }
  } catch { }
}
