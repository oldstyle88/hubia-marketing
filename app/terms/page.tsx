import { redirect } from 'next/navigation'

/**
 * Canonical /terms route: redirects to default-locale terms page.
 * Enables stable app links to https://www.hubiasystem.com/terms
 */
export default function TermsRedirect() {
  redirect('/it/terms')
}
