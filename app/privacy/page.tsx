import { redirect } from 'next/navigation'

/**
 * Canonical /privacy route: redirects to default-locale privacy page.
 * Enables stable app links to https://www.hubiasystem.com/privacy
 */
export default function PrivacyRedirect() {
  redirect('/it/privacy')
}
